declare module "@doner/fetch" {
  export type ResponseBodyType =
    | "json"
    | "text"
    | "blob"
    | "formdata"
    | "arraybuffer";

  export type RequestHandler = (request: Request) => Promise<Response>;

  export type RequestOptions = RequestInit & {
    preProcessAs?: ResponseBodyType;
  };

  export type RequestOptionsWithBody = Required<Pick<RequestOptions, "body">> &
    Omit<RequestOptions, "body" | "method">;

  export type FetchService = {
    delete<R>(
      url: string,
      options?: Omit<RequestOptions, "method">,
      params?: URLSearchParams
    ): Promise<R>;
    get<R>(
      url: string,
      options?: Omit<RequestOptions, "body" | "method">,
      params?: URLSearchParams
    ): Promise<R>;
    patch<R>(
      url: string,
      options: RequestOptionsWithBody,
      params?: URLSearchParams
    ): Promise<R>;
    post<R>(
      url: string,
      options: RequestOptionsWithBody,
      params?: URLSearchParams
    ): Promise<R>;
    put<R>(
      url: string,
      options: RequestOptionsWithBody,
      params?: URLSearchParams
    ): Promise<R>;
  };

  export type FetchServiceFactoryDeps = {
    readonly rootURL: string;
    readonly handleRequest: RequestHandler;
  };

  export function createFetchService(
    deps: Readonly<FetchServiceFactoryDeps>
  ): FetchService;
}
