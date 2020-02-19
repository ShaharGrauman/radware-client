import Cookies from 'js-cookie';

const cookieName = 'loginDetails';

const getGuestUser = () => {
    return { userId: null, username: null, roles: [] };
}

const setUser = user => {
    Cookies.set(cookieName, user);
}

const getUser = () => {
    return Cookies.get(cookieName);
}

const logout = () => {
    Cookies.remove(cookieName);
}

export {
    getGuestUser,
    setUser,
    getUser,
    logout
};