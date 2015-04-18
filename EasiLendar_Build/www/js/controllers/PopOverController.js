angular.module('MainApp.controllers.popover',[]).controller('PopOverController',function($rootScope,$scope,$ionicPopover,$ionicActionSheet,$timeout){$scope.mPopoverStatus={};$scope.mPopoverStatus[true]="active";$scope.mPopoverStatus[false]="";$scope.mPopoverActive="";$scope.tabActive=function(tabName){$scope.mPopoverActive=tabName;};$scope.nextRightNoti=function(){if($scope.mPopoverActive=="friend"){$scope.tabActive("request");}else if($scope.mPopoverActive=="request"){$scope.tabActive("respond");}else{$scope.tabActive("friend");}};$scope.nextLeftNoti=function(){if($scope.mPopoverActive=="friend"){$scope.tabActive("respond");}else if($scope.mPopoverActive=="request"){$scope.tabActive("friend");}else{$scope.tabActive("request");}};$scope.friendPopover=$ionicPopover.fromTemplate(template,{scope:$scope,});$ionicPopover.fromTemplateUrl('templates/noti-popover.html',{scope:$scope,}).then(function(popover){$scope.friendPopover=popover;});$scope.openPopover=function($event){$scope.tabActive("friend");$scope.friendPopover.show($event);};$scope.closePopover=function(){$scope.friendPopover.hide();};$scope.$on('$destroy',function(){$scope.friendPopover.remove();});$scope.friendAction=function(friend){var friendSheet=$ionicActionSheet.show({buttons:[{text:'View'},{text:'Comfirm request'}],destructiveText:'Delete request',titleText:friend.name+" request",cancelText:'Cancel',cancel:function(){},destructiveButtonClicked:function(){$rootScope.rejectF(friend.id);return true;},buttonClicked:function(index){if(index==0){$rootScope.viewProfile(friend.id);$scope.closePopover();}else{$rootScope.addFriend(friend.id);}
return true;}});$timeout(function(){friendSheet();},15000);};$scope.requestAction=function(name){var requestSheet=$ionicActionSheet.show({buttons:[{text:'View detail'},{text:'Accept'}],destructiveText:'Reject',titleText:name+" appointment",cancelText:'Cancel',cancel:function(){},destructiveButtonClicked:function(){$rootScope.showAlert("Deleted");return true;},buttonClicked:function(index){if(index==0){$rootScope.showAlert("Viewing");$scope.closePopover();}else{$rootScope.showAlert("Accepted appointment");}
return true;}});$timeout(function(){requestSheet();},15000);};$scope.friendTabClass={};$scope.friendTabClass[true]='margin-top-69';$scope.friendTabClass[false]='margin-top-0';}).directive('notiContent',function(){return{restrict:'E',templateUrl:function(elem,attr){return"templates/noti-"+attr.type+"-tab.html";}};});