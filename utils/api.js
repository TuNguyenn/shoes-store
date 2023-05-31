import { API_URL, STRAPI_API_TOKEN } from './urls';

export const fetchDataFromApi = async (endpoint) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + STRAPI_API_TOKEN);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const res = await fetch(`${API_URL}${endpoint}`, requestOptions);
  const data = await res.json();

  return data;
};

export const makePaymentResquest = async (endpoint, payload) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + STRAPI_API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};
