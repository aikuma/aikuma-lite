(function(window){
    'use strict';
    angular
        .module('aikuma-io-core', [])
        .factory('utilService', function() {
            var service = {};
            var beep = new Audio("media/beep.wav");
            service.playBeep = function(callback) {
                beep.onended = callback;
                beep.play();
            };
            var errorbeep = new Audio("media/error.wav");
            service.errorBeep = function() {
                errorbeep.play();
            };
        
            return service;
        })
        .factory('backendCache', function() {
            var cache = {};
            var service = {};
            service.setItem = function(fullpath, obj) {
                var levels = fullpath.split('/');
                var cw = cache;
                levels.forEach(function(p) {
                    if(p) {
                        cw[p] = {};
                        cw = cw[p];   
                    }
                })
                
                // UUID needed if this is going to be saved permanently
                var id = Math.floor(Math.random() * 1e8);
                cw[id] = obj;
                
                return id;
            }
            
            service.getItem = function(fullpath) {
                var levels = fullpath.split('/');
                var cw = cache, ind = 0;
                while(cw !== null && ind < levels.length) {
                    if(levels[ind]) {
                        cw = cw[levels[ind]]   
                    }
                    ind++;
                }
                return cw;
            }
            
            return service;
        })
        .directive('inputModel', function() {
            return {
                restrict: 'A', //Class with value?
                priority: 998,
                controller: ['$scope', '$element', '$attrs', '$location', 'backendCache', function($scope, $element, $attrs, $location, backendCache) {
                    var model = $attrs.inputModel;
                    if(model !== 'file') {
                        console.log($location.path().split('/'))
                        $scope[model] = backendCache.getItem($location.path());
                    }
                }],
                link: function(scope, iElem, iAttrs) {
                    var model = iAttrs.inputModel;
                    if(model === 'file') {
                        var inputElemId = 'hidden-file-input'
                        var inputElem = angular.element('<input id="' + inputElemId + '" type="file" accept="audio/*" style="display:none;">')
                        inputElem.bind('change', function(){
//                            console.log('onchange');
//                            console.log(inputElem[0].files[0])
                            scope.inputModel = inputElem[0].files[0]; // default name (inputModel) needs to be customized
                            scope.$apply();
                            
                            
                        });
                        iElem.append(inputElem);    
                        
                        iElem.bind('click', function(ev) {
                            document.getElementById(inputElemId).click();
                            // angular trigger doesn't work
//                            console.log('click');
//                            inputElem.triggerHandler('click');
//                            console.log(iElem.children('input'))
//                            iElem.children('input').triggerHandler('click');
                        });

                    }
                }
            }
        })
        .directive('outputPath', function() {
            return {
                restrict: 'A',
                priority: 999,
                controller: ['$scope', '$element', '$attrs', '$location', 'backendCache', function($scope, $element, $attrs, $location, backendCache) {
                    var model = $attrs.outputPath;
//                    console.log(model);
                    if(model.includes('.')) {
                        $scope.done = function(blob) {
                            if(window.chrome && chrome.fileSystem) {
                                chrome.fileSystem.chooseFile({type: 'saveFile', suggestedName: model}, function(fileEntry) {
                                    fileEntry.createWriter(function(fileWriter) {
                                        fileWriter.onwriteend = function() {
                                            console.log('writeend');
                                        };

                                        fileWriter.onerror = function(err) {
                                            console.error(err);
                                        };
                                        
                                        fileWriter.write(blob);
                                        
                                    }, function(err) {
                                        console.error(err);
                                    });
                                    
                                });

                            } else {
                                var outputElemId = 'hidden-file-output'
                                var uri = URL.createObjectURL(blob);
                                var outElem = angular.element('<a id="'+ outputElemId + '" href="' + uri + '" download="'+ model +'"></a>');
                                $element.append(outElem);
                                document.getElementById(outputElemId).click();
                            }
                        }
                    } else {
                        var fullpath = $location.path();
                        fullpath = fullpath.endsWith('/')? fullpath : fullpath + '/';
                        fullpath += model;
                        $scope.done = function(obj) {
                            var objId = backendCache.setItem(fullpath, obj);
                            
                            console.log('goto ' + fullpath + '/' + objId);
                            $location.path(fullpath + '/' + objId);
                        }
                    }
                }]
            }
        })
    
    window.appDirectives = angular.module('aikuma-directive-list', []);
    
})(this);