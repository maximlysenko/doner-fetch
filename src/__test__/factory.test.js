import { enableFetchMocks } from "jest-fetch-mock";
import createFetchService from "../factory";

enableFetchMocks();

describe("Fetch service factory", () => {
  const mockSuccessfulResponse = {
    ok: true,
    arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(1)),
    blob: jest.fn().mockResolvedValue(new Blob()),
    formData: jest.fn().mockResolvedValue(new FormData()),
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(""),
  };
  const mockFetch = jest.fn().mockResolvedValue(mockSuccessfulResponse);

  it("Should throw an error", () => {
    const mockFailedResponse = {
      ok: false,
    };
    const mockFetch = jest.fn().mockResolvedValue(mockFailedResponse);
    const fetch = createFetchService({
      rootURL: "/api",
      handleRequest: mockFetch,
    });

    fetch.get("/endpoint").catch((e) => {
      expect(e).toEqual(mockFailedResponse);
    });
  });

  describe("fn get", () => {
    it("Should construct correct request object", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });
      const params = new URLSearchParams();

      params.append("a", "value@5");
      params.append("b", "4");

      fetch.get("/endpoint", undefined, params).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          new Request("/api/endpoint?a=value%405&b=4", {
            credentials: "include",
            method: "GET",
          })
        );
      });
    });
    it("Should respect the 'preProcessAs' = 'arraybuffer'", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });

      fetch.get("/endpoint", { preProcessAs: "arraybuffer" }).then(() => {
        expect(mockSuccessfulResponse.arrayBuffer).toHaveBeenCalledTimes(1);
      });
    });
    it("Should respect the 'preProcessAs' = 'blob'", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });

      fetch.get("/endpoint", { preProcessAs: "blob" }).then(() => {
        expect(mockSuccessfulResponse.blob).toHaveBeenCalledTimes(1);
      });
    });
    it("Should respect the 'preProcessAs' = 'formdata'", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });

      fetch.get("/endpoint", { preProcessAs: "formdata" }).then(() => {
        expect(mockSuccessfulResponse.formData).toHaveBeenCalledTimes(1);
      });
    });
    it("Should respect the 'preProcessAs' = 'text'", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });

      fetch.get("/endpoint", { preProcessAs: "text" }).then(() => {
        expect(mockSuccessfulResponse.text).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("fn post", () => {
    it("Should construct correct request object", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });
      const body = JSON.stringify({ hello: "world" });
      const params = new URLSearchParams();

      params.append("a", "value@5");
      params.append("b", "4");

      fetch.post("/endpoint", { body }, params).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          new Request("/api/endpoint?a=value%405&b=4", {
            credentials: "include",
            method: "POST",
            body: '{"hello":"world"}',
          })
        );
      });
    });
  });

  describe("fn put", () => {
    it("Should construct correct request object", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });
      const body = JSON.stringify({ hello: "world" });
      const params = new URLSearchParams();

      params.append("a", "value@5");
      params.append("b", "4");

      fetch.put("/endpoint", { body }, params).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          new Request("/api/endpoint?a=value%405&b=4", {
            credentials: "include",
            method: "PUT",
            body: '{"hello":"world"}',
          })
        );
      });
    });
  });

  describe("fn patch", () => {
    it("Should construct correct request object", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });
      const body = JSON.stringify({ hello: "world" });
      const params = new URLSearchParams();

      params.append("a", "value@5");
      params.append("b", "4");

      fetch.patch("/endpoint", { body }, params).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          new Request("/api/endpoint?a=value%405&b=4", {
            credentials: "include",
            method: "PATCH",
            body: '{"hello":"world"}',
          })
        );
      });
    });
  });

  describe("fn delete", () => {
    it("Should construct correct request object", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });
      const body = JSON.stringify({ hello: "world" });
      const params = new URLSearchParams();

      params.append("a", "value@5");
      params.append("b", "4");

      fetch.delete("/endpoint", { body }, params).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          new Request("/api/endpoint?a=value%405&b=4", {
            credentials: "include",
            method: "DELETE",
            body: '{"hello":"world"}',
          })
        );
      });
    });
    it("Should construct correct request object", () => {
      const fetch = createFetchService({
        rootURL: "/api",
        handleRequest: mockFetch,
      });
      const body = JSON.stringify({ hello: "world" });
      const params = new URLSearchParams();

      params.append("a", "value@5");
      params.append("b", "4");

      fetch.delete("/endpoint", undefined, params).then(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          new Request("/api/endpoint?a=value%405&b=4", {
            credentials: "include",
            method: "DELETE",
          })
        );
      });
    });
  });
});
