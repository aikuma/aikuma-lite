(function (){
    'use strict';
    angular
        .module('aikuma-lite', [
            'ngRoute',
            'ngMaterial',
            'ngAnimate',
            'aikuma-io-core',
            'aikuma-directive-list',
        ])
        .config(['$mdIconProvider', function($mdIconProvider) {
            $mdIconProvider
                .iconSet('social','img/icons/sets/social-icons.svg', 24)
                .iconSet('content','img/icons/sets/content-icons.svg', 24)
                .iconSet('action','img/icons/sets/action-icons.svg', 24)
                .iconSet('nav','img/icons/sets/navigation-icons.svg', 24)
                .iconSet('maps','img/icons/sets/maps-icons.svg', 24)
                .iconSet('av','img/icons/sets/av-icons.svg', 24)
                .iconSet('file','img/icons/sets/file-icons.svg', 24)
                .iconSet('image','img/icons/sets/image-icons.svg', 24)
                .iconSet('editor','img/icons/sets/editor-icons.svg', 24)
                .iconSet('communication','img/icons/sets/communication-icons.svg', 24)
                .iconSet('mdi','img/icons/sets/mdi-icons.svg', 24)
                .iconSet('hardware','img/icons/sets/hardware-icons.svg', 24)
                .defaultIconSet('img/icons/sets/core-icons.svg', 24);
        }])
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('light-blue', {
                    'default': '300'
                })
                .accentPalette('deep-orange', {
                    'default': '500'
                });
        }])
        // Views controllers are in aikuma-viewcontrollers.js
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'views/home.html',
                    })
                    .when('/source/:srcid', {
                        templateUrl: 'views/metadata.html'
                    })
                    .when('/source/:srcid/translate/:trid', {
                        templateUrl: 'views/translate.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }])
        .config(['$compileProvider', function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|filesystem|chrome-extension):/);
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data|blob|filesystem|chrome-extension):/);
        }])
        .run(function() {

        });
        
})();