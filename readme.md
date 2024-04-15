# wifi-name

Get the current Wi-Fi name.

This fork enhances [wifi-name](https://www.npmjs.com/package/wifi-name) by adding TypeScript type definitions, making it easier to be used in TypeScript projects. It also resolves compatibility issues with macOS Sonoma by updating the method used to retrieve the Wi-Fi name.

## Install

```
$ npm install @shangzhen/wifi-name
```


## Usage

```js
const wifiName = require('@shangzhen/wifi-name');

wifiName().then(name => {
	console.log(name);
	//=> 'wu-tang lan'
});
```


## API

### wifiName()

Returns a `Promise` for a `string` with the current wifi name.

### wifiName.sync()

Returns a `string` with the current wifi name.


## Related

* [wifi-name-cli](https://github.com/kevva/wifi-name-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
