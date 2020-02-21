import fetcher from '../fetcher';

const updateQaDashboard = async (signatureIds) => {
    try {
        const { data } = await fetcher.put('/Qa/dashboard', signatureIds)
        return data;
    } catch (error) {
        throw error.message;
    }
}
const getQaDashboard = async () => {
    try {
        const { data } = await fetcher.get('/Qa/dashboard')
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getSignatures = async () => {
    try {
        const { data } = await fetcher.get('/signature/researcher')
        console.log(data);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getResearcher = async (requestURL) => {
    try {
        const { data } = await fetcher.get(requestURL)
        return data;
    } catch (error) {
        throw error.message;
    }
}

export {
    updateQaDashboard,
    getQaDashboard,
    getResearcher,
    getSignatures
};