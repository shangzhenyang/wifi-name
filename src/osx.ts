import { execa, execaSync } from "execa";

const commands: Record<string, [string, string[]]> = {
	getWifiInterface: ["networksetup", ["-listallhardwareports"]],
	getWifiName: ["ipconfig", ["getsummary"]],
};

async function getWifiInterface(): Promise<string> {
	const { stdout } = await execa(...commands.getWifiInterface);
	return parseWifiInterface(stdout);
}

function getWifiInterfaceSync(): string {
	const stdout = execaSync(...commands.getWifiInterface).stdout;
	return parseWifiInterface(stdout);
}

function parseWifiInterface(stdout: string): string {
	const match = /Hardware Port: Wi-Fi\nDevice: (\w+)/gm.exec(stdout);
	if (!match) {
		console.warn("Could not get Wi-Fi interface name; using en0");
		return "en0";
	}
	return match[1];
}

function parseWifiName(stdout: string): string {
	let ret;

	ret = /\sSSID : (.+)\s*\n/gm.exec(stdout);
	ret = ret && ret.length ? ret[1] : null;

	if (!ret) {
		throw new Error("Could not get SSID");
	}

	return ret;
}

export default async (): Promise<string> => {
	const wifiInterface = await getWifiInterface();
	const args = commands.getWifiName[1].concat(wifiInterface);
	const { stdout } = await execa(commands.getWifiName[0], args);
	return parseWifiName(stdout);
};

export function sync(): string {
	const wifiInterface = getWifiInterfaceSync();
	const args = commands.getWifiName[1].concat(wifiInterface);
	const stdout = execaSync(commands.getWifiName[0], args).stdout;
	return parseWifiName(stdout);
}
