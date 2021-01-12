import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        // TODO::更换为对应项目的 sentry dsn
        dsn: '',
        integrations: [
            new VueIntegration({
                Vue,
                tracing: true,
            }),
            new Integrations.BrowserTracing()
        ],
        tracesSampleRate: 1.0,
    });
}
