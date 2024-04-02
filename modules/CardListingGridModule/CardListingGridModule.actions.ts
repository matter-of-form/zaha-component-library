"use server";

export const getCardListingData = async (
  fetchController: any,
  queryData: any,
  fetchUrl = "/umbraco/api/CardListingFilter/GetCards",
) => {
  "use server";
  if (fetchController) {
    fetchController.abort();
  }
  const controller = new AbortController();
  fetchController = controller;

  console.log("getlistingdata", fetchUrl);

  const dataRes = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: fetchController.signal,
    body: JSON.stringify(queryData),
  }).catch(console.error);

  if (dataRes && dataRes.ok) {
    const data = await dataRes.json();
    console.log(data);
    return data;
  } else {
    return [];
  }
};
