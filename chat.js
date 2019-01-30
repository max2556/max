var globalData = {};
var count = 1;
//var database = firebase.database().ref();
window.onload = function() {
	load();
	globalData.txtIn.onkeypress = keyCheck;
}
function load() { //прогрузка
	globalData.txtIn = document.getElementById("txtIn");
	globalData.txtOutTable = document.getElementById("txtOutTable");
}
function writing() {
	var newTr = document.createElement("tr");
	var newId = "txtOut_" + count;
	newTr.innerHTML = " <td><div class='in2' id=" + newId + "></div></td>";
	newTr.classList = DOMTokenList ["trIn", value = "trIn"];
	newTr.className = "trIn";
	globalData.txtOutTable.appendChild(newTr);
	document.getElementById(newId).innerText = globalData.txtIn.value;
	globalData.txtIn.value = "";
	count = count + 1;
}




function keyCheck(e) {
	 if (e.charCode == 13) {
	 	writing();
	 }
}
