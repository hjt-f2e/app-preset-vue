<template>
    <div class="city__wrap">
        <span class="city__wrap--text">当前城市</span>
        <a-select
            :default-value="currentCity.id"
            class="city__select"
            style="width: 80px"
            @change="handleChange"
        >
            <a-select-option
                v-for="city in cityList"
                :key="city.id"
                :value="city.id"
            >
                {{ city.name }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: mapGetters({
            currentCity: 'settings/currentCity',
            cityList: 'settings/cityList'
        }),

        methods: {
            ...mapActions({
                changeCity: 'settings/changeCity'
            }),
            handleChange(value) {
                const selected = this.cityList.filter(city => city.id === value);
                this.changeCity(...selected);
            }
        }
    };
</script>

<style lang="scss" scoped>
.city__wrap {
    padding: 12px;

    &--text {
        padding-right: 12px;
        color: rgba(0, 0, 0, 0.65);
    }
}
</style>
