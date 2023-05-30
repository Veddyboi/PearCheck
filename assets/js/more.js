function startMore() {
    //Checks if user is logged in
    var teacherIndex = localStorage.getItem('teacher');
    if (teacherIndex == null) {
        document.getElementById('greeting').remove();
    } else {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teacher = teachers[JSON.parse(teacherIndex)];

    let lastName = teacher.last_name;
    document.getElementById('login').innerHTML = 'Log Out';
    document.getElementById('greeting').innerHTML = 'Hi, ' + lastName.charAt(0).toUpperCase() + lastName.slice(1);
    }
}