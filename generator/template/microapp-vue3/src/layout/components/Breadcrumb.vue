<template>
    <ElBreadcrumb class="breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <ElBreadcrumbItem
                v-for="(item, index) in breadcrumbList"
                :key="item.path"
            >
                <span
                    v-if="item.redirect === 'noRedirect' || index == breadcrumbList.length - 1"
                    class="no-redirect"
                >
                    {{ item.meta.title }}
                </span>
                <a v-else @click.prevent="handleLink(item)">
                    {{ item.meta.title }}
                </a>
            </ElBreadcrumbItem>
        </transition-group>
    </ElBreadcrumb>
</template>

<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import {
    Ref, ref, reactive, watch
} from 'vue';
import {
    RouteLocationMatched, RouteLocationNormalizedLoaded,
    useRoute, useRouter
} from 'vue-router';

const breadcrumbList: Ref<Array<RouteLocationMatched>> = ref([]);
const route: RouteLocationNormalizedLoaded = reactive(useRoute());
const router = useRouter();
watch(route, () => {
    const matched = route.matched.filter(
        (item) => item.meta && item.meta.title
    );
    const nowBreadcrumbList: Array<RouteLocationMatched> = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
    );

    breadcrumbList.value = nowBreadcrumbList;
},
{
    immediate: true,
});

function handleLink(item: RouteLocationMatched) {
    const { redirect, path } = item;

    if (redirect) {
        router.push({
            path: redirect.toString()
        });
    } else {
        router.push({
            path
        });
    }
}

</script>

<style scoped lang="scss">
.breadcrumb {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    padding-left: 10px;
}
</style>
