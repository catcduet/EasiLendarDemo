/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 15/04/2015
 * type: month controller
 */
 
/*GOOGLE MAP - LIBRARY*/
window.google=window.google||{};google.maps=google.maps||{};(function(){function a(d){document.write('<script src="'+d+'"><\/script>')}var b=google.maps.modules={};google.maps.__gjsload__=function(d,e){b[d]=e};google.maps.Load=function(d){delete google.maps.Load;d([0.009999999776482582,[[["https://mts0.googleapis.com/vt?lyrs=m@296000000\u0026src=api\u0026hl=vi-VN\u0026","https://mts1.googleapis.com/vt?lyrs=m@296000000\u0026src=api\u0026hl=vi-VN\u0026"],null,null,null,null,"m@296000000",["https://mts0.google.com/vt?lyrs=m@296000000\u0026src=api\u0026hl=vi-VN\u0026","https://mts1.google.com/vt?lyrs=m@296000000\u0026src=api\u0026hl=vi-VN\u0026"]],[["https://khms0.googleapis.com/kh?v=169\u0026hl=vi-VN\u0026","https://khms1.googleapis.com/kh?v=169\u0026hl=vi-VN\u0026"],null,null,null,1,"169",["https://khms0.google.com/kh?v=169\u0026hl=vi-VN\u0026","https://khms1.google.com/kh?v=169\u0026hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/vt?lyrs=h@296000000\u0026src=api\u0026hl=vi-VN\u0026","https://mts1.googleapis.com/vt?lyrs=h@296000000\u0026src=api\u0026hl=vi-VN\u0026"],null,null,null,null,"h@296000000",["https://mts0.google.com/vt?lyrs=h@296000000\u0026src=api\u0026hl=vi-VN\u0026","https://mts1.google.com/vt?lyrs=h@296000000\u0026src=api\u0026hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/vt?lyrs=t@132,r@296000000\u0026src=api\u0026hl=vi-VN\u0026","https://mts1.googleapis.com/vt?lyrs=t@132,r@296000000\u0026src=api\u0026hl=vi-VN\u0026"],null,null,null,null,"t@132,r@296000000",["https://mts0.google.com/vt?lyrs=t@132,r@296000000\u0026src=api\u0026hl=vi-VN\u0026","https://mts1.google.com/vt?lyrs=t@132,r@296000000\u0026src=api\u0026hl=vi-VN\u0026"]],null,null,[["https://cbks0.googleapis.com/cbk?","https://cbks1.googleapis.com/cbk?"]],[["https://khms0.googleapis.com/kh?v=85\u0026hl=vi-VN\u0026","https://khms1.googleapis.com/kh?v=85\u0026hl=vi-VN\u0026"],null,null,null,null,"85",["https://khms0.google.com/kh?v=85\u0026hl=vi-VN\u0026","https://khms1.google.com/kh?v=85\u0026hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=vi-VN\u0026","https://mts1.googleapis.com/mapslt?hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=vi-VN\u0026","https://mts1.googleapis.com/mapslt/ft?hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/vt?hl=vi-VN\u0026","https://mts1.googleapis.com/vt?hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=vi-VN\u0026","https://mts1.googleapis.com/mapslt/loom?hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=vi-VN\u0026","https://mts1.googleapis.com/mapslt?hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=vi-VN\u0026","https://mts1.googleapis.com/mapslt/ft?hl=vi-VN\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=vi-VN\u0026","https://mts1.googleapis.com/mapslt/loom?hl=vi-VN\u0026"]]],["vi-VN","US",null,0,null,null,"https://maps.gstatic.com/mapfiles/","https://csi.gstatic.com","https://maps.googleapis.com","https://maps.googleapis.com",null,"https://maps.google.com","https://gg.google.com","https://maps.gstatic.com/maps-api-v3/api/images/","https://www.google.com/maps",0],["https://maps.gstatic.com/maps-api-v3/api/js/20/8/intl/vi_ALL","3.20.8"],[746415530],1,null,null,null,null,null,"",["drawing","places"],null,1,"https://khms.googleapis.com/mz?v=169\u0026",null,"https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"https://mts.googleapis.com/vt/icon",[["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],null,null,null,null,null,null,null,null,null,null,["https://mts0.google.com/vt","https://mts1.google.com/vt"],"/maps/vt",296000000,132],2,500,[null,"https://g0.gstatic.com/landmark/tour","https://g0.gstatic.com/landmark/config","","https://www.google.com/maps/preview/log204","","https://static.panoramio.com.storage.googleapis.com/photos/",["https://geo0.ggpht.com/cbk","https://geo1.ggpht.com/cbk","https://geo2.ggpht.com/cbk","https://geo3.ggpht.com/cbk"]],["https://www.google.com/maps/api/js/master?pb=!1m2!1u20!2s8!2svi-VN!3sUS!4s20/8/intl/vi_ALL","https://www.google.com/maps/api/js/widget?pb=!1m2!1u20!2s8!2svi-VN"],null,1,0,"/maps/api/js/ApplicationService.GetEntityDetails",0],c)};var c=(new Date).getTime();a("https://maps.gstatic.com/maps-api-v3/api/js/20/8/intl/vi_ALL/main.js");a("https://maps.gstatic.com/maps-api-v3/api/js/20/8/intl/vi_ALL/drawing.js");a("https://maps.gstatic.com/maps-api-v3/api/js/20/8/intl/vi_ALL/places.js")})();

/*MONTH CONTROLLER*/
angular.module('MainApp.controllers.month', [])

.controller("MonthController", function($scope, $rootScope, $state, $document) {
	$scope.allMonths = [
					{first: 0, second: 1, third: 2, fourth: 3},
					{first: 4, second: 5, third: 6, fourth: 7},
					{first: 8, second: 9, third: 10, fourth: 11}
					];
	//refresh calendar when return from other states
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams) {
			if (toState.name == 'month') {
				//months list in year
				$scope.showMonthsList = false;
				$scope.showMonthCalendar = true;
				if($document.find('td').children().hasClass('current-month-style') == true){
					$document.find('td').children().removeClass('current-month-style');
				}
				$scope.buildCurrentMonth();
			}
		})

	$scope.buildCurrentMonth = function() {
		$scope.currentDate = new Date();
		$scope.currentDateNumber = $scope.currentDate.getDate();
		$scope.currentMonthNumber = $scope.currentDate.getMonth();
		$scope.currentYear = $scope.currentDate.getFullYear();
		$scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
		$scope.position = new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth(), $scope.currentDateNumber, 0, 0, 0, 0);
		$rootScope.eCalendar.cDate = angular.copy($scope.position);
		
		$scope.weeks = new Array(5);
		for (var i = 0; i < 5; i++) {
			$scope.weeks[i] = {
				days: new Array(7)
			};
			for (var j = 0; j < 7; j++) {
				$scope.weeks[i].days[j] = {
					numberDate: 0,
					month: 0
				}
			}
		}
		$scope.buildWeeks();
	}

	$scope.previousMonth = function() {
		$scope.currentMonthNumber = ($scope.currentMonthNumber - 1 >= 0 ? 0 : 12) + ($scope.currentMonthNumber - 1);
		$scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
		if ($scope.currentMonthNumber == 11) {
			$scope.currentYear--;
		}
		$scope.buildWeeks();
	};

	$scope.nextMonth = function() {
		$scope.currentMonthNumber = ($scope.currentMonthNumber + 1) - ($scope.currentMonthNumber + 1 > 11 ? 12 : 0);
		$scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
		if ($scope.currentMonthNumber == 0) {
			$scope.currentYear++;
		}
		$scope.buildWeeks();
	}

	$scope.thisMonth = function(year,month){
		$scope.currentMonthNumber = month;
		$scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
		$scope.currentYear = year;
		$scope.buildWeeks();
		$scope.changeState();
	}

	$scope.previousYear = function(){
		$scope.currentYear--;
	}

	$scope.nextYear = function(){
		$scope.currentYear++;
	}

	$scope.buildWeeks = function() {
		$scope.newWeeks = $scope.weeks;
		var firstDatePreviousMonth = new Date($scope.currentYear, $scope.currentMonthNumber, 1);
		var dayOfFirstDate = 0;
		if ($rootScope.eSettings.sFirstDay == 'Sunday') {
			dayOfFirstDate = firstDatePreviousMonth.getDay();
			$scope.daysInWeek = [{day: 'S'},{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'},{day: 'S'}];
		}
		if ($rootScope.eSettings.sFirstDay == 'Monday') {
			dayOfFirstDate = firstDatePreviousMonth.getDay();
			dayOfFirstDate += (dayOfFirstDate > 0 ? -1 : 6);
			$scope.daysInWeek = [{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'},{day: 'S'},{day: 'S'}];
		}
		if ($rootScope.eSettings.sFirstDay == 'Saturday') {
			dayOfFirstDate = firstDatePreviousMonth.getDay();
			dayOfFirstDate += (dayOfFirstDate < 6 ? 1 : -6);
			$scope.daysInWeek = [{day: 'S'},{day: 'S'},{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'}];
		}
		var numberDaysPreviousMonth = (new Date($scope.currentYear, $scope.currentMonthNumber, 0)).getDate();
		var numberDaysCurrentMonth = (new Date($scope.currentYear, $scope.currentMonthNumber + 1, 0)).getDate();
		var j = 0;

		//Show event of the first day in month
		var toDay = new Date();
		toDay = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(), 0, 0, 0, 0);
		if ($scope.currentMonthNumber == toDay.getMonth() && $scope.currentYear == toDay.getFullYear()) {
			$scope.position = toDay;
		} else {
			$scope.position = firstDatePreviousMonth;
		}

		//Build weeks and days in month
		$scope.newWeeks[0].days[dayOfFirstDate].numberDate = 1;
		$scope.newWeeks[0].days[dayOfFirstDate].month = $scope.currentMonthNumber;
		for (j = 0; j < dayOfFirstDate; j++) {
			$scope.newWeeks[0].days[j].numberDate = numberDaysPreviousMonth - (dayOfFirstDate - 1 - j);
			$scope.newWeeks[0].days[j].month = ($scope.currentMonthNumber - 1 < 0) ? 11 : ($scope.currentMonthNumber - 1);
		}
		for (j = 6; j > dayOfFirstDate; j--) {
			$scope.newWeeks[0].days[j].numberDate = 1 + (j - dayOfFirstDate);
			$scope.newWeeks[0].days[j].month = $scope.currentMonthNumber;
		}
		for (var i = 1; i < 5; i++) {
			for (j = 0; j < 7; j++) {
				if (i == 1) {
					var numberDaysMonth = numberDaysPreviousMonth;
				} else {
					numberDaysMonth = numberDaysCurrentMonth;
				}
				$scope.newWeeks[i].days[j].numberDate = ($scope.newWeeks[i - 1].days[j].numberDate + 7) - (($scope.newWeeks[i - 1].days[j].numberDate + 7) > numberDaysMonth ? numberDaysMonth : 0);

				$scope.newWeeks[i].days[j].month = $scope.currentMonthNumber;
				if (i >= 3 && $scope.newWeeks[i - 1].days[j].numberDate + 7 > numberDaysCurrentMonth) {
					$scope.newWeeks[i].days[j].month = ($scope.currentMonthNumber + 1 > 11) ? 0 : ($scope.currentMonthNumber + 1);
				}
			}
		}
		if ($scope.newWeeks[4].days[6].numberDate < numberDaysCurrentMonth && $scope.newWeeks[4].days[6].month == $scope.currentMonthNumber) {
			var days = angular.copy($scope.newWeeks[4].days);
			for (j = 0; j < 7; j++) {
				days[j].numberDate = (days[j].numberDate + 7) - ((days[j].numberDate + 7) > numberDaysCurrentMonth ? numberDaysCurrentMonth : 0);
				days[j].month = $scope.currentMonthNumber;
				if ($scope.newWeeks[4].days[j].numberDate + 7 > numberDaysCurrentMonth) {
					days[j].month = $scope.currentMonthNumber + 1;
				}
			}

			if($scope.newWeeks.length < 6){
				$scope.newWeeks.push({
					days: days
				});
			}
		} 
		else {
			$scope.newWeeks.splice(5, 1);
		}

		$scope.weeks = angular.copy($scope.newWeeks);
		delete $scope.newWeeks;
	}

	$scope.backgroundMonth = function(index) {
		var className = 'bkg-style ' + 'easi-' + $rootScope.shortMonths[index] + '-bkg';
		return className;
	}

	$scope.bkgE = 'bkg';
	$scope.showListEvent = function(day, month, year) {
		if (month > $scope.currentMonthNumber) {
			if (month == 11 && $scope.currentMonthNumber == 0) {
				$scope.previousMonth();
			} else {
				$scope.nextMonth();
			}
		} else if (month < $scope.currentMonthNumber) {
			if (month == 0 && $scope.currentMonthNumber == 11) {
				$scope.nextMonth();
			} else {
				$scope.previousMonth();
			}
		}
		$scope.position = new Date(year, month, day, 0, 0, 0, 0);
		$rootScope.eCalendar.cDate = angular.copy($scope.position);
	}

	// Increment carousel thing
	$scope.next = function() {
		$scope.nextMonth();
	};
	// Decrement carousel thing
	$scope.prev = function() {
		$scope.previousMonth();
	};

	//months list in year
	$scope.showMonthsList = false;
	$scope.showMonthCalendar = true;

	//change from month calendar to months list
	$scope.changeState = function(){
		$scope.showMonthsList = !$scope.showMonthsList;
		$scope.showMonthCalendar = !$scope.showMonthCalendar;
	}
})

.directive('differentMonth', function($document) {
	return {
		restrict: 'A',
		scope: {
			isDifferent: "=differentMonth",
			isCurrentDay: "=currentDay"
		},
		link: function(scope, element, attr) {
			var month = attr.currentMonth;
			var year = attr.currentYear;
			var toDay = new Date();
			if (scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() && year == toDay.getFullYear()) {
				element.children().prop('checked',true);
				element.addClass('current-date-style');
			}
		
			if (scope.isDifferent != month) {
				element.addClass('different-month-color');
			}
			
			element.bind('click', function() {
				var id = '#m' + scope.isDifferent + scope.isCurrentDay;
				//Using find() function of JQUERY !
				$document.find(id).prop('checked', true);
			})

			$document.bind('click', function() {
				if (element.children().prop('checked') == false) {
					element.removeClass('radio-month-selected');
				} else {
					if (scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() && year == toDay.getFullYear()) {
						element.addClass('current-date-style');
					} else {
						element.addClass('radio-month-selected');
					}
				}
			})
		}
	};
})

.directive('dayHasEvent', function() {
	return {
		restrict: 'A',
		scope: {
			haveEvent: '=dayHasEvent'
		},
		link: function(scope, element, attr) {
			if (scope.haveEvent != null) {
				var index = new Date(attr.year, attr.month, attr.date, 0, 0, 0, 0);
				if (scope.haveEvent[index] != null && attr.month == attr.currentMonth) {
					element.parent().addClass('day-has-event');
				}
			}
		}
	};
})

.directive('checkFirstDay', function($document) {
	return {
		restrict: 'A',
		scope: {
			isFirstDate: '=checkFirstDay'
		},
		link: function(scope, element, attr) {
			element.bind('click', function() {
				if($document.find('td').children().hasClass('current-month-style') == true){
					$document.find('td').children().removeClass('current-month-style');
				}

				var currentMonth = (new Date()).getMonth();
				var currentYear = (new Date()).getFullYear();
				if ( scope.isFirstDate !== currentMonth){
					var id = '#m' + scope.isFirstDate + '1';
					//Using find() function of JQUERY !
					$document.find(id).prop('checked', true);
				}

				if(scope.isFirstDate == currentMonth && attr.thisYear != currentYear){
					var id = '#m' + scope.isFirstDate + '1';
					//Using find() function of JQUERY !
					$document.find(id).prop('checked', true);
				}
			});
		}
	};
})

.directive('checkThisMonth', function($document){
	return {
		restrict: 'A',
		scope: {
			isThisMonth: '=checkThisMonth'
		},
		link: function(scope, element, attr) {
			var currentMonth = (new Date()).getMonth();

			element.bind('click', function() {
				var id = '#' + scope.isThisMonth;
				//Using find() function of JQUERY !
				$document.find(id).children().addClass('current-month-style');
			});
		}
	};
})

.directive('checkFirstMonth',function($document){
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.bind('click',function(){
				if($document.find('td').children().hasClass('current-month-style') == true){
					$document.find('td').children().removeClass('current-month-style');
				}

				$document.find('#0').children().addClass('current-month-style');
			})
		}
	};
})