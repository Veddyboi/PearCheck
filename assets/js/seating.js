var teacher = {};
var students = [];

//startSeating runs when seating.html loads

function startSeating() {
    teacher = JSON.parse(sessionStorage.getItem('teacher'));

    //Sets header to display the teacher's name
    let h2 = document.createElement('h3');
    h2.innerHTML = teacher.first_name + ' ' + teacher.last_name;
    document.getElementById('logo').after(h2);

    //sets each student to absent
    teacher.students.forEach((name) => {
        let full_name = name.split('_');
        students.push({
            first_name: full_name[0],
            middle_name: (full_name.length == 3)? full_name[1] : null,
            last_name: full_name[(full_name.length == 3) ? 2 : 1],
            mark: 'absent'
        });
    });

    //clones the student template in the seating chart for each student
    let template = document.getElementById('student');
    students.forEach((student, i) => {
        let copy = template.cloneNode(true);
        let first = student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);
        let middle = student.middle_name;
        let last = student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);

        if (i == 0) {
            template.after(copy);
        } else {
            document.getElementById('student' + (i - 1)).after(copy);
        }
        copy.innerHTML = last + ", " + (middle != null ? middle.charAt(0).toUpperCase() + ', ' : '') + first;
        copy.id = 'student' + i;
    });
    template.remove();
}