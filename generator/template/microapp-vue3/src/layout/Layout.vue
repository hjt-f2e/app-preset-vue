<template>
    <ElContainer class="layout">
        <ElAside
            :style="{
                flex: '0 0 208px',
                'max-width': '208px',
                'min-width': '208px',
                width: '208px',
                'background-color': '#001529',
            }"
            class="layout__menu"
        >
            <Menu />
        </ElAside>
        <ElMain class="layout__container">
            <Breadcrumb />
            <div id="app__main">
                <router-view/>
            </div>
        </ElMain>
    </ElContainer>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElMain } from 'element-plus';
import Menu from './components/Menu.vue';
import Breadcrumb from './components/Breadcrumb.vue';
</script>

<style lang="scss">
::-webkit-scrollbar-track-piece {
    background: #d3dce6;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
}

// 主应用高度
$mainContainerTopHeight: 48px;
// 面包屑高度
$breadcrumbHeight: 50px;
.layout {
    position: relative;
    height: 100%;
    width: 100vw;

    &__menu {
        height: 100%;
        min-height: calc(100vh - $mainContainerTopHeight);
        overflow-y: auto;
    }

    &__container {
        padding: 0;
        height: calc(100vh - $mainContainerTopHeight);
        overflow: hidden;
    }

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

    #app__main {
        width: 100%;
        height: calc(100vh - $mainContainerTopHeight - $breadcrumbHeight);
        overflow-y: scroll;
        overflow-x: hidden;
        background: #f0f2f5;
    }
}
</style>
