function checkLoggedIn() {
    if (sessionStorage.getItem('teacher') != null) {
        document.getElementById('login').innerHTML = 'Log Out';
    }
}