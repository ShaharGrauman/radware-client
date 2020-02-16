import fetcher from '../fetcher';

const getUsers = async () => {
    try {
        const { data } = await fetcher.get(`/users`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const login = async (username, password) => {
    try{
        const { data } = await fetcher.post('/login',  {username, password});
        return data;
    }catch(error){
        throw error.message;
    }
}

export {
    getUsers,
    login
};