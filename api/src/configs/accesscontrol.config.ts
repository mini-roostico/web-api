import { AccessControl } from 'accesscontrol';

let grantsObject = {
    admin: {
        users: {
            'read:any': ['*'],
            'update:any': ['*', '!role'],
            'delete:any': ['*']
        },
        sources: {
            'read:any': ['*'],
            'create:any': ['*'],
            'delete:any': ['*'],
            'update:any': ['*']
        },
    },
    user: {
        users: {
            'read:own': ['*'],
            'update:own': ['*', '!role'],
            'delete:own': ['*']
        },
        sources: {
            'read:own': ['*'],
            'create:own': ['*'],
            'delete:own': ['*'],
            'update:own': ['*']
        },
    }
};

const acObject: AccessControl = new AccessControl(grantsObject);
acObject.lock();

export {acObject as ac};