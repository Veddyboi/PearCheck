function checkLoggedIn() {
    var teachers = localStorage.getItem('teachers');
    let teacherIndex = localStorage.getItem('teacher');
    if (teacherIndex != null) {
        let lastName = JSON.parse(teachers)[JSON.parse(teacherIndex)].last_name;
        document.getElementById('login').innerHTML = 'Log Out';
        document.getElementById('greeting').innerHTML = 'Hi, ' + lastName.charAt(0).toUpperCase() + lastName.slice(1);
    } else {
        document.getElementById('greeting').remove();
        document.getElementById('welcome').innerHTML = 'Hi, Welcome to PearDeck';
    }
}