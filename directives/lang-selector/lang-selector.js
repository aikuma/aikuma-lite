(function(){
    'use strict';
    var languages = [];
    
    appDirectives
        .directive('ngLanguageSelector', [function(){ 
            Papa.parse("extdata/iso-639-3_20160115.tab", {
                header: true,
                download: true,
                complete: function(results) {
                    /*
                    Array.prototype.push.apply(languages, results.data);

                    
                    var langOverrides = [];
                    var langValueSet = new Set(_.pluck(languages, 'Ref_Name').map(s => s.toLocaleLowerCase()));

                    for (var langId in aikumaLangData.localizedLanguages) {
                        var langPrefList = Object.keys(aikumaLangData.localizedLanguages[langId]);
                        var curLangPref = $translate.use();
                        if(langPrefList.indexOf(curLangPref) === -1)
                            continue;

                        for (var langStr of aikumaLangData.localizedLanguages[langId][curLangPref]) {
                            var langVal = langStr.toLocaleLowerCase();
                            if(!langValueSet.has(langVal)) {
                                langOverrides.push({
                                    Ref_Name: langStr,
                                    Id: langId
                                });
                                langValueSet.add(langVal);
                            }
                        }
                    }
                    angular.extend(languages, langOverrides);
                    callback(ser.languages);*/
                 
                    results.data.forEach(function(lang) {
                        languages.push({
                            value: lang.Ref_Name.toLowerCase(),
                            display: lang.Ref_Name,
                            id: lang.Id
                        })
                    });
                }
            });
            
            return {
                restrict: 'E',
                scope: {
                    onChange: '&'
                },
                templateUrl: "directives/lang-selector/lang-selector-template.html",
                controller: langSelectController,
                controllerAs: 'lsCtrl'
            };
        }])
    
    
    var langSelectController = function ($scope) {
        var vm = this;
        // list of `language` value/display objects
        vm.languages = languages;
        if($scope.langIdList) {
            vm.selectedLanguages = $scope.langIdList;
            vm.selectedLanguages.forEach(function(langData) {
                if(langData.langISO) {
                    var defaultLangStr = $scope.langIdNameMap[langData.langISO];
                    if(!langData.langStr && defaultLangStr) {
                        langData.langStr = defaultLangStr;
                    }   
                }
            });   
        } else {
            vm.selectedLanguages = [];
        }

        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;

        function querySearch (query) {
            return query ? vm.languages.filter( createFilterFor(query) ) : vm.languages;
        }
        function selectedItemChange(item,idx) {

        }

        vm.transformChip = function(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return {
                    langStr: chip.display,
                    langISO: chip.id
                };
            }
            // Otherwise, create a new one
            return {
                langStr: chip,
                langISO: ''
            };
        };


        vm.add = function() {
            $scope.onChange({langIds: vm.selectedLanguages});
        };
        vm.remove = function() {
            vm.add();
        };
        vm.sel = function() {

        };
        
        
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(language) {
                return (language.value.indexOf(lowercaseQuery) === 0 || language.id.indexOf(lowercaseQuery) === 0);
            };
        }

//        vm.help = function(ev) {
//            aikumaDialog.help(ev, 'sel_langs');
//        };

    };
    
    langSelectController.$inject = ['$scope'];

})();
