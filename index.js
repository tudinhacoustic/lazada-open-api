const Common = require('./common/common');
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
module.exports = {
    timestamp,
    signature,
    signByUrl
}