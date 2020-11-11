<template>
    <a-layout class="main">
        <a-layout-header class="main__header">
            <NavHeader />
        </a-layout-header>
        <a-layout-content class="main__content">
            <router-view />
            <div id="microapp-container" />
        </a-layout-content>
    </a-layout>
</template>

<script>
    import NavHeader from './NavHeader/Index.vue';

    export default {
        components: {
            NavHeader
        }
    };
</script>

<style lang="scss" scoped>
.main {
    position: relative;
    width: 100vw;
    min-height: 100vh;

    &__header {
        position: sticky;
        top: 0;
        background: #fff;
        padding: 0;
    }

    &__content {
        position: relative;
        min-height: calc(100vh - 64px);
        box-sizing: border-box;
        overflow: hidden;
    }
}

#microapp-container {
    height: 100%;
    overflow: scroll;
}
</style>
