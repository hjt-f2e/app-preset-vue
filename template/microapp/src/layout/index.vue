<template>
    <a-layout id="layout">
        <a-layout-sider>
            <div class="logo" />
            <a-menu
                v-model="selected"
                theme="dark"
                mode="inline"
                :open-keys.sync="openKey"
            >
                <template v-for="item in routerList">
                    <a-sub-menu
                        v-if="item.children"
                        :key="item.name"
                    >
                        <span slot="title">
                            <a-icon type="user" />
                            {{ item.meta.title }}
                        </span>
                        <a-menu-item
                            v-for="childItem in item.children"
                            :key="childItem.name"
                        >
                            <a-icon type="user" />
                            <span>{{ childItem.meta.title }}</span>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item
                        v-else
                        :key="item.name"
                    >
                        <a-icon type="user" />
                        <span>{{ item.meta.title }}</span>
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item
                        v-for="(item, index) in breadcrumb"
                        :key="index"
                    >
                        <template v-if="item.disabled">
                            <router-link :to="item.to">
                                {{ item.text }}
                            </router-link>
                        </template>
                        <template v-else>
                            {{ item.text }}
                        </template>
                    </a-breadcrumb-item>
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
                selected: ['1'],
                openKey: ['sub1'],
                breadcrumb: []
            };
        },

        computed: {
            ...mapState({
                routerList(state) {
                    return state.user.router;
                }
            }),

            // 监听selected、openKey
            listenMenu() {
                const { selected, openKey } = this;
                return { selected, openKey };
            }
        },

        watch: {
            routerList: {
                handler() {
                    const selectRoute = this.selectRoute(this.routerList);

                    if (selectRoute.length === 0) {
                        this.selected = [];
                        this.openKey = [];
                    } else {
                        const first = selectRoute[0];
                        if (first.children) {
                            this.openKey = [first.name];

                            const child = this.selectRoute(first.children);
                            if (child.length > 0) {
                                this.selected = [child[0].name];
                            }
                        } else {
                            this.openKey = [first.name];
                            this.selected = [first.name];
                        }
                    }
                },
                immediate: true,
                deep: true
            },

            listenMenu: {
                handler() {
                    const breadcrumb = [
                        {
                            disabled: false,
                            text: '首页',
                            to: {} // 跳转参数
                        }
                    ];
                    const selectRoute = this.selectRoute(this.routerList);

                    if (selectRoute.length > 0) {
                        const first = selectRoute[0];
                        if (first.children) {
                            breadcrumb.push({
                                disabled: false,
                                text: first.meta.title,
                                to: {}
                            });

                            const child = this.selectRoute(first.children);
                            if (child.length > 0) {
                                breadcrumb.push({
                                    disabled: true,
                                    text: child[0].meta.title,
                                    to: { name: child[0].name, params: child[0].params }
                                });
                            }
                        } else {
                            breadcrumb.push({
                                disabled: false,
                                text: first.meta.title,
                                to: {}
                            });
                        }
                    }

                    this.breadcrumb = breadcrumb;
                },
                immediate: true,
                deep: true
            }
        },

        methods: {
            selectRoute(routerList = []) {
                return routerList.filter(item => this.$route.matched.some(route => route.name === item.name) && !item.hidden);
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
