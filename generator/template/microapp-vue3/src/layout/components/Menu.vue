<template>
    <ElMenu
        v-if="routersList && routersList.children"
        text-color="#7895A9"
        class="menu"
        active-text-color="#fff"
        background-color="#001529"
        menu-trigger="click"
        :default-active="defaultActive"
        @select="menuSelectHandle"
    >
        <template v-for="item in routersList.children" :key="item.path" >
            <ElMenuItem
                class="menu__item"
                v-if="!item.children"
                :key="item.path"
            >
                <span>{{ item.meta.title }}</span>
            </ElMenuItem>
            <ElSubMenu :index="item.path">
                <template #title>
                    <span class="menu__item">
                        {{ item.meta.title }}
                    </span>
                </template>
                <template v-for="child in item.children">
                    <ElMenuItem
                        class="menu__item"
                        v-if="!child.meta.hidden"
                        :key="child.path"
                        :index="child.path"
                        :route="{
                            path: child.path,
                            query: child.query,
                            params: child.params,
                        }"
                    >
                        <span>{{ child.meta.title }}</span>
                        <ElPopover
                            v-if="child.meta.desc"
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="child.meta.desc"
                        >
                            <template #reference>
                                <span>
                                    <i class="el-icon-warning-outline icon-desc"/>
                                </span>
                            </template>
                        </ElPopover>
                    </ElMenuItem>
                </template>
            </ElSubMenu>
        </template>
    </ElMenu>
</template>

<script setup lang="ts">
import {
    ElMenu, ElSubMenu, ElMenuItem, ElPopover
} from 'element-plus';
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

// 默认选中项
const route = reactive(useRoute());
const router = useRouter();
const defaultActive = computed(() => {
    const { meta, matched } = route;

    // 如果meta中的hidden为true，则需要取上一级的路由path给到菜单的active
    if (meta.hidden) {
        return matched[matched.length - 2]?.path || '';
    }

    return route?.path || '';
});

// 路由列表
const routersList = computed(() => {
    const { routers } = useUserStore();
    return routers;
});

// 菜单选中事件
function menuSelectHandle(path: string) {
    if (path !== route.path) {
        router.push({
            path
        });
    }
}
</script>

<style lang="scss">
.menu {
    border-right: 0;

    .el-icon svg {
        height: 1em;
        width: 1em;
    }

    .el-sub-menu__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        line-height: 56px;
        padding-right: 20px;
        font-size: 14px;
        color: rgb(120, 149, 169);
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: #7895a9;
    }

    .is-active {
        color: #fff !important;
    }

    .is-active {
        color: #fff;
    }

    li.is-active {
        background: rgb(24, 144, 255) !important;
    }

    .el-menu {
        border-right: none;
    }

    li > ul > li {
        color: rgb(120, 149, 169);
        background: #000000 !important;

        &:hover {
            color: #fff;
            background: rgb(24, 144, 255) !important;
        }
    }
}
</style>
