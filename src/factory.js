export default function createFetchService(deps) {
  const { rootURL, handleRequest } = deps;

  function getResponsePreProcessor(preProcessAs) {
    return function preProcessResponse(response) {
      if (!response.ok) {
        throw response;
      }

      switch (preProcessAs) {
        case "arraybuffer":
          return response.arrayBuffer();
        case "blob":
          return response.blob();
        case "formdata":
          return response.formData();
        case "text":
          return response.text();
        case "json":
        default:
          return response.json();
      }
    };
  }

  function populateWithQueryParams(url, params) {
    if (typeof params !== "undefined") {
      return url + "?" + params.toString();
    }

    return url;
  }

  function createRequest(url, options, params) {
    return new Request(rootURL + populateWithQueryParams(url, params), {
      credentials: "include",
      ...options,
    });
  }

  async function send(url, options, params) {
    const { preProcessAs = "json", ...rest } = options;
    const request = createRequest(url, rest, params);

    return handleRequest(request).then(getResponsePreProcessor(preProcessAs));
  }

  return {
    async delete(url, options = {}, params) {
      return send(url, { ...options, method: "DELETE" }, params);
    },
    async get(url, options = {}, params) {
      return send(url, { ...options, method: "GET" }, params);
    },
    async patch(url, options, params) {
      return send(url, { ...options, method: "PATCH" }, params);
    },
    async post(url, options, params) {
      return send(url, { ...options, method: "POST" }, params);
    },
    async put(url, options, params) {
      return send(url, { ...options, method: "PUT" }, params);
    },
  };
}
