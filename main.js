function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function checkLogin() {
    let username = getCookie("username");
    if (username) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('usernameDisplay').textContent = "Welcome, " + username + "!";
        document.getElementById('usernameDisplay').style.display = 'block';
    } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('usernameDisplay').style.display = 'none';
    }
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username && password) {
        setCookie("username", username, 7);
        checkLogin();
    } else {
        alert("Invalid login");
    }
});

document.getElementById('logoutButton').addEventListener('click', function () {
    setCookie("username", "", -1);
    checkLogin();
    document.getElementById('username').value = ""; 
    document.getElementById('password').value = "";
});

document.getElementById('writeButton').addEventListener('click', function () {
    let username = getCookie("username");
    if (!username) {
        alert("로그인한 사용자만 글을 작성할 수 있습니다.");
    } else {
        window.location.href = 'boardwrite.html';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    checkLogin();
});
