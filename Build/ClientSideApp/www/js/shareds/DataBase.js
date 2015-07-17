/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 14/07/2015
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);
database.config(function($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
database.factory('eDatabase', function($rootScope, $http, $ionicLoading, eToast, eUser, eSettings, eFriend, eMultiCalendar, eEasiLendar, eCalendar, $localstorage) {
	// clear all data but setting
	var clearData = function() {
		eUser.resetData();
		eFriend.resetData();
	};

	// show loading it hide when call $ionicLoading.hide() or state change
	var databaseLoading = function() {
		$ionicLoading.show({
			template: '<ion-spinner icon="android" class="loading-spinner"></ion-spinner>',
			hideOnStateChange: true
		});
	};

	// check condition for execute database function
	var checkExe = function() {
		return eUser.isLogin && eSettings.sInternet;
	};

	// saveData function for localstorage
	var saveData = function() {
		if (eUser.uRemember) {
			$localstorage.saveData();
		}
	};

	/*
	 * PRIVATE
	 * convert every dateTime object to String
	 */
	var toString = function() {
		if (!isNull(eUser.uCalendar)) {
			var temp = [];
			for (var x in eUser.uCalendar) {
				if (eUser.uCalendar.hasOwnProperty(x)) {
					temp[x] = eUser.uCalendar[x];
					for (var y in temp[x]) {
						if (temp[x].hasOwnProperty(y)) {
							temp[x][y].start.dateTime = temp[x][y].start.
							dateTime.toString();
							temp[x][y].end.dateTime = temp[x][y].end.dateTime.
							toString();
						}
					}
					temp[x] = angular.copy(temp[x]); // remove the $$hashKey
				}
			}
			eUser.uCalendar = temp;
		}
	};

	/*
	 * PRIVATE
	 * is used to hide loading when done
	 */
	var onComplete = function(error) {
		if (error) {
			console.log('failed');
		} else {
			$ionicLoading.hide();
		}
	};

	/*
	 * convert string dateTime to object Date
	 */
	var convertCal = function(calendar) {
		if (!isNull(calendar)) {
			var temp = [];
			for (var x in calendar) {
				if (calendar.hasOwnProperty(x)) {
					temp[x] = calendar[x];
					for (var y in temp[x]) {
						if (temp[x].hasOwnProperty(y)) {
							temp[x][y].start.dateTime = new Date(temp[x][y].start.dateTime);
							temp[x][y].end.dateTime = new Date(temp[x][y].end.dateTime);
						}
					}
				}
			}
			return temp;
		} else {
			return null;
		}
	};

	/*
	 * set uFRequest's length to uFRLength
	 */
	var setUFRL = function() {
		if (isNull(eUser.uFRequest)) {
			eUser.uFRLength = 0;
		} else {
			eUser.uFRLength = Object.keys(eUser.uFRequest).length;
		}
	};

	/*
	 * set uFAccepted's length to uFALength
	 */
	var setUFAL = function() {
		if (isNull(eUser.uFAccepted)) {
			eUser.uFALength = 0;
		} else {
			eUser.uFALength = Object.keys(eUser.uFAccepted).length;
		}
	};

	/*
	 * loadFriendInfo function
	 * fArray is array of id: id
	 * type is "friend" or "noti"
	 * get "id" info and push to this array
	 */
	var loadFriendInfo = function(fArray, type) {
		eUser.uIsDoneFriend = false;
		eUser.uIsDoneNoti = false;
		if (checkExe() && !isNull(fArray)) {
			var ref = new Firebase(
				'https://radiant-inferno-3243.firebaseio.com/Users');

			// find the last friend
			var array = Object.keys(fArray);
			var length = array.length;
			// id of the last friend in the list
			var lastFriend = array[length - 1];
			ref.once('value', function(snapshot) {
				for (var x in fArray) {
					if (fArray.hasOwnProperty(x)) {
						var friend = snapshot.child(x).val();
						fArray[x] = {
							id: x,
							name: friend.name,
							ava: friend.avatar
						};
						if (fArray[x].id == lastFriend) {
							// load uFriend array
							if (type == 'friend') {
								eUser.uIsDoneFriend = true;
							}
							// load noti. Only the last type of noti has type
							else if (type == 'noti') {
								eUser.uIsDoneNoti = true;
							}
						}
					}
					saveData();
				}
			});
		} else {
			if (type == 'friend') {
				eUser.uIsDoneFriend = true;
			}
			// load noti. Only the last type of noti has type
			else if (type == 'noti') {
				eUser.uIsDoneNoti = true;
			}
			return false;
		}
	};

	function DataBase() {
		this.convertCal = convertCal;
		this.setUFRL = setUFRL;
		this.setUFAL = setUFAL;
		this.databaseLoading = databaseLoading;
		this.loadFriendInfo = loadFriendInfo;

		// sign out function
		// reset data, delete local storage, go to form.
		this.signOutEasi = function() {
			clearData();
			$localstorage.deleteData();
			$rootScope.goToState('form');
			eToast.toastSuccess('Sign out successfully!', 3000);
		};

		// updateProfile function
		// update: name, birthday, gender, phone, address
		this.updateProfile = function() {
			if (checkExe()) {
				databaseLoading();

				var upBirthday = eUser.uBirthday != null ? eUser.uBirthday.getTime().toString() : null,
					upGendar = eUser.uGender == "Male" ? 1 : 0;

				$http({
					url: 'http://easilendar.wc.lt/database/updateProfile.php',
					method: "POST",
					data: {
						'id': eUser.uID,
						'pass': eUser.uPassword,
						'name': eUser.uName,
						'birthday': upBirthday,
						'gender': upGendar,
						'phone': eUser.uPhone,
						'address': eUser.uAddress
					}
				}).success(function(data, status, headers, config) {
					$ionicLoading.hide();
					if (data == 'success') {
						eToast.toastSuccess('Update successfully!', 2000);
						saveData();
					} else if (data == 'wrong pass') {
						eToast.toastError('Error. Please log in again!', 3000);
						setTimeout(function() {
							this.signOutEasi();
						}, 3500);
					} else {
						eToast.toastError('An error occurred. Please try again!', 2000);
					}
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();
					eToast.toastError('An error occurred. Please try again!', 2000);
				});
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// searchFriend look for any id or name that contains 'str'
		// add to $rootScope.searchFriends
		this.searchFriend = function(str) {
			if (checkExe()) {
				databaseLoading();

				$http({
					url: 'http://easilendar.wc.lt/database/searchFriend.php',
					method: "POST",
					data: {
						'input': str,
					}
				}).success(function(data, status, headers, config) {
					$ionicLoading.hide();
					if (typeof data == 'object') {
						console.log(data);
						if (!isNull(data)) {
							$rootScope.searchFriends = data;
						}
					} else {
						eToast.toastError('An error occurred. Please try again!', 2000);
					}
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();
					eToast.toastError('An error occurred. Please try again!', 2000);
				});
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// searchEvent look for any id or name that contains 'str'
		// add to $rootScope.searchEvents
		// local function
		this.searchEvent = function(str) {
			$rootScope.searchEvents = [];
			if (!isNull(str)) {
				var length = 0; // index of last element in searchEvents
				// go through all days
				for (var x in eUser.uCalendar) {
					// go through all events in this day
					for (var y in eUser.uCalendar[x]) {
						var found1 = eUser.uCalendar[x][y].summary.search(str);
						var found2 = !isNull(eUser.uCalendar[x][y].location) ?
							eUser.uCalendar[x][y].location.search(str) : -1;
						// if event summary or location contains 'str'
						if (found1 != -1 || found2 != -1) {
							$rootScope.searchEvents[length++] = eUser.uCalendar[x][y];
						}
					}
				}
			} else {
				return false;
			}
		};

		/*
		 * Add friend function add id of this user to 'id' 's friends list
		 */
		this.addFriend = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users');
				var idRef = ref.child(id);

				// loading
				this.databaseLoading();

				// check if id has sent a request
				if (!isNull(eUser.uFRequest) && !isNull(eUser.uFRequest[id])) {
					idRef.once('value', function(snapshot) {
						var user = snapshot.val();
						// there is no user with that "id"
						if (isNull(user)) {
							alert(id + 'does not exist');
						} else {
							// add this user to "id"'s friends list
							var fFriend = idRef.child('friends/' + eUser.uID);
							fFriend.set(eUser.uID);
							// add this user to accepted list of "id"
							var fAccept = idRef.child('noti/fAccept/' +
								eUser.uID);
							fAccept.set(eUser.uID);
							// delete this user from requested list of id
							var fRequested = idRef.child('requested/' +
								eUser.uID);
							fRequested.set(null);

							// delete the request of 'id'
							delete eUser.uFRequest[id];
							setUFRL(); // set uFRLength

							// add "id" to friends list
							if (isNull(eUser.uFriend)) {
								eUser.uFriend = [];
							}
							// local
							eUser.uFriend[id] = {
								id: id,
								name: user.name,
								ava: user.avatar,
								VIP: user.VIP
							};
							// update on this account (not 'id')
							var uFriend = ref.child(eUser.uID + '/friends/' +
								id);
							uFriend.set(id);
							var uFRequest = ref.child(eUser.uID +
								'/noti/fRequest/' + id);
							uFRequest.set(null, onComplete);

							saveData();
						}
					}, function(errorObject) {
						console.log('Failed to access' + ref);
					});
				}
			} else {
				return false;
			}
		};

		/*
		 * get friend's calendar function return object multiCalendar of "id"
		 */
		this.getCalendar = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						user.g_calendar = convertCal(user.g_calendar);
						user.local_calendar = convertCal(user.local_calendar);
						var temp = [user.g_calendar, user.local_calendar];
						eFriend.fMultiCal = eMultiCalendar.newMultiCal(temp);
						$ionicLoading.hide();
						saveData();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * request friend add this user's id to fRequest of 'id'
		 */
		this.request = function(id) {
			if (checkExe() && !isNull(id)) {
				// request myself
				if (id == eUser.uID) {
					return false;
				}
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users');

				// reference to uRequested list of this user
				var uRequest = ref.child(eUser.uID + '/requested/' + id);
				// reference to id
				var friend = ref.child(id);

				// loading
				this.databaseLoading();

				friend.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						// add this user to "id"'s friend request list
						var fRequest = friend.child('noti/fRequest/' +
							eUser.uID);
						fRequest.set(eUser.uID);
						// add id to this user's requested list
						if (isNull(eUser.uRequested)) {
							eUser.uRequested = [];
						}
						// local
						eUser.uRequested[id] = {
							id: id,
							name: user.name,
							ava: user.avatar
						};
						// database
						uRequest.set(id, onComplete);
						saveData();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * deleteFN function delete friend accepted noti 'id' is 
		 * index of noti in
		 * uFAccepted array
		 */
		this.deleteFN = function(id) {
			if (checkExe() && !isNull(id)) {
				delete eUser.uFAccepted[id];
				setUFAL(); // set uFALength

				var uAccept = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID + '/noti/fAccept/' + id);
				// loading
				this.databaseLoading();
				uAccept.set(null, onComplete);
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * deleteF function delete friend with 'id'
		 */
		this.deleteF = function(id) {
			if (checkExe() && !isNull(id)) {
				/* local */
				delete eUser.uFriend[id]; // delete 'id' in user's friend list
				// if accepted noti has not been seen => delete it
				if (!isNull(eUser.uFAccepted)) {
					delete eUser.uFAccepted[id];
				}

				// loading
				databaseLoading();

				/* database */
				var user = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID);
				user.child('friends/' + id).set(null);
				user.child('noti/fAccept/' + id).set(null);

				var friend = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					id);
				friend.child('friends/' + eUser.uID).set(null);
				friend.child('noti/fAccept/' + eUser.uID).set(null, onComplete);
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * rejectF function reject friend request sent by 'id'
		 */
		this.rejectF = function(id) {
			if (checkExe() && !isNull(id)) {
				delete eUser.uFRequest[id];
				setUFRL(); // set uFRLength

				var uRequest = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID + '/noti/fRequest/' + id);
				var fRequested = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					id + '/requested/' + eUser.uID);

				// loading
				this.databaseLoading();
				fRequested.set(null);
				uRequest.set(null, onComplete);
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * getInformation function id is id of a person user
		 * want to get info set
		 * info in eFriend
		 */
		this.getInformation = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						// set user's info to $rootScope.eFriend
						eFriend.fID = id;
						eFriend.fName = user.name;
						eFriend.fAvatar = user.avatar;
						eFriend.fVIP = user.VIP;
						eFriend.fInfor = {
							gender: user.gender,
							birthday: user.birthday,
							phone: user.phone,
							address: user.address,
							email: user.gmail
						};
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * refresh function update everything from server
		 */
		this.refresh = function() {
			if (checkExe()) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// copy all user's data to eUser
					eUser.uName = user.name;
					eUser.uAvatar = user.avatar;
					eUser.uEmail = user.gmail;
					eUser.uPassword = user.password;

					eUser.uGender = user.gender;
					eUser.uBirthday = user.birthday;
					eUser.uPhone = user.phone;
					eUser.uAddress = user.address;

					eUser.uFriend = user.friends;
					eUser.uVIP = user.VIP;

					// convert
					eUser.uCalendar = convertCal(user.g_calendar);
					eUser.uLocalCalendar = convertCal(user.local_calendar);
					eUser.uFaceCalendar = convertCal(user.face_calendar);

					eUser.uRequested = user.requested;
					eUser.uFRequest = isNull(user.noti) ? null : user.noti.fRequest;
					eUser.uFAccepted = isNull(user.noti) ? null : user.noti.fAccept;
					eUser.uFRLength = 0;
					eUser.uFALength = 0;

					// set uFRLength and uFALength
					setUFRL();
					setUFAL();

					// load uRequested, uFRequest, uFAccepted, uFriend info
					loadFriendInfo(eUser.uRequested);
					loadFriendInfo(eUser.uFriend, 'friend');
					loadFriendInfo(eUser.uFRequest);
					loadFriendInfo(eUser.uFAccepted, 'noti');

					$ionicLoading.hide();
					saveData();
				}, function(errorObject) {
					console.log('Can not refresh');
				});
			} else {
				return false;
			}
		};

		/*
		 * updateCalendar function update user's calendar to server
		 */
		this.updateCalendar = function() {
			if (checkExe()) {
				toString(); // convert
				var user = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID);

				// loading
				this.databaseLoading();

				var uGC = user.child('g_calendar');
				if (!isNull(eUser.uCalendar)) {
					uGC.set(eUser.uCalendar);
				} else {
					uGC.set(null);
				}
				var uLocal = user.child('local_calendar');
				if (!isNull(eUser.uLocalCalendar)) {
					uLocal.set(eUser.uLocalCalendar, onComplete);
				} else {
					uLocal.set(null, onComplete);
				}
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * viewProfile function
		 * id is id of a person this user wants to view profile
		 * set name, id, ava, calendar to eFriend
		 */
		this.viewProfile = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						// set id's info to $rootScope.eFriend
						eFriend.fID = id;
						eFriend.fName = user.name;
						eFriend.fAvatar = user.avatar;
						eFriend.fVIP = user.VIP;
						eFriend.fFriend = user.friends;
						eFriend.fInfor = {
							gender: user.gender,
							birthday: user.birthday,
							phone: user.phone,
							address: user.address,
							email: user.gmail
						};
						if (!isNull(eUser.uFriend) &&
							!isNull(eUser.uFriend[id]) &&
							!isNull(eFriend.fFriend[eUser.uID])) {
							// set fMultiCal
							var g_calendar = convertCal(user.g_calendar);
							var local_calendar = convertCal(user.local_calendar);
							var temp = [g_calendar, local_calendar];
							eFriend.fMultiCal = eMultiCalendar.
							newMultiCal(temp);
						} else {
							eFriend.fMultiCal = null;
						}
						$ionicLoading.hide();
						$rootScope.goToState('profile');
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * getFriend function get friend list of id
		 */
		this.getFriend = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						eFriend.fFriend = user.friends;
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * PRIVATE
		 * help function for updateEvent
		 */
		this.updateEventHelper = function(event) {
			var startDate = new Date(event.start.dateTime),
				endDate = new Date(event.end.dateTime),
				// normal/all/over
				etype = eEasiLendar.isType(event.start, event.end);

			// date1, date2 are different if etype is over
			var date1 = new Date(startDate.getFullYear(),
				startDate.getMonth(), startDate.getDate());

			var date2 = new Date(endDate.getFullYear(),
				endDate.getMonth(), endDate.getDate());

			var day = new Firebase(
				'https://radiant-inferno-3243.firebaseio.com/Users/' +
				eUser.uID + '/g_calendar');
			// loading
			this.databaseLoading();
			if (etype != 'over') {
				var temp = isNull(eUser.uCalendar[date1]) ? null :
					angular.copy(eUser.uCalendar[date1]);
				// has only 1 day to update
				day.child(date1.toString()).set(temp, onComplete);
			} else {
				// update every from date1 to date2
				while (date1 <= date2) {
					var temp = isNull(eUser.uCalendar[date1]) ? null :
						angular.copy(eUser.uCalendar[date1]);
					if (date1 < date2) {
						day.child(date1.toString()).set(temp);
					} else {
						day.child(date1.toString()).set(temp, onComplete);
					}
					date1 = eCalendar.tomorrow(date1);
				}
			}
		};

		/*
		 * updateEvent function
		 * type is string ['create', 'del', 'edit']
		 * event1 is new created event/delete event/event before edit
		 * event2 is event after edit
		 */
		this.updateEvent = function(event1, type, event2) {
			if (checkExe() && !isNull(event1) && !isNull(type)) {
				if (type == 'create') {
					this.updateEventHelper(event1);
				} else if (type == 'del') {
					this.updateEventHelper(event1);
				} else if (type == 'edit' && !isNull(event2)) {
					this.updateEventHelper(event1);
					this.updateEventHelper(event2);
				}
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * checkBusy function
		 * true if "id" is busy today, false otherwise
		 */
		this.checkBusy = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that 'id'
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						var time = new Date();
						var today = new Date(time.getFullYear(),
							time.getMonth(),
							time.getDate());
						if (isNull(user.g_calendar) ||
							isNull(user.g_calendar[today])) {
							return false;
						} else {
							return true;
						}
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * checkHack function
		 */
		this.checkHack = function(id, pass) {
			if (checkExe()) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						if (user.password != pass) {
							// clear data
							clearData();

							// Clear cache
							$localstorage.deleteData();

							// change state
							$rootScope.goToState('form');

							// notice
							eToast.toastSuccess('You are hacked!', 3000);
						}
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		}
	}
	return new DataBase();
});
