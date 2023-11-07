const axios = require('axios');
const Common = require('./common/common');
const constants = require('./constants');
function timestamp() {
    return Common.timestamp();
}
function signature(params = {}, path = '', appSecret = '') {
    const error = Common.checkConfig(params, path, appSecret);
    if (error) {
        return new Error(error);
    }
    return Common.signature(params, path, appSecret);
}
function signByUrl(url = '', appSecret = '') {
    const error = Common.checkUrl(url, appSecret);
    if (error) {
        return new Error(error);
    }
    return Common.signByUrl(url, appSecret);
}
async function authCodeToken(appKey, authCode, appSecret) {
    let result = {};
    let errorResponse = '';
    if (!authCode) {
        return new Error('authCode is required');
    }
    if (!appKey) {
        return new Error('appKey is required');
    }
    if (!appSecret) {
        return new Error('appSecret is required');
    }
    const url = constants.generateTokenByAuthCodeUrl;
    const params = {
        app_key: appKey,
        code: authCode,
        timestamp: timestamp(),
        sign_method: 'sha256'
    }
    const path = '/auth/token/create';
    const sign = signature(params, path, appSecret);
    const queries = {
        ...params,
        timestamp: sign.timestamp,
        sign: sign.signature,
    }
    await axios.post(url, queries)
    .then((res) => {
        result = res.data;
    })
    .catch(err => {
        errorResponse = err.message;
    })
    if (errorResponse) { return new Error(errorResponse) };
    return result;
}
async function generateToken(appKey, refreshToken, appSecret) {
    let result = {};
    let errorResponse = '';
    if (!refreshToken) {
        return new Error('refreshToken is required');
    }
    if (!appKey) {
        return new Error('appKey is required');
    }
    if (!appSecret) {
        return new Error('appSecret is required');
    }
    const params = {
        refresh_token: refreshToken,
        app_key: appKey,
        sign_method: 'sha256',
        timestamp: timestamp(),
    };
    const path = '/auth/token/refresh';
    const sign = signature(params, path, appSecret);
    const url = `${constants.generateTokenByRefreshTokenUrl}?refresh_token=${refreshToken}&app_key=${appKey}&sign_method=sha256&timestamp=${sign.timestamp}&sign=${sign.signature}`;
    await axios.get(url)
    .then((res) => {
        if (res.data) {
            result = res.data;
        } else {
            result = res.data;
        }
    })
    .catch(err => {
        errorResponse = err.message;
    })
    if (errorResponse) { return new Error(errorResponse) };
    return result;
}
module.exports = {
    timestamp,
    signature,
    signByUrl,
    authCodeToken,
    generateToken,
}