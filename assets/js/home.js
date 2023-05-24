function checkLoggedIn() {
    let teacherJSON = localStorage.getItem('teacher');
    if (teacherJSON != null) {
        let last = JSON.parse(teacherJSON).last_name;
        document.getElementById('login').innerHTML = 'Log Out';
        document.getElementById('greeting').innerHTML = 'Hi, ' + last.charAt(0).toUpperCase() + last.slice(1);
    } else {
        document.getElementById('greeting').remove();
        document.getElementById('welcome').innerHTML = 'Hi, Welcome to PearDeck';
    }
}