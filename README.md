[![lazada-open-api Logo](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho8z27L7eJEv3eLp4-jmFav2ajMUi6ybqhNaNYL7Q6PIOy8uuMs4gpxTLMDYieyKZ40O6SpyjdmMaBj1cIzrVUNRko_2QpwX2HBJDqrHTUmTvTw16fPdeOLLUn-OjXeEy5Yl0ZfOukpekXN51IweLyTL1yiBvw9QqHRrnb1KqreNLriOgNUJSA-7BFifOR/s1600/Untitled-1.png)](https://github.com/tudinhacoustic/lazada-open-api)

  Generate "signature", "signature by url" and more for [Lazada Open Platform](https://open.lazada.com/apps/doc/api).

  [![NPM Version][npm-version-image]][npm-url]
  
  I am very happy and grateful for everyone's help. These meaningful contributions will greatly help me in expanding the useful library to help people.

  <a href="https://www.buymeacoffee.com/tudinhacoustic" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

  Paypal: https://paypal.me/tudinhacoustic

## Content
1. [Installation](#installation)
2. [Features](#features)
3. [Community](#community)
4. [Generate Signature using Url](#generate-signature-using-url)
5. [Generate Signature](#generate-signature)
6. [Generate Timestamp](#generate-timestamp)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install lazada-open-api-package
```
[Back](#content)

## Features

  * Generate Signature using Url
  * Generate Signature
  * Generate Timestamp

[Back](#content)

## Community

  * [Discord](https://discord.com/channels/1164249669090693270/1164249669090693273) for support and discussion
  * [Github](https://github.com/tudinhacoustic/lazada-open-api/issues) for have issues

[Back](#content)

## Generate Signature using Url
```js
const lazadaOpenApi = require('lazada-open-api-package')

// Example Url.
// The package helps remove the "sign", and the "time" has been decoded.
const url = 'https://api.lazada.vn/rest/orders/get?sort_direction=DESC&offset=0&created_before=2023-10-18T23%3A59%3A59%2B07%3A00&created_after=2023-10-18T00%3A00%3A01%2B07%3A00&limit=10&sort_by=created_at&app_key=12xxxx&sign_method=sha256&access_token=50000200c10tlrxxx&timestamp=1697648276136';

const appSecret = 'AGk5JYxxxxx';

const signature = lazadaOpenApi.signByUrl(url, appSecret);
console.info(signature);
```
Response Data
```console
{
  signature: 'EC3C4FE433B16CCD1921D37319F4397A308E0731DA0019773B058DBDE3CFA5E2',
  timestamp: 1697648276136
}
```
[Back](#content)
## Generate Signature
```js
const lazadaOpenApi = require('lazada-open-api-package')

// The package helps remove the "sign", and the "time" has been decoded.
const params = {
    app_key: '12xxxxx',
    code: '0_122xxxxx',
    timestamp: '1697642709712',
    sign_method: 'sha256'
}
const path = '/auth/token/create';
const appSecret = 'AGk5JYxxxxx';
const signature = lazadaOpenApi.signature(params, path, appSecret);
console.info(signature);
```
Response Data
```console
{
  signature: 'EC3C4FE433B16CCD1921D37319F4397A308E0731DA0019773B058DBDE3CFA5E2',
  timestamp: 1697648276136
}
```
[Back](#content)

## Generate Timestamp
```js
const lazadaOpenApi = require('lazada-open-api-package')

const timestamp = lazadaOpenApi.timestamp();
console.info(timestamp);
```
Response Data
```console
1697650466818
```
[Back](#content)

[npm-url]: https://npmjs.org/package/lazada-open-api-package
[npm-version-image]: https://badgen.net/npm/v/lazada-open-api-package

Follow me on: 
[Linkedin](https://www.linkedin.com/in/tudinhacoustic) |
[Youtube](https://www.youtube.com/c/TuDinh) |
[Facebook](https://www.facebook.com/TuThichLapTrinh)

  