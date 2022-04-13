declare namespace user {
    declare interface userInfo {
        // eslint-disable-next-line camelcase
        nick_name: string,
        menus: Menus
    }

    declare interface state {
        // cityId: string,
        // currentCity: utils.cityInfo
        token: string,
        userInfo: userInfo | undefined,
        routers: RouterConfig | null
    }
}
