var globalData = {};
var database = firebase.database();
var count = 1;
var oldId;
window.onload = function() {
	load();
	globalData.txtIn.onkeypress = keyCheck;
	globalData.newUserCr.onclick = regPrepare;
	var messageChange = firebase.database().ref('/messages/');
	messageChange.on('value', function(read) {
		var changes = read.val();
		count = changes.count;
		var objKeys = Object.keys(changes);
		for (var i = 0; i < objKeys.length-1; i++) {
			var currentKey = objKeys[i];
			var currentMessage = changes[currentKey];
			messageLoad(currentMessage);
		};
	});

}
function load() { //прогрузка
	globalData.txtIn = document.getElementById("txtIn");
	globalData.txtOutTable = document.getElementById("txtOutTable");
	globalData.newUserCr = document.getElementById("newUserCr");
	globalData.loginAsUser = document.getElementById("loginAsUser");
	globalData.regTaker = document.getElementById("regTaker");
	globalData.inputName = document.getElementById("inputName");
	globalData.inputPassword = document.getElementById("inputPassword");
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
