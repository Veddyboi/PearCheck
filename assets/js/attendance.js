var teacher = {};

//runs on load of attendance.html
function startAttendance() {
    teacher = JSON.parse(sessionStorage.getItem('teacher'));

    //Sets header to display the teacher's name
    let h2 = document.createElement('h3');
    h2.innerHTML = teacher.first_name + ' ' + teacher.last_name;
    document.getElementById('logo').after(h2);
}