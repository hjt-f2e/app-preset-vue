import { get } from '@/utils/http';

const getUserInfo = (): Promise<any> => get('/auth/sso/user-info');

export default {
    getUserInfo
};
