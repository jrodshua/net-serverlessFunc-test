require("dotenv").config();
const { URL } = require("url");
const fetch = require("node-fetch");

exports.handler = async () => {
  const api = new URL("https://api.apiflash.com/v1/urltoimage");
  const urlToView = new URL("https://www.twitch.tv/jrodshua");

  api.searchParams.set("access_key", process.env.ACCESS_KEY);
  api.searchParams.set("url", urlToView);

  // const data = await fetch(api);
  // if (!response.ok) {
  //   throw new Error(
  //     "There was an error, please refresh your browser and try again"
  //   );
  // }

  const getData = async (apiUrl) => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        "There was an error, please refresh your browser and try again"
      );
    }
    return response
      .buffer()
      .then((buf) => `data:image/jpeg;base64,` + buf.toString("base64"));
  };

  const data = getData(api);

  // const data = await fetch(api)
  //   .then((response) => response.buffer())
  //   .then((buf) => `data:image/jpeg;base64,` + buf.toString("base64"));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
