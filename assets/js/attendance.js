var teacher = {};

//runs on load of attendance.html
function startAttendance() {
    //Checks if user is logged in
    if (localStorage.getItem('teacher') == null) {
        location.href = 'login.html';
    }

    teacher = JSON.parse(localStorage.getItem('teacher'));

    //Sets header to display the teacher's name
    let h2 = document.createElement('h3');
    h2.innerHTML = teacher.first_name + ' ' + teacher.last_name;
    document.getElementById('logo').after(h2);
}