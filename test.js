import test from "ava";
import { getWifiName, getWifiNameSync } from "./lib/main.js";

test("async", async (t) => {
	const result = await getWifiName();
	t.truthy(result);
});

test("sync", (t) => {
	const result = getWifiNameSync();
	console.log(result);
	t.truthy(result);
});
