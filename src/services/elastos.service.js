import {
  DIDStore,
  Mnemonic,
  RootIdentity,
  DIDDocumentBuilder,
  DIDBackend,
  DefaultDIDAdapter,
} from "@elastosfoundation/did-js-sdk";

let adapter = {
  createIdTransaction: async (payload, memo) => {
    let didRequest = JSON.parse(payload);
    let did = didRequest.proof.verificationMethod;
    did = did.substring(0, did.indexOf("#")).replace("did:elastos:", "");

    response[did] = didRequest;
  },
};

let response = {};

const Elastos = {
  storepass: process.env.REACT_APP_DID_STORE_PASSWORD,
  GenerateMnemonics: async () => {
    return new Mnemonic().generate();
  },
  GetIdentity: async (network, mnemonic) => {
    DIDBackend.initialize(new DefaultDIDAdapter(network));

    let store = await DIDStore.open(process.env.REACT_APP_DID_STORE_PATH);
    return RootIdentity.createFromMnemonic(
      mnemonic,
      "",
      store,
      Elastos.storepass,
      true
    );
  },
  GetDIDDocument: async (network, mnemonic) => {
    const _network = network === "testnet" ? "testnet" : "mainnet";
    let identity = await Elastos.GetIdentity(_network, mnemonic);
    return await identity.newDid(Elastos.storepass, 0, true);
  },
  PublishDocument: async (network, mnemonic, profile) => {
    response = {};
    const _network = network === "testnet" ? "testnet" : "mainnet";
    let document = await Elastos.GetDIDDocument(_network, mnemonic);
    let docBuilder = DIDDocumentBuilder.newFromDocument(document);
    let did = profile.did.replace("did:elastos:", "");
    docBuilder.edit();
    docBuilder.setDefaultExpires();

    if (profile.name && profile.name !== "") {
      docBuilder = await docBuilder.createAndAddCredential(
        Elastos.storepass,
        "#name",
        { name: profile.name },
        ["SelfProclaimedCredential", "BasicProfileCredential"]
      );
    }

    if (profile.email && profile.email !== "") {
      docBuilder = await docBuilder.createAndAddCredential(
        Elastos.storepass,
        "#email",
        { email: profile.email },
        [
          "SelfProclaimedCredential",
          "BasicProfileCredential",
          "EmailCredential",
        ]
      );
    }

    let doc = await docBuilder.seal(Elastos.storepass);
    await doc.publish(
      Elastos.storepass,
      doc.getDefaultPublicKeyId(),
      true,
      adapter
    );

    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/eidSidechain/publish/didTx`;
    let data = {
      network: _network,
      didRequest: response[did],
      memo: "Published from GetDIDs.com",
    };

    let postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ASSIST_AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    let json = await postResponse.json();
    console.log("response: ", json);

    return {
      confirmation_id: json.data.didTx.confirmationId,
      status: "Pending",
    };
  },
};

export default Elastos;
