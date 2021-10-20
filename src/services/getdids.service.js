const GetDids = {
  getTxStatus: async (network, confirmation_id) => {
    const _network = network === "testnet" ? "testnet" : "mainnet";
    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/eidSidechain/get/didTx/confirmationId/${confirmation_id}?network=${_network}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ASSIST_AUTH_TOKEN}`,
      },
    });
    console.log("response: ", response);
    let json = await response.json();
    return {
      confirmation_id: confirmation_id,
      status: json.data.didTx.status,
    };
  },
};

export default GetDids;
