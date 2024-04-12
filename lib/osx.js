'use strict';
const execa = require('execa');

const cmd = 'networksetup';

async function getWifiInterface() {
	const args = ['-listallhardwareports'];
	const stdout = await execa.stdout(cmd, args);
	return parseWifiInterface(stdout);
}

function getWifiInterfaceSync() {
	const args = ['-listallhardwareports'];
	const stdout = execa.sync(cmd, args).stdout;
	return parseWifiInterface(stdout);
}

function parseWifiInterface(stdout) {
	const match = /Hardware Port: Wi-Fi\nDevice: (\w+)/gm.exec(stdout);
	if (!match) {
		console.warn('Could not get Wi-Fi interface name; using en0');
		return 'en0';
	}
	return match[1];
}

function parseWifiName(stdout) {
	if (stdout.includes('not associated with an AirPort network')) {
		throw new Error('Wi-Fi is turned off');
	}

	let ret;

	ret = /^Current Wi-Fi Network: (.+)\s*$/gm.exec(stdout);
	ret = ret && ret.length ? ret[1] : null;

	if (!ret) {
		throw new Error('Could not get SSID');
	}

	return ret;
}

module.exports = async () => {
	const wifiInterface = await getWifiInterface();
	const args = ['-getairportnetwork', wifiInterface];
	const stdout = await execa.stdout(cmd, args);
	return parseWifiName(stdout);
};

module.exports.sync = () => {
	const wifiInterface = getWifiInterfaceSync();
	const args = ['-getairportnetwork', wifiInterface];
	const stdout = execa.sync(cmd, args).stdout;
	return parseWifiName(stdout);
};
