import fetcher from '../fetcher';

const createSignature = async sigdata => {
    try {
        const { data } = await fetcher.post(`/signature/`, sigdata);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getSignature = async id => {
    try {
        const { data } = await fetcher.get(`/signature/${id}`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const createSignatureWithDefaults = async sigdata => {
    try {
        const { data } = await fetcher.post(`/signature/`, sigdata);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const updateSignature = async (id, sigdata) => {
    try {
        const { data } = await fetcher.put(`/signature/${id}`, sigdata);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getAttacks = async () => {
    try {
        const { data } = await fetcher.get(`/attack`);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getStatuses = async () => {
    try {
        const { data } = await fetcher.get(`/constant`);
        return data.status;
    } catch (error) {
        throw error.message;
    }
}

export {
    getSignature,
    createSignatureWithDefaults,
    updateSignature,
    createSignature,
    getAttacks,
    getStatuses
};