# API SDK

## Example

```ts
import ddi from "@ddi-ring/api";

const response: "hello world!" = await ddi.functional.health.check({
    host: "http://localhost:4000",
});
```
