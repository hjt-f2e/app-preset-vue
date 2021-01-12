import { extendApi } from '@/utils';
import { get, post } from '@/utils/http';

const getApi = {
    getUserInfo: 'auth/sso/user-info'
};

const postApi = {

};

export default {
    ...extendApi(getApi, get),
    ...extendApi(postApi, post)
};
