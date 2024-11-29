import { execa, execaSync } from "execa";

export default async (): Promise<string> => {
	const cmd = "iwgetid";
	const args = ["--raw"];

	const { stdout } = await execa(cmd, args);
	const ret = stdout.replace("\n", "");

	if (!ret) {
		throw new Error("Could not get SSID");
	}

	return ret;
};

export function sync(): string {
	const cmd = "iwgetid";
	const args = ["--raw"];
	const ret = execaSync(cmd, args).stdout.replace("\n", "");

	if (!ret) {
		throw new Error("Could not get SSID");
	}

	return ret;
}
