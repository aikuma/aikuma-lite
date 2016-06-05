(function(){
    'use strict';
    var languages = [];
    
    appDirectives
        .directive("ngNavbar", function() {
            return {
                restrict: "E",
                templateUrl: "directives/navbar/navbar-template.html",
                replace: true,
                controller: navController,
                controllerAs: 'navCtrl'
            };
        })

        var navController = function ($timeout, $rootScope, $scope, $location, $animate, $window) {
            var vm = this;
//            vm.languages = config.languages;
            
//            vm.debug = function() { return config.debug; };
//            vm.getLoginStatus = loginService.getLoginStatus;
//            vm.versionString = config.appVersion;
//            $scope.onlineStatus = aikumaService;
            
            vm.logoElement = angular.element( document.querySelector( '#aikumaLogo' ) );
            $timeout(function(){
                $animate.removeClass(vm.logoElement, 'rollInLogo');
            },1500);

            vm.isOnline = function() { return $window.navigator.onLine; }
            
//            $scope.$watch('onlineStatus.isOnline()', function(online) {
//                vm.onlineStatus = online;
//                vm.online_status_string = online ? 'online' : 'offline';
//            });

//            $scope.$watch(vm.getLoginStatus, function(isLoggedin) {
//                if (isLoggedin) {
////                    dataService.get('user', loginService.getLoggedinUserId()).then(function(userObj) {
////                        vm.currentUserName = function() { return userObj.data.names[0]; };
////                    });
//                } else {
//                    vm.LOGINAS = '';
//                    vm.currentUserName = function() { return ''; };
//                }
//            });
            
            $scope.$watch('inputModel', function(x) {
                console.log('input')
                console.log(x);
                if(x) {
                    var obj = {
                        input: x,
                        output: {
                            data: x,
                            meta: {}
                        }
                    }
                    $scope.done(obj);
                }
            })

            $rootScope.$on("$locationChangeStart", function() {
                $animate.addClass(vm.logoElement, 'rollLogo').then(function() {
                    $animate.removeClass(vm.logoElement, 'rollLogo');
                });
            });

            vm.goHome = function() {
                $location.path('/');
            };


//            vm.logout = function() {
//                loginService.logout();
//                $location.path('/');
//            };
            
            vm.menu = [
                {
                    class : '',
                    title: 'HOME',
                    icon: 'action:home',
                    state: 'home'
                },
                {
                    class : '',
                    title: 'NAV_HELP',
                    icon: 'action:help',
                    state: 'help'
                },
                {
                    class : '',
                    title: 'NAV_OPENF',
                    icon: 'file:folder_open',
                    state: 'import'
                },
                {
                    class : '',
                    title: 'NAV_RECORD',
                    icon: 'av:mic',
                    state: 'new'
                },
                {
                    class : '',
                    title: 'NAV_SHARE',
                    icon: 'social:share',
                    state: 'share',
                    tooltip: 'NOT_IMPLEMENTED'
                },
                {
                    class : '',
                    title: 'NAV_TRASH',
                    icon: 'action:delete',
                    state: 'trash',
                },
                {
                    class : '',
                    title: 'NAV_SETTINGS',
                    icon: 'action:settings',
                    state: 'settings'
                },
                {
                    class : '',
                    title: 'NAV_CHANGES',
                    icon: 'action:change_history',
                    state: 'changes'
                },
                {
                    class : '',
                    title: 'NAV_BUGREP',
                    icon: 'action:report_problem',
                    state: 'reportbug',
                },
                {
                    class : '',
                    title: 'NAV_EXTENSIONS',
                    icon: 'action:extension',
                    state: 'extensions'
                },
                {
                    class : '',
                    title: 'NAV_DEBUG',
                    icon: 'action:bug_report',
                    state: 'debug'
                }
            ];
            
            vm.changeState = function(statename) {
                if(statename === 'extensions' || statename === 'home' || 
                   (loginService.getLoginStatus() && statename !== 'import')) {
                    $location.path('/'+statename);
                }
            };

            vm.openAbout = function(ev) {
//                aikumaDialog.help(ev, 'about');
            };
            
//            vm.toggleDebug = function() {
//                config.debug = !config.debug;
//                $translate(['DEBUG_ON', 'DEBUG_OFF']).then(function (tstring) {
//                    if (config.debug) {
////                        aikumaDialog.toast(tstring.DEBUG_ON);
//                    } else {
////                        aikumaDialog.toast(tstring.DEBUG_OFF);
//                    }
//                });
//                
//            };
            

        };
    
        navController.$inject = ['$timeout', '$rootScope', '$scope', '$location', '$animate', '$window'];

})();