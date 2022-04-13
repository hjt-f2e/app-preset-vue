<template>
    <a-layout id="layout">
        <a-layout-sider
            :style="{
                'flex': '0 0 256px',
                'max-width': '256px',
                'min-width': '256px',
                'width': '256px',
                'box-shadow': '2px 0 6px rgba(0,21,41,.35)'
            }"
        >
            <div class="logo" />
            <a-menu
                v-model="selectedKeys"
                theme="dark"
                mode="inline"
                :open-keys.sync="openKeys"
                @click="menuClickHandle"
                @openChange="openChangeHandle"
            >
                <template v-for="item in routerList[0].children">
                    <a-menu-item
                        v-if="!item.children"
                        :key="item.path"
                    >
                        <a-icon
                            v-if="item.meta.icon"
                            :type="item.meta.icon"
                        />
                        <span>{{ item.meta.title }}</span>
                    </a-menu-item>
                    <a-sub-menu
                        v-else
                        :key="item.path"
                    >
                        <span slot="title">
                            <a-icon
                                v-if="item.meta.icon"
                                :type="item.meta.icon"
                            />
                            {{ item.meta.title }}
                        </span>
                        <template v-for="child in item.children">
                            <a-menu-item :key="child.path">
                                <router-link :to="{ name: child.name, params: child.params }">
                                    <a-icon
                                        v-if="child.meta.icon"
                                        :type="child.meta.icon"
                                    />
                                    <span>{{ child.meta.title }}</span>
                                </router-link>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb
                    style="margin: 16px 0"
                    :routes="$route.matched"
                >
                    <template
                        slot="itemRender"
                        slot-scope="{route, params, routes}"
                    >
                        <span v-if="routes.indexOf(route) === routes.length - 1 ">
                            {{ route.meta.title }}
                        </span>
                        <router-link
                            v-else
                            :to="{ name: route.name, params: params }"
                        >
                            {{ route.meta.title }}
                        </router-link>
                    </template>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view />
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                openKeys: [],
                selectedKeys: [this.$route.path]
            };
        },

        computed: {
            ...mapState({
                routerList(state) {
                    return state.router.router;
                }
            })
        },

        watch: {
            '$route.path': {
                handler() {
                    this.selectedKeys = [this.$route.path];

                    this.routerList[0].children.forEach(item => {
                        const hasMatched = this.$route.matched.some(route => item.path === route.path);
                        if (hasMatched) {
                            this.openKeys = [...this.openKeys, item.path];
                        }
                    });
                },
                immediate: true
            }
        },

        methods: {
            menuClickHandle({ key }) {
                if (key !== this.$route.path) {
                    this.$router.push({
                        path: key
                    });
                }
            },

            openChangeHandle(openKeys) {
                this.openKeys = openKeys;
            }
        }
    };
</script>

<style lang="scss">
    #layout {
        min-height: 100vh;

        .trigger {
            font-size: 18px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .trigger:hover {
            color: #1890ff;
        }

        .logo {
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            margin: 16px;
        }
    }
</style>
