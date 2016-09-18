/// <reference path="../../../typings/index.d.ts" />

System.config({
    baseURL: '.',
    defaultJSExtensions: true,
    map: {
        settings: 'script/settings'
    },
});

System.import('vue');
System.import('settings/main');