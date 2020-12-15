import { ElastosClient } from "@elastos/elastos-js-sdk"

const Elastos = {
    generateDocument: async (didelement, profile) => {
        
        let diddocument = ElastosClient.didDocuments.newDIDDocument(didelement)

        if (profile.name && profile.name !== "") {
            let vcName = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "name", ["BasicProfileCredential"], profile.name)
            ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(diddocument, vcName)
        }

        if (profile.email && profile.email !== "") {
            let vcEmail = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "email", ["BasicProfileCredential", "EmailCredential"], profile.email)
            ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(diddocument, vcEmail)
        }

        if (profile.birthDate) {
            let vcBirthDate = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "birthdate", ["BasicProfileCredential"], profile.birthDate)
            ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(diddocument, vcBirthDate)
        }

        if (profile.twitter) {
            let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/validation/internet_account`
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": process.env.REACT_APP_DIDCRED_KEY
                },
                body: JSON.stringify({
                    did: didelement.did,
                    credential_type: "twitter",
                    credential_value: profile.twitter
                })
            });

            if (response.ok) {
                let json = await response.json();
                let vc = json.data.verifiable_credential
                ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(diddocument, vc)
            }
        }
        return ElastosClient.didDocuments.sealDocument(didelement, diddocument)
    }
}

export default Elastos;
