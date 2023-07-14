![Build](https://github.com/maximlysenko/doner-fetch/actions/workflows/build.yml/badge.svg?branch=main)

```javascript
import { createFetchService } from "@doner/fetch";

const fetchService = createFetchService({
  handleRequest: window.fetch.bind(window),
  rootURL: "/api",
});
const ac = new AbortController();
const searchParams = new URLSearchParams();

searchParams.append("page", "1");
searchParams.append("pageSize", "25");

fetchService.get("/todos");
fetchService.get("/todos", { signal: ac.signal });
fetchService.get("/todos", { signal: ac.signal }, searchParams);
```
