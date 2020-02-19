import { Component } from 'react';
import axios from 'axios';

export default class constants extends Component {
    static getStatuses = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:3001/getStatuses').then(response => resolve(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }

    static getAttacks = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:3001/attack').then(response => resolve(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }
}