/**
 * starter: Can Duy Cat 
 * owner: Nguyen Minh Trang 
 * last update: 16/03/2015 
 * type: particular controller
 */

var signIn = angular.module('MainApp.controllers.signIn', [ 'ionic' ]);

signIn.controller('SignInController',
		function($rootScope, $scope, $timeout, $http, $state, $ionicPopup) 
{
	// link to home's default view
	var link = $rootScope.eSettings.sDefaultView;

	$scope.isRemember = false;

	// warning object contains all warnings
	$scope.warnings = {
		// array of messages (5 mes)
		mes : [ "", "", "", "", "" ],

		// reset all messages (set to null)
		reset : function(num) {
			this.mes[num] = "";
		},

		// check if mes[i] is a warning or NULL
		check : function(num) {
			if (this.mes[num] == "") {
				return true;
			} else
				return false;
		}
	};

	/* class User */
	function User() {
		// all informations
		this.id = "";
		this.name = "";
		this.email = "";
		this.password = "";
		this.re_password = "";

		// reset all data
		this.reset = function() {
			this.id = "";
			this.name = "";
			this.email = "";
			this.password = "";
			this.re_password = "";
		};

		/*
		 * check ID's characters 0..9 || a..z || A..Z || _
		 */
		this.checkChar = function() {
			// check input length
			if (this.id.length > 15 || this.id.length < 4)
				return false;
			// check input characters (ASCII)
			for (var i = 0; i < this.id.length; i++) {
				if (this.id.charCodeAt(i) < 48)
					return false;
				else if (this.id.charCodeAt(i) > 57
						&& this.id.charCodeAt(i) < 65)
					return false;
				else if (this.id.charCodeAt(i) > 90
						&& this.id.charCodeAt(i) < 97
						&& this.id.charCodeAt(i) != 95)
					return false;
				else if (this.id.charCodeAt(i) > 122)
					return false;
			}
			return true;
		};

		/*
		 * check ID Can not be empty ID must be unique (check later when connect
		 * to server)
		 */
		this.checkID = function() {
			// if valid return true else return fault's
			// string
			if (this.id == "") {
				return "Required";
			} else if (!this.checkChar()) {
				if (this.id.length < 4) {
					return "ID is too short";
				} else if (this.id.length > 15) {
					return "ID is too long";
				} else {
					return "Unexpected";
				}
			} else {
				return true;
			}
		};

		/*
		 * check Name Can not be empty
		 */
		this.checkName = function() {
			// if valid return true else return fault's
			// string
			if (this.name == "") {
				return "Required";
			}
			return true;
		};

		/*
		 * check Email can not be empty
		 */
		this.checkEmail = function() {
			// if valid return true else return fault's
			// string
			if (this.email == "") {
				return "Required";
			} else if (-1 == this.email.search("@")) {
				return "Unvalid Email";
			}
			return true;
		};

		/*
		 * check Password Can not be empty
		 */
		this.checkPass = function() {
			// if valid return true else return fault's
			// string
			if (this.password == "") {
				return "Required";
			} else if (this.password.length < 8) {
				return "Too short";
			} else if (this.password.length > 16) {
				return "Too long";
			}
			return true;
		};

		/*
		 * check confirm password Can not be empty Must match with password
		 */
		this.checkCPass = function() {
			// if valid return true else return fault's
			// string
			if (this.re_password == "") {
				return "Required";
			} else if (this.re_password != this.password) {
				return "Not match";
			}
			return true;
		};
	}
	; // End of class User

	// create new user
	$scope.user = new User();

	// sign in function with firebase
	$scope.signIn = function() {
		if (!$scope.user.checkChar()) {
			$state.go('warning');
		} else {
			var id = $scope.user.id;
			var pass = $scope.user.password;
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);

			ref.on("value", function(snapshot) {
				var user = snapshot.val();
				if (user == null || user.password != pass) {
					$state.go("warning");
				} else {
					$rootScope.eUser.uID = id;
					$rootScope.eUser.uPassword = pass;
					$rootScope.eUser.uRemember = $scope.isRemember;
					$rootScope.eUser.uEmail = user.gmail;
					$rootScope.eUser.uName = user.name;
					$rootScope.eUser.uFriend = user.friends;
					$rootScope.eUser.uGmailCalendar = user.g_calendar;
					$rootScope.eUser.uLocalCalendar = user.local_calendar;
					$rootScope.eUser.uVIP = user.VIP;
					
					$rootScope.eUser.isLogin = true;
					
					$state.go(link);
				}
			}, function(errorObject) {
				$state.go("warning");
			});
		}
	};
	/*
	 * // sign in function $scope.signIn = function() { if
	 * (!$scope.user.checkChar()) { $state.go('warning'); } else { var id =
	 * $scope.user.id; var pass = $scope.user.password;
	 * $http.post("php/signIn.php", {"ID": id, "pass": pass})
	 * .success(function(data,status,headers,config) { if (data == "YES") {
	 * $state.go(link); } else { $state.go(link); // should be warning } })
	 * .error(function(data,status) { $state.go(link); // should be warning }); } };
	 */

	// confirm the warning when sign in
	$scope.confirm = function() {
		$state.go('form');
	};

	// register function
	$scope.register = function() {
		// reset all warnings
		for (var i = 0; i < 5; i++) {
			$scope.warnings.reset(i);
		}

		// flag array, contains temporary warning messages
		var flag = [];
		// check if there is a warning
		var check = false;

		// ID: true or message
		flag[0] = $scope.user.checkID();
		// Name: true or message
		flag[1] = $scope.user.checkName();
		// Email: true or message
		flag[2] = $scope.user.checkEmail();
		// Password: true or message
		flag[3] = $scope.user.checkPass();
		// Confirm password: true or message
		flag[4] = $scope.user.checkCPass();

		// if flag[i] is a string => it's a warning
		for (var i = 0; i < 5; i++) {
			if (typeof (flag[i]) == "string") {
				$scope.warnings.mes[i] = flag[i];
				check = true;
			}
		}

		// if inputs are correct (or else all users will be
		// licked)
		if (!check) {
			// create a reference to Firebase
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
							+ $scope.user.id);

			// get data from that link if exists, null if not
			ref.once('value', function(snapshot) {
				// if id existed => change ID message
				if (snapshot.val() != null) {
					$scope.warnings.mes[0] = "Existed";
					check = true;
				}
				// if there is no warning
				if (!check) {
					// cut email string to save (get rid of
					// '@gmail.com')
					var pos = $scope.user.email.search("@");
					var mail;
					if (pos == -1) {
						mail = $scope.user.email;
					} else {
						mail = $scope.user.email.slice(0, pos);
					}

					// create new user
					ref.set({
						name : $scope.user.name,
						password : $scope.user.password,
						local_calendar : "",
						g_calendar : "",
						friends : "",
						VIP : 0,
						gmail : mail
					});
					
					// welcome message
					$scope.showPopup();
				}
			});
		}
	};

	// pop up to welcome new user
	$scope.showPopup = function() {
		var welcome = $ionicPopup
				.show({
					template : '<div class="font20 easi-center easi-dark-blue">Welcome to EasiLendar!</div>',
					title : 'Registered',
					scope : $scope,
				});
		$timeout(function() {
			welcome.close();
			// close the popup after 3 seconds
		}, 3000);
		$state.go('form');
	};

	// back to form
	$scope.back = function() {
		$state.go('form');
	};
});