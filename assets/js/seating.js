var teacher = {};
var students = [];
//width and height of grid; in the future, width/height will be pulled from localStorage
var width, height;

//startSeating runs when seating.html loads

function startSeating() {
    //Checks if user is logged in
    if (localStorage.getItem('teacher') == null) {
        location.href = 'login.html';
    }

    teacher = JSON.parse(localStorage.getItem('teacher'));

    //Sets header to display the teacher's name
    let h2 = document.createElement('h3');
    h2.innerHTML = teacher.first_name + ' ' + teacher.last_name;
    document.getElementById('logo').after(h2);

    //initializes each student
    teacher.students.forEach((name) => {
        let full_name = name.split('_');
        students.push({
            first_name: full_name[0],
            middle_name: (full_name.length == 3)? full_name[1] : null,
            last_name: full_name[(full_name.length == 3) ? 2 : 1],
        });
    });

    //creates grid
    width = 15;
    height = 5;
    let oldGrid = document.getElementById('grid');
    let grid = createGrid(height, width, 500);
    oldGrid.parentNode.replaceChild(grid, oldGrid);

    //clones the student template to make a list of students
    let template = document.getElementById('student');
    students.forEach((student, i) => {
        let copy = template.cloneNode(true);
        let first = student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);
        let middle = student.middle_name;
        let last = student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);

        copy.innerHTML = last + ", " + first + (middle != null ? ', ' + middle.charAt(0).toUpperCase() + '.' : '');
        copy.id = 'student' + i;

        if (i == 0) {
            template.after(copy);
        } else {
            document.getElementById('student' + (i - 1)).after(copy);
        }
    });
    template.remove();
}

function createGrid(rows, columns, pixel_height) {
    var count = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (let r = 0; r < rows; r++) {
        var tr = grid.appendChild(document.createElement('tr'));
        tr.style.height = pixel_height / rows + 'px';
        tr.id = 'row' + r;
        for (let c = 0; c < columns; c++) {
            let cell = tr.appendChild(document.createElement('td'));
            cell.addEventListener('click', () => {
                alert('You clicked the student at (' + r + ', ' + c + ')');
            });
        }
    }
    return grid;
}