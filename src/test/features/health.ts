import ddi from "@ddi-ring/api";

export const test_health_check = async (connection: ddi.IConnection) => {
    const res = await ddi.functional.health.check(connection);
    if (res.status === 200 && res.data === "hello world!") return;
    throw Error("Health Check Fail!");
};
