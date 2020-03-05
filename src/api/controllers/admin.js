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

const editUserById = async (id, user) => {
    try {
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
        throw error.message
    }
}

const getpermission = async () => {
    try {
        const { data } = await fetcher.get(`/role/permissions`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const createNewUser = async (user) => {
    try {
        const { data } = await fetcher.post('/users/new_user', user)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const resetPassword = async (username) => {
    try {
        const { data } = await fetcher.post('/login/resetPassword', { username })
        return data;
    } catch (error) {
        throw error.message;
    }
}

const deleteUser = async (username) => {
    try {
        const { data } = await fetcher.put('/users/delete_user', { username })
        return data;
    } catch (error) {
        throw error.message;
    }
}

const deleteRole = async (role) => {
    try {
        const { data } = await fetcher.put(`/role/delete/${role}`)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const updatePassword = async (username, tempPwd, newPwd) => {
    try {
        const { data } = await fetcher.put('/login/resetPassword', { username, tempPwd, newPwd })
        return data;
    } catch (error) {
        throw error.message;
    }
}

const createNewRole = async (role) => {
    try {
        const { data } = await fetcher.post('/role/new_role', role)
        return data;
    } catch (error) {
        throw error.message;
    }

}

const editRole = async (id, user) => {
    try {
        const { data } = await fetcher.put(`/role/${id}`, user)
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
    getpermission,
    createNewUser,
    createNewRole,
    getRolesEdit,
    editUserById,
    resetPassword,
    updatePassword,
    deleteUser,
    getRoleWithId,
    getAudit,
    editRole,
    getConstant,
    deleteRole

};