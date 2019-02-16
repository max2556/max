var globalData = {};
var database = firebase.database();
var count = 1;
var oldId;
var uiConfig = {
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	tosUrl: '<your-tos-url>',
	privacyPolicyUrl: function() {
		window.location.assign('<your-privacy-policy-url>');
	}
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

window.onload = function() {
	load();
	initApp()
	globalData.txtIn.onkeypress = keyCheck;
	globalData.newUserCr.onclick = regPrepare;
	var messageChange = firebase.database().ref('/messages/');
	messageChange.once('value', function(read) {
		var changes = read.val();
		count = changes.count;
		var objKeys = Object.keys(changes);
		for (var i = 0; i < objKeys.length-1; i++) {
			var currentKey = objKeys[i];
			var currentMessage = changes[currentKey];
			messageLoad(currentMessage);
		};
	});
	messageChange.on('child_added', function(read) {
		var changes = read.val();
		var newId = changes.messageId;
		var newTr = document.createElement("tr");
		newTr.innerHTML = " <td><div class='in2' id=" + newId + "></div></td>";
		newTr.className = "trIn";
		globalData.txtOutTable.appendChild(newTr);
		document.getElementById(newId).innerText =	changes.messageValue;
	});
}

initApp = function() {
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					// User is signed in.
					var uid = user.uid;
					var phoneNumber = user.phoneNumber;
					var providerData = user.providerData;
					var updates = {};
					updates['/users/' + uid] = {
						displayName: user.displayName,
						email: user.email,
						emailVerified: user.emailVerified,
						photoURL: user.photoURL
					};
					document.getElementById("AIB").style.display = "block";
					document.getElementById("firebaseui-auth-container").style.display = "none";
					userCreate(user, uid);
					return firebase.database().ref().update(updates);
				}})};

function load() { //прогрузка
	globalData.txtIn = document.getElementById("txtIn");
	globalData.txtOutTable = document.getElementById("txtOutTable");
	globalData.newUserCr = document.getElementById("newUserCr");
	globalData.loginAsUser = document.getElementById("loginAsUser");
	globalData.regTaker = document.getElementById("regTaker");
	globalData.inputName = document.getElementById("inputName");
	globalData.inputPassword = document.getElementById("inputPassword");
	globalData.AIB = document.getElementById("AIB");
	globalData.auth_container = document.getElementById("firebaseui-auth-container");
	globalData.usersTable = document.getElementById("usersTable");
}
function messageLoad(currentMessage) {
	var newId = currentMessage.messageId;
	var divCheck = document.getElementById(newId);
	if (divCheck == null) {
		var newTr = document.createElement("tr");
		newTr.innerHTML = " <td><div class='in2' id=" + newId + "></div></td>";
		newTr.className = "trIn";
		globalData.txtOutTable.appendChild(newTr);
		document.getElementById(newId).innerText =	currentMessage.messageValue;
	}
}
function writing() {
	var newKey = firebase.database().ref().child('messages').push().key;
	var newId = "txtOut_" + count;
	var updates = {};
 	updates['/messages/' + newKey] = {
		messageValue:	globalData.txtIn.value,
		messageId: newId,
		number: count
	};
	count = count + 1;
	updates['/messages/count'] = count;
	globalData.txtIn.value = "";
	return firebase.database().ref().update(updates);
}
function keyCheck(e) {
	 if (e.charCode == 13) {
	 	writing();
	 }
}
function regPrepare() {
	if (globalData.regTaker.style.visibility == "hidden") {
		globalData.regTaker.style.visibility = "visible";
		globalData.newUserCr.innerText = "Отмена";
	} else {
		globalData.regTaker.style.visibility = "hidden";
		globalData.newUserCr.innerText = "Новый пользователь";
	}

}
function userCreate(user, uid) {
	var alph = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
	var letterNubmer = null;
	var colors = {};
	var newTd = document.createElement("td");
	var newName = user.displayName
	newTd.innerHTML = "<div class='in2' id=" + uid + "></div>";
	newTd.className = "trIn";
  globalData.usersTable.appendChild(newTd);
	document.getElementById(newId).innerText = newName;
	for (var i = 0; i < 3; i++) {
		var currentLetter = newName.charAt(i).toLowerCase();
		for (var i = 0; i < alph.length; i++) {if (currentLetter == alph.charAt(i)) {letterNubmer = i;}}
		letterNubmer = letterNubmer*8;
		colors[i] = letterNubmer;
	}
	var red = colors.0;
	var green = colors.1;
	var blue = colors.2;
	document.getElementById(newId).style.background-color = rgb(red,green,blue);
}
