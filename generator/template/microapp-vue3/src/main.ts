/* eslint-disable no-underscore-dangle */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'normalize.css/normalize.css';
import App from './App.vue';
import router from './router';
import { useSettingsStore } from './store/settings';
import { getCurrentCity } from './utils';

const win = (window as any) || {};
const pinia = createPinia();

let instance: any = null;

function render(props?: any) {
    if (instance) {
        instance.unmount();
    }

    instance = createApp(App)
        .use(pinia)
        .use(router)
        .mount(props?.container?.querySelector('#app') || '#micro-app');

    const store = useSettingsStore();
    store.setCurrentCity(getCurrentCity());
}

if (!win.__POWERED_BY_QIANKUN__) {
    render();
} else {
    // eslint-disable-next-line camelcase
    __webpack_public_path__ = win.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

export async function bootstrap(): Promise<void> {
    // TODO::微应用业务
}

// 微应用挂载
export async function mount(props = {}): Promise<void> {
    render(props);
}

// 微应用卸载
export async function unmount(): Promise<void> {
    if (instance) {
        instance.unmount();
    }
}
