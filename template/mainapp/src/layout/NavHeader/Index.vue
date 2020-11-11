<template>
    <div class="header__warp">
        <div class="logo">
            <router-link to="/">
                <span>
                    <img src="https://imgcdn.huanjutang.com/file/2019/12/17/ed77bdb075b2f9171d45916c6584b1e7.png">
                    <h1>技术中台系统</h1>
                </span>
            </router-link>
        </div>
        <div class="menu">
            <AppMenu class="menu__item">
                <template>
                    <a-icon
                        class="menu__item--icon"
                        type="appstore"
                    />
                    <span>应用与服务</span>
                </template>
            </AppMenu>
            <a-divider type="vertical" />
            <router-link
                class="menu__item"
                to="/"
            >
                <a-icon
                    class="menu__item--icon"
                    type="home"
                />
                <span>总览</span>
            </router-link>
        </div>
        <div class="right">
            <CitySelect />
            <a-divider type="vertical" />
            <AvatarDropdown />
        </div>
    </div>
</template>

<script>
    import CitySelect from './CitySelect.vue';
    import AvatarDropdown from './AvatarDropdown.vue';
    import AppMenu from './AppMenu.vue';

    export default {
        components: {
            CitySelect,
            AvatarDropdown,
            AppMenu
        }
    };
</script>

<style lang="scss" scoped>
.header__warp {
    display: flex;
    width: 100%;
    height: 64px;

    .logo {
        width: 256px;
        height: 100%;
        padding-left: 24px;
        box-sizing: border-box;
        background: #001529;
        overflow: hidden;

        span {
            display: flex;
            align-items: center;
        }

        img {
            width: 36px;
            height: 36px;
        }

        h1 {
            display: inline-block;
            color: #fff;
            margin: 0 0 0 12px;
            font-size: 20px;
            font-weight: 600;
            font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        }
    }

    .menu {
        display: flex;
        width: 300px;
        align-items: center;

        &__item {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            line-height: 1;
            color: rgba(0, 0, 0, 0.65);
            cursor: pointer;
            padding-left: 24px;
            box-sizing: border-box;

            &--icon {
                font-size: 20px;
                margin-right: 6px;
            }

            span {
                font-size: 15px;
            }

            &:hover {
                color: #1890ff;
            }
        }
    }

    .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 40px;
    }
}
</style>
