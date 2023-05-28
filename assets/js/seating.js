var teacher = {};
var period;
//width and height of grid; in the future, width/height will be pulled from localStorage
var width, height;
var editMode = false;

//startSeating runs when seating.html loads

function startSeating() {
    //Checks if user is logged in
    let teacherIndex = localStorage.getItem('teacher');
    if (teacherIndex == null) {
        location.href = 'login.html';
    }

    let teachers = JSON.parse(localStorage.getItem('teachers'));
    teacher = teachers[JSON.parse(teacherIndex)];

    //Sets header to display the teacher's name
    let h3 = document.createElement('h3');
    h3.innerHTML = teacher.first_name + ' ' + teacher.last_name;
    document.getElementById('logo').after(h3);

    if (sessionStorage.getItem('period') == null) {
        sessionStorage.setItem('period', 0);
        period = 0;
    } else {
        period = sessionStorage.getItem('period');
    }

    var students = teacher.periods[period];

    //creates grid
    width = 15;
    height = 5;
    let oldGrid = document.getElementById('grid');
    let grid = createGrid(height, width, 500);
    oldGrid.parentNode.replaceChild(grid, oldGrid);

    //clones the student template to make a list of students
    let template = document.createElement('p');
    template.id = 'student';
    students.forEach((student, i) => {
        let copy = template.cloneNode(true);
        let first = student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);
        let last = student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);

        copy.innerHTML = last + ", " + first;
        copy.id = 'student' + i;

        if (i == 0) {
            document.getElementById('roster header').after(copy);
        } else {
            document.getElementById('student' + (i - 1)).after(copy);
        }
    });
    template.remove();
}

function createGrid(rows, columns, pixel_height) {
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = 'grid';
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

function toggleEdit() {
    editMode = !editMode;
    var edit = document.getElementById('editButton');
    var cancel = document.getElementById('cancelEdit');
    var dimensions = document.getElementById('dimensions');
    var widthInput = document.getElementById('width');
    var heightInput = document.getElementById('height');

    if (editMode) {
        edit.innerHTML = 'confirm';
        
        cancel = document.createElement('button');
        cancel.onclick = () => {
            toggleEdit();
        };
        cancel.id = 'cancelEdit';
        cancel.innerHTML = 'cancel';
        cancel.style.marginLeft = '20px';
        edit.after(cancel);

        cancel.after(dimensions);

        widthInput = document.createElement('INPUT');
        widthInput.id = 'width';
        widthInput.style.marginLeft = '50px';
        widthInput.style.color = 'black';
        widthInput.style.fontWeight = 'bold';
        widthInput.style.width = '40px';
        dimensions.appendChild(widthInput);

        heightInput = document.createElement('INPUT');
        heightInput.id = 'height';
        heightInput.style.color = 'black';
        heightInput.style.fontWeight = 'bold';
        heightInput.style.width = '40px';
        // widthInput.after(heightInput);
        widthInput.after(heightInput);
    } else {
        edit.innerHTML = 'edit layout';
        cancel.remove();
        dimensions.innerHTML = '';
    }
}

function showPeriod(newPeriod) {
    sessionStorage.setItem('period', newPeriod);
    location.reload();
}

function createStudent() {
    teacher.periods[period].push({
        first_name: prompt("Student's First Name").toLowerCase(),
        last_name: prompt("Studnt's Last Name").toLowerCase(),
        id: prompt("Student's id")
    });
    updateLocalStorage();
    location.reload();
}

function updateLocalStorage() {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teachers[JSON.parse(localStorage.getItem('teacher'))] = teacher;
    localStorage.setItem('teachers', JSON.stringify(teachers));
}