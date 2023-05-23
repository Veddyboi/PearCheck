var teacher = {};

//runs on load of attendance.html
function startAttendance() {
    //Checks if user is logged in
    if (sessionStorage.getItem('teacher') == null) {
        window.close();
        window.open('login.html');
    }

    teacher = JSON.parse(sessionStorage.getItem('teacher'));

    //Sets header to display the teacher's name
    let h2 = document.createElement('h3');
    h2.innerHTML = teacher.first_name + ' ' + teacher.last_name;
    document.getElementById('logo').after(h2);
}