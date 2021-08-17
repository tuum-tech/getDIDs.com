const GetDids = {
  GetRequestToken: async () => {
    let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/auth/twitter_request`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_DIDCRED_KEY,
      },
    });

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      return json.data.request_token;
    }

    return "";
  },
  CallbackTwitter: async (oauth_token, oauth_verifier) => {
    let response = await fetch(
      `${process.env.REACT_APP_DIDCRED_URL}/v1/auth/twitter_callback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_DIDCRED_KEY,
        },
        body: JSON.stringify({
          token: oauth_token,
          verifier: oauth_verifier,
        }),
      }
    );

    if (response.ok) {
      return await response.json();
    }

    return null;
  },
  PublishDocument: async (tx, did) => {
    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/eidSidechain/create/didTx`;
    let data = {
      didRequest: tx,
      memo: "",
    };

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ASSIST_AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    let json = await response.json();
    console.log("PublishDocument: ", json);
    return {
      confirmation_id: json.data.didTx.confirmationId,
      status: json.didTx.status,
    };
  },
  getTxStatus: async (confirmation_id) => {
    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/eidSidechain/get/didTx/confirmationId/${confirmation_id}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ASSIST_AUTH_TOKEN}`,
      },
    });

    let json = await response.json();
    console.log("getTxStatus: ", json);
    return {
      confirmation_id: confirmation_id,
      status: json.data.didTx.status,
    };
  },
};

export default GetDids;
