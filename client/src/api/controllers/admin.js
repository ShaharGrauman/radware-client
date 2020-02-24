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

const getRolesList = async () => {
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

const getRoleWithId = async (id) => {
    try {
        const { data } = await fetcher.get(`/role/${id}`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const putUser = async (id, user) => {
    try {
        console.log("putUser: ", id)
        const { data } = await fetcher.put(`/users/${id}`, user)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getAudit = async (event, users_names, orderby, page, size, startdate, enddate, starttime, endtime) => {
    try {

        const { data } = await fetcher.get(`/admin/audit?event=${event}&users_names=${users_names}&orderby=${orderby}&page=${page}&size=${size}&startdate=${startdate}&enddate=${enddate}&starttime=${starttime}&endtime=${endtime}`);
        return data;
    } catch (error) {
        throw error.message;
    }
}


const login = async (username, password) => {
    try {
        const { data } = await fetcher.post('/login', { username, password });
        return data;
    } catch (error) {
        console.log(error)
        throw error.msg
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

const postResetPassword = async (username) => {
    try {
        const { data } = await fetcher.post('/login/resetPassword', { username })
        console.log('data', data)
        return data;
    } catch (error) {
        throw error.message;
    }
}
const deleteUser = async (username) => {
    try {
        console.log("username in admin: ", username);
        const { data } = await fetcher.put('/users/delete_user', { username })
        return data;
    } catch (error) {
        throw error.message;
    }
}
const putUpdatePassword = async (username, tempPwd, newPwd) => {
    try {
        const { data } = await fetcher.put('/login/resetPassword', { username, tempPwd, newPwd })
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
const putRole = async (id, user) => {
    try {
        console.log("in admin -- the id is :  ", id);
        console.log("and the user is : ", user);
        const { data } = await fetcher.put(`/role/${id}`, user)
        console.log(user);
        return data;
    } catch (error) {
        throw error.message;
    }
}
const getConstant = async () => {
    try {
        const { data } = await fetcher.get(`/constant`);
        return data;
    } catch (error) {
        throw error.message;
    }
}
export {
    getUsers,
    login,
    getRoles,
    getRolesList,
    getpermissionNew,
    postNewUser,
    postNewRole,
    getRolesEdit,
    putUser,
    postResetPassword,
    putUpdatePassword,
    deleteUser,
    getRoleWithId,
    getAudit,
    putRole,
    getConstant

};