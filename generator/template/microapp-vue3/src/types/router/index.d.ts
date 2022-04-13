/* eslint-disable camelcase */
import { RouteRecordRaw } from 'vue-router';

declare global {
    declare type RouterConfig = RouteRecordRaw & {
        hidden?: boolean
    }

    declare interface MenusItem {
        menu_id: number,
        menu_name: string,
        menu_value: string,
        parent_id: number
    }

    declare type Menus = Array<MenusItem>

}
