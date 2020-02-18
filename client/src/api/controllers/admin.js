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
const getAudit = async (event, user_id, orderby, page, size, startdate, enddate, starttime, endtime) => {
    try {

        const { data } = await fetcher.get(`/admin/audit?event=${event}&user_id=${user_id}&orderby=${orderby}&page=${page}&size=${size}&startdate=${startdate}&enddate=${enddate}&starttime=${starttime}&endtime=${endtime}`);
        return data;
    } catch (error) {
        throw error.message;
    }
}
const putUser = async (id) => {
    try {
        const { data } = await fetcher.put(`/users/${id}`)
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
    getAudit
};