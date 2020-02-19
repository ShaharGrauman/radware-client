import axios from 'axios';

export default class constants {
    static getStatuses = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:3000/getStatuses').then(response => resolve(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }

    static getAttacks = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:3000/attack').then(response => resolve(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }
}