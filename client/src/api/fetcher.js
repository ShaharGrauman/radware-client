import axios from 'axios';
import Cookies from 'js-cookie';

const cookieName = 'radware';


const getCookieData = () => {
    //extract cookie data
    //For now - hard coded!
    const cookie = Cookies.get(cookieName);
    //express prefix the cookie value with 'j:'
    //So we slice it out
    return cookie && JSON.stringify(JSON.parse(unescape(cookie)));
}

const fetcher = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://radware-server-heroku.herokuapp.com/',
    withCredentials: true
});

fetcher.defaults.headers.common[cookieName] = getCookieData();

export default fetcher;