import axios from 'axios';
import Cookies from 'js-cookie';

const cookieName = 'radware';
const getCookieData = () => {
    const cookie = Cookies.get(cookieName);
    return cookie && JSON.stringify(JSON.parse(unescape(cookie)));
}

const fetcher = axios.create({
    baseURL: 'https://heroku-server-radware.herokuapp.com',
    withCredentials: true
});

fetcher.defaults.headers.common[cookieName] = getCookieData();

export default fetcher;