import { execa, execaSync } from "execa";

export default async (): Promise<string> => {
	const cmd = "netsh";
	const args = ["wlan", "show", "interface"];

	const { stdout } = await execa(cmd, args);
	let ret;

	ret = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout);
	ret = ret && ret.length ? ret[1] : null;

	if (!ret) {
		throw new Error("Could not get SSID");
	}

	return ret;
};

export function sync(): string {
	const cmd = "netsh";
	const args = ["wlan", "show", "interface"];
	const stdout = execaSync(cmd, args).stdout;

	let ret;

	ret = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout);
	ret = ret && ret.length ? ret[1] : null;

	if (!ret) {
		throw new Error("Could not get SSID");
	}

	return ret;
}
