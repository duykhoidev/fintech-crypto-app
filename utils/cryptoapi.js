import axios from "axios";
import { XRapidAPIHost, XRapidAPIKey } from "./api";

// Endpoints

const apiBaseUrl = "https://coinranking1.p.rapidapi.com";

// GET /coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0 HTTP/1.1
const coinsUrl = `${apiBaseUrl}/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=30&offset=0`;

const CryptoApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
    headers: {
      "X-RapidAPI-Key": `${XRapidAPIKey}`,
      "X-RapidAPI-Host": `${XRapidAPIHost}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const FetchAllCoins = async () => {
  return await CryptoApiCall(coinsUrl);
};

export const FetchCoinDetails = async (coinUuid) => {
  // GET /coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h
  const endPoints = `${apiBaseUrl}/coin/${coinUuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
  return await CryptoApiCall(endPoints);
};

export const FetchCoinHistory = async (coinUuid) => {
  // GET /coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h HTTP/1.1
  const endPoints = `${apiBaseUrl}/coin/${coinUuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
  return await CryptoApiCall(endPoints);
};

export const SearchCoin = async (search) => {
  // GET /search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl&query=bitcoin
  const endPoints = `${apiBaseUrl}/search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl&query=${search}`;
  return await CryptoApiCall(endPoints);
};