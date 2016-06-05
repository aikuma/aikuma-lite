(function(){
    'use strict';
    
    appDirectives
        .directive('ngRecord', function() {
            return {
                restrict: 'E',
                templateUrl: 'directives/meta/meta-template.html',
                controller: newRecordDirectiveController,
                controllerAs: 'nrCtrl'
            };
        })

    //
    // RECORD DIRECTIVE
    //
    var newRecordDirectiveController = function ($timeout, $scope, $attrs, $rootScope, $location, $mdDialog, utilService) {
        var vm = this;
//        vm.externalRecord = fileService.getTempObject();
        if($attrs.inputModel) {
            vm.externalRecord = $scope[$attrs.inputModel].input;   
        } else {
            // Default Attrs
            
        }
        
        vm.hasrecdata = false; // used for review/play button status
//        var recordUrl = '';
        
        // Metadata
        vm.recordDurMsec = 0;
        vm.recordType = (vm.externalRecord && vm.externalRecord.type) || 'audio/wav';
        
        vm.selectedTitles = [];
        vm.selectedLanguages = [];
        vm.people = [];
        
        // Language input interface for session
        vm.saveLangs = function(langIds) {
            vm.selectedLanguages = langIds;
        };
        
        vm.wsPlayer = Object.create(WaveSurfer);
        vm.wsPlayer.init({
            container: "#respeakRecord",
            backend: "WebAudio",
            renderer: "MultiCanvas",
            normalize: true,
            hideScrollbar: false,
            scrollParent: true,
            progressColor: '##33627c',
            waveColor: '#4FC3F7'
        });
        
        vm.wsPlayer.on('ready', function() {
            console.log('loaded');
            vm.recordDurMsec = Math.floor(vm.wsPlayer.getDuration() * 1000);
            vm.hasrecdata = true;
            $scope.$apply();
        });
        
        vm.wsPlayer.loadBlob(vm.externalRecord);

        vm.play = function() {
            vm.wsPlayer.playPause();
        };

        // This might not work right. Errors observed on querying length of unset variables.
        vm.isMetaEmpty = function() {
            return !vm.hasrecdata || vm.selectedLanguages.length === 0 || !vm.selectedTitle;// vm.selectedTitles.length === 0;
        };
        
        vm.save = function() {
            // moved into the save, no need to downsample just for playback
//            createDownsampledLink(config.sampleRate, saveDownsampled);

            $scope.trObj.output.meta = {
                titles: vm.selectedTitles,
                langIds: vm.selectedLanguages,
                people: vm.people,
                duration: vm.recordDurMsec
            }
            
            $scope.done($scope.trObj);
            
            /*
            function saveDownsampled(url) {
                recordUrl = url;
                // This should all be in the data service. Too much logic here.
                var fileObj = {
                    url: recordUrl,
                    type: vm.recordType
                };
                var fileObjId = $scope.userObj.addUserFile(fileObj);
                $scope.userObj.save().then(function() {
                    // Create new session metadata
                    var sessionData = {};
                    vm.selectedTitles.push(vm.selectedTitle);
                    sessionData.names = vm.selectedTitles;
                    sessionData.creatorId = loginService.getLoggedinUserId();
                    sessionData.source = {
                        recordFileId: fileObjId,
                        created: Date.now(),
                        duration: vm.recordDurMsec,
                        langIds: vm.selectedLanguages,
                        //langIds: vm.selectedLanguages.map(function(lang) { return lang.id; })
                    };
                    if(peaks) {
                        sessionData.source.peaks = [minPxPerSec, peaks];
                    }

                    return dataService.setSession(loginService.getLoggedinUserId(), sessionData);
                }).then(function(sessionId) {
                    // Recording file and session metadata are both created
                    vm.isCompleted = true;

                    $location.path('session/'+sessionId);
                });
                    
            }*/

        };

//        $rootScope.$on('$routeChangeStart', function() {
//            if (!vm.externalRecord) {
//                microphone.stopDevice();
//                microphone.destroy();
//                vm.wsRecord.destroy();
//            }
//        });
//
//        $scope.$on('$destroy', function() {
//            if (!vm.externalRecord) {
//                if(rec)
//                    rec.clear();
//                vm.context.close();
//            } else {
////                fileService.setTempObject(null);
//            }
//        });
        
        ///////////////////////////////

    };
    newRecordDirectiveController.$inject = ['$timeout', '$scope', '$attrs', '$rootScope', '$location', '$mdDialog', 'utilService'];

})();