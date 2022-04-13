import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const TOKEN_KEY = process.env.NODE_ENV === 'production' ? 'production_1ac4824f700ce88566c1ff053d843b64' : 'staging_1ac4824f700ce88566c1ff053d843b64';
const cookies = Cookies.withAttributes({
    path: '/',
    domain: process.env.VUE_APP_DOMAIN,
    expires: 1,
});

function getToken(): string {
    return cookies.get(TOKEN_KEY) || '';
}

function setToken(token: string) {
    cookies.set(TOKEN_KEY, token);
}

function removeToken() {
    cookies.remove(TOKEN_KEY);
}

export const useUserStore = defineStore('user', {
    state: (): user.state => ({
        token: getToken(),
        userInfo: undefined,
        routers: null
    }),

    actions: {
        setToken(token: string) {
            this.token = token;
            setToken(token);
        },

        resetToken() {
            this.token = '';
            removeToken();
        },

        getToken() {
            return getToken();
        },

        setUserInfo(userInfo: user.userInfo) {
            this.userInfo = userInfo;
        },

        setRouter(routers: RouterConfig) {
            this.routers = routers;
        }
    },
});

export default {
    useUserStore,
};
