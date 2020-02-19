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

export {
    updateQaDashboard,
    getQaDashboard
};