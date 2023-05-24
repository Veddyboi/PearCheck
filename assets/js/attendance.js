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

    //initializes each student as absent
    teacher.students.forEach((name) => {
        let full_name = name.split('_');
        students.push({
            first_name: full_name[0],
            middle_name: (full_name.length == 3)? full_name[1] : null,
            last_name: full_name[(full_name.length == 3) ? 2 : 1],
            mark: 'absent'
        });
    });
}