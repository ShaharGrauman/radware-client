import React from 'react';
import {Redirect} from 'react-router-dom';

const homepages = {
    admin: '/users',
    support: '/support',
    researcher: '/researcher-dashboard',
    QaDashboard: '/QaDashboard'
}

export default role => <Redirect to={homepages[role]} />;