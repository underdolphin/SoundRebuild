System.config({
    baseURL: '.',
    defaultJSExtensions: true,
    map: {
        settings: 'script/settings',
        select: 'script/select',
        'pixi.js': '/pixi.min.js'
    },
});

System.import('/script/playermain');