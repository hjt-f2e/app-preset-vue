import { extendApi } from '@/utils';
import { get, post } from '@/utils/http';

const getApi = {
    getUserInfo: 'login/app-user-info',
    logout: 'login/app-logout'
};

export default {
    ...extendApi(getApi, get)
};
