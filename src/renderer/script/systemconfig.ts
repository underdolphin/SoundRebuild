System.config({
    baseURL: '.',
    defaultJSExtensions: true,
    map: {
        settings: 'script/settings',
        select: 'script/select'
    },
});

System.import('/script/select/selectmain');