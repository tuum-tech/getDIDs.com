import {
  DIDStore,
  Mnemonic,
  RootIdentity,
  VerifiableCredential,
  DIDDocumentBuilder,
  DIDBackend,
  DefaultDIDAdapter,
} from "@elastosfoundation/did-js-sdk";

let adapter = {
  createIdTransaction: async (payload, memo) => {
    let request = JSON.parse(payload);
    let did = request.proof.verificationMethod;
    did = did.substring(0, did.indexOf("#"));

    const _network = network === "testnet" ? "testnet" : "mainnet";
    console.log("here: ", _network);
    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/eidSidechain/create/didTx`;
    let data = {
      network: _network,
      didRequest: request,
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
    console.log(json);

    response[did.replace("did:elastos:", "")] = json.data.didTx.confirmationId;
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

    if (profile.birthDate) {
      docBuilder = await docBuilder.createAndAddCredential(
        Elastos.storepass,
        "#birthdate",
        { birthdate: profile.birthDate },
        ["SelfProclaimedCredential", "BasicProfileCredential"]
      );
    }

    if (profile.twitter) {
      let twitterVc = await Elastos.GenerateTwitterVerifiedCredential(
        did,
        profile.twitter
      );

      if (twitterVc) {
        let vc = await VerifiableCredential.parseContent(twitterVc);
        docBuilder = docBuilder.addCredential(vc);
      }
    }

    let doc = await docBuilder.seal(Elastos.storepass);
    await doc.publish(
      Elastos.storepass,
      doc.getDefaultPublicKeyId(),
      true,
      adapter
    );

    return {
      confirmation_id: response[did],
      status: "Pending",
    };
  },
  GenerateTwitterVerifiedCredential: async (did, twitter) => {
    let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/validation/internet_account`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_DIDCRED_KEY,
      },
      body: JSON.stringify({
        did: did,
        credential_type: "twitter",
        credential_value: twitter,
      }),
    });

    if (response.ok) {
      let json = await response.json();
      let vc = json.data.verifiable_credential;
      return vc;
    } else {
      return null;
    }
  },
};

export default Elastos;
