const crypto = require('crypto');
module.exports = class Common {
    static timestamp() {
        return new Date().getTime();
    }
    static sha256Decoded(plainText, secretKey) {
		const hmac = crypto.createHmac('sha256', secretKey);
		hmac.update(plainText);
		return hmac.digest('hex');
	}
    static signature(params = {}, path = '', appSecret = '') {
        let input = '';
        let timestamp = this.timestamp();
        if (params.timestamp) {
            timestamp = params.timestamp;
        }
        const key = this.sortKeyObject(params);
        for(let index = 0; index < key.length; index += 1) {
            input+=key[index]+params[key[index]];
        };
        const plainText = path+input;
        const signature = this.sha256Decoded(plainText, appSecret);
        return {
            signature: signature.toUpperCase(),
            timestamp,
        }
    }
    static signByUrl(url = '', appSecret = '') {
        const { path, query } = this.getPathQueryFromUrl(decodeURIComponent(url));
        const params = this.parseQueryString(query);
        return this.signature(params, path, appSecret);
    }
    static parseQueryString(queryString) {
        const obj = {};
        queryString.split('&').forEach((keyValue) => {
            const [key, value] = keyValue.split('=');
            obj[key] = isNaN(value) ? value : parseFloat(value);
        });
        return obj;
    }
    static getPathQueryFromUrl(url = '') {
        const parts = url.split("?");
        const match = url.match(/\/rest(.*?)\?/);
        return {
            path: match[1],
            query: parts[1],
        };
    }
    static sortKeyObject(pathObj = {}) {
        const declareKeyObj = ["sign"]     
        const keys = Object.keys(pathObj).filter((k) => !declareKeyObj.includes(k));  
        return keys.sort((a, b) => a.localeCompare(b));
    }
    static checkConfig(params, path, appSecret) {
        let error = '';
        if (!params) {
            error = `params is required`;
        }
        if (!path) {
            error = `path is required`;
        }
        if (!appSecret) {
            error = `appSecret is required`;
        }
        return error;
    }
    static checkUrl(url, appSecret) {
        let error = '';
        if (!url) {
            error = `url is required`;
        }
        if (!appSecret) {
            error = `appSecret is required`;
        }
        return error;
    }
}