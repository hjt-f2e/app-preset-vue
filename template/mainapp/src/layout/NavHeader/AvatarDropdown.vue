<template>
    <a-dropdown
        v-if="userInfo && userInfo.name"
        placement="bottomRight"
    >
        <span class="user">
            <a-avatar
                size="small"
                :src="userInfo.avatar_url"
                class="antd-pro-global-header-index-avatar"
            />
            <span>{{ userInfo.name }}</span>
        </span>
        <template slot="overlay">
            <a-menu
                class="ant-pro-drop-down menu"
            >
                <a-menu-item
                    key="logout"
                    @click="handleLogout"
                >
                    <a-icon type="logout" />
                    退出登录
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
    <span v-else>
        <a-spin
            size="small"
            :style="{ marginLeft: 8, marginRight: 8 }"
        />
    </span>
</template>

<script>
    import URI from 'urijs';
    import { mapGetters, mapActions } from 'vuex';
    import api from '@/api';

    export default {
        computed: mapGetters({
            userInfo: 'user/userInfo'
        }),

        methods: {
            ...mapActions({
                removeToken: 'user/resetToken'
            }),

            handleLogout() {
                api.user.logout()
                    .then(() => {
                        this.removeToken();
                        const urlObj = new URI(window.location.href);
                        const homePage = `${urlObj.protocol()}://${urlObj.host()}`;
                        window.location.href = `${process.env.VUE_APP_SSO_LOGIN_URL}?redirect_url=${homePage}`;
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
.user {
    padding: 0 12px;
    cursor: pointer;

    .antd-pro-global-header-index-avatar {
        margin-right: 8px;
    }
}
</style>
