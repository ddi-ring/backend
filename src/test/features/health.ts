import ddi from "@ddi-ring/api";
import typia from "typia";

export const test_health_check = async (connection: ddi.IConnection) => {
    const res = await ddi.functional.health.check(connection);
    typia.assert<"hello world!">(res);
};
