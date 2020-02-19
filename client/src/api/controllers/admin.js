import fetcher from '../fetcher';

const getUsers = async () => {
    try {
        const { data } = await fetcher.get(`/users`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getRoles = async () => {
    try {
        const { data } = await fetcher.get(`/admin/roles`);
        return data;
    } catch (error) {
        throw error.message;
    }
}
const getRolesNew = async () => {
    try {
        const { data } = await fetcher.get(`/users/roles`);
        return data;
    } catch (error) {
        throw error.message;
    }
}
const getRolesEdit = async (id) => {
    try {
        const { data } = await fetcher.get(`/users/${id}`);
        return data;
    } catch (error) {
        throw error.message;
    }
}
const putUser = async (id , user) => {
    try {
        console.log("putUser: " ,id)
        console.log("and user : ", user)
        const { data } = await fetcher.put(`/users/${id}`, {user})
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
const getpermissionNew = async () => {
    try {
        const { data } = await fetcher.get(`/role/permissions`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const postNewUser = async (user) => {
    try {
        const { data } = await fetcher.post('/users/new_user', user)
        return data;
    } catch (error) {
        console.log('aaaa')
        throw error.message;
    }
}
const postResetPassword = async (username) => {
    try {
        const { data } = await fetcher.post('/login/resetPassword', username)
        console.log('data', data)
        return data;
    } catch (error) {
        throw error.message;
    }
}
const deleteUser = async (username) => {
    try {
        const { data } = await fetcher.put('/users/delete_user', username)
        return data;
    } catch (error) {
        throw error.message;
    }
}
const putUpdatePassword = async (username, tempPwd, newPwd) => {
    try {
        const { data } = await fetcher.put('/login/resetPassword', {username,tempPwd,newPwd})
        return data;
    } catch (error) {
        throw error.message;
    }
}
const postNewRole = async (role) => {
    try {
        const { data } = await fetcher.post('/role/new_role', role)
        return data;
    } catch (error) {
        throw error.message;
    }
}
export {
    getUsers,
    login,
    getRoles,
    getRolesNew,
    getpermissionNew,
    postNewUser,
    postNewRole,
    getRolesEdit,
    putUser,
    postResetPassword,
    putUpdatePassword,
    deleteUser
};