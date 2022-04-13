import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: (): settings.state => ({
        cityId: '510100',
        currentCity: {
            id: '510100',
            name: '成都',
        },
    }),

    actions: {
        // 设置城市ID
        setCityId(cityId: string) {
            this.cityId = cityId;
        },

        // 设置当前城市
        setCurrentCity(cityInfo: currentCity) {
            this.currentCity = cityInfo;
        },

        // 切换城市
        changeCity(cityId: string, cityInfo: currentCity) {
            this.setCityId(cityId);
            this.setCurrentCity(cityInfo);
        },
    },
});

export default {
    useSettingsStore,
};
