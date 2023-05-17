type METHODTYPES = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";


const HttpService = (
  url:any,
  method: METHODTYPES = "GET",
  headers = {},
  body = null
) => {
 
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body && JSON.stringify(body),
  };

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
export default HttpService;
