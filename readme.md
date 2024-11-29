# wifi-name

Get the current Wi-Fi name.

This fork refactors [wifi-name](https://www.npmjs.com/package/wifi-name) as an ES module using TypeScript. It also resolves compatibility issues with macOS Sequoia by updating the method used to retrieve the Wi-Fi name.

## Install

```
$ npm install @shangzhen/wifi-name
```

## Usage

```js
import { getWifiName } from "@shangzhen/wifi-name";

const wifiName = await getWifiName();
console.log(wifiName);
```

## API

### getWifiName()

Returns a `Promise` for a `string` with the current wifi name.

### getWifiNameSync()

Returns a `string` with the current wifi name.

## Related

- [wifi-name-cli](https://github.com/kevva/wifi-name-cli) - CLI for this module

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
