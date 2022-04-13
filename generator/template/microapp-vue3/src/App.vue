<template>
    <router-view/>
</template>

<style lang="scss">
#micro-app {
    width: 100%;
    height: 100%;
}

.app__main {
    overflow: hidden;

    .app__nav {
        margin-bottom: 20px;
        background: #fff;
        padding: 0 20px 1px;
        overflow: hidden;
    }

    .app__header {
        padding: 20px;
        margin: 0 20px 20px;
        background: #ffffff;
    }

    .app__body {
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        margin: 0 20px 20px;
    }
}

.header-tip {
    padding: 8px 16px;
    background-color: rgba(64, 158, 255, .1);
    border-radius: 4px;
    border-left: 5px solid #409eff;
    color: #303134;

    &__title {
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 1rem;
        line-height: 1.7;
        font-size: 16px;
    }

    &__content {
        font-size: .9rem;
        margin-top: 1rem;
        margin-bottom: 0;
        line-height: 1.7;
    }
}

.el-tabs__header {
    margin-bottom: 0;
}

.el-tabs__nav-wrap::after {
    display: none;
}

.el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none;
    border-radius: 0;
}
</style>
