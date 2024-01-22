// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import alert from './alert';
import auth from './auth';
import order from './order';
import factory from './factory';
import customer from './customer';
import owner from './owner';
import sample from './sample'
import ordershistory from './order_history';
import satistics from './satistics';

// ==============================|| COMBINE REDUCERS ||============================== //

export default combineReducers({ 
    menu,
    alert,
    auth,
    order,
    factory,
    customer,
    owner,
    sample,
    ordershistory,
    satistics
});

