var xmlHttp = new XMLHttpRequest();
let button = document.getElementById("loginButton");
let emailTextFeild = document.getElementById("emailFeild");
let usernameTextFeild = document.getElementById("nameFeild");
let passwordFeild = document.getElementById("passwordFeild");

xmlHttp.open("POST", url = "http://127.0.0.1:5500/api/auth/login");
var data = {
    "name" : usernameTextFeild.value,
    "email" : emailTextFeild.value,
    "password" : passwordFeild.value
};

button.onclick = () => {
    fetch('http://127.0.0.1:5500/api/auth/login', {method : "POST", body : data}).then(results => results.json())
};