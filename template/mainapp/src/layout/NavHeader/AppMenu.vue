<template>
    <div class="apps">
        <div
            :style="{
                display: 'flex',
                'align-items': 'center'
            }"
            @click="visible = true"
        >
            <slot />
        </div>
        <a-drawer
            title="应用与服务"
            placement="left"
            :closable="false"
            :visible="visible"
            :width="320"
            @close="visible = false"
        >
            <a-menu
                mode="inline"
                class="apps__menus"
                :selected-keys="selectedKeys"
            >
                <a-menu-item
                    v-for="app in appList"
                    :key="app.name"
                    @click="menuClickHandle(app)"
                >
                    {{ app.appName }}
                </a-menu-item>
            </a-menu>
        </a-drawer>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {

        filters: {
            hasCurrentApp(app) {
                return this.currentApp.name === app.name;
            }
        },
        data() {
            return {
                visible: false
            };
        },

        computed: {
            ...mapGetters({
                currentApp: 'settings/currentApp',
                appList: 'settings/appList'
            }),

            selectedKeys() {
                return this.appList.filter(app => app.name === this.$route.name)
                    .map(app => app.name);
            }
        },

        methods: {
            ...mapActions({
                changeApp: 'settings/changeApp'
            }),

            async menuClickHandle(app) {
                if (this.$route.name !== app.name) {
                    this.visible = false;
                    await this.changeApp(app);

                    this.$router.push({
                        path: app.name
                    });
                }
            }
        }
    };
</script>

<style lang="scss">
.apps__menus {
    border-right: none;
}
</style>
