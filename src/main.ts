import * as linux from "./linux.js";
import * as osx from "./osx.js";
import * as win from "./win.js";

let getWifiName: () => Promise<string>;
let getWifiNameSync: () => string;

if (process.platform === "darwin") {
	getWifiName = osx.default;
	getWifiNameSync = osx.sync;
} else if (process.platform === "win32") {
	getWifiName = win.default;
	getWifiNameSync = win.sync;
} else {
	getWifiName = linux.default;
	getWifiNameSync = linux.sync;
}

export { getWifiName, getWifiNameSync };
export default getWifiName;
