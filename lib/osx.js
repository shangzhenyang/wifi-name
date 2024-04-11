'use strict';
const execa = require('execa');

module.exports = () => {
	const cmd = 'networksetup';
	const args = ['-getairportnetwork', 'en0'];

	return execa.stdout(cmd, args).then(stdout => {
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
	});
};

module.exports.sync = () => {
	const cmd = 'networksetup';
	const args = ['-getairportnetwork', 'en0'];
	const stdout = execa.sync(cmd, args).stdout;

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
};
