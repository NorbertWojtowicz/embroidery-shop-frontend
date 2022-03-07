class CookieUtil {
    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURI(parts.pop().split(';').shift()).trim();
    }
    static setRefreshedToken(token) {
        const cookieExpire = new Date();
        cookieExpire.setTime(Date.now() + 3600000 * 24 * 7);
        document.cookie = `access_token=${encodeURI(token)};expires=${cookieExpire.toGMTString()}`;
    }
}

export default CookieUtil;
