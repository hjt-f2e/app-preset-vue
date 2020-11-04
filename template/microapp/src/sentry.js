import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        // TODO::更换为对应项目的 sentry dsn
        dsn: 'https://4dc37eb1e607494f9413c641dc628477@sentry.huanjutang.com/4',
        integrations: [
            new VueIntegration({
                Vue,
                tracing: true,
            }),
            new Integrations.BrowserTracing()
        ],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    });
}
