var teacher = {};
//seating chart is a 2d array of student{}; outer array is rows, inner array is columns
var seatingChart = [];
var period;
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

    drawSeatingChart();

    //clones the student template to make a list of students
    let template = document.createElement('p');
    template.id = 'student';
    teacher.periods[period].forEach((student, i) => {
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

function createGrid(rows, columns, pixel_width, pixel_height) {
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = 'grid';
    grid.style.width = pixel_width * columns + 'px';
    grid.style.height = pixel_height * rows + 'px';

    for (let r = 0; r < rows; r++) {
        var tr = grid.appendChild(document.createElement('tr'));
        tr.id = 'row' + r;
        for (let c = 0; c < columns; c++) {
            let td = document.createElement('td');
            td.id = r + '_' + c;
            let cell = tr.appendChild(td);
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
        id: prompt("Student's id"),
        attendance: 'absent'
    });
    updateLocalStorage();
    location.reload();
}

function setGrid(row, col, student) {
    for (let r = 0; r < seatingChart.length; r++) {
        for (let c = 0; c < seatingChart[r].length; c++) {
            let oldPosition = seatingChart[r][c];
            if (oldPosition && oldPosition.id == student.id) {
                oldPosition = null;
                document.getElementById(r + '_' + c).innerHTML = '';
            }
        }
    }
    seatingChart[row][col] = student;

    drawSeatingChart();
    updateLocalStorage();
    return;
}

function drawSeatingChart() {
    seatingChart = teacher.seatingCharts[period];

    //creates grid with each cell having a width/height of 50px
    let oldGrid = document.getElementById('grid');
    let grid = createGrid(seatingChart.length, seatingChart[0].length, 50, 50);
    oldGrid.parentNode.replaceChild(grid, oldGrid);

    for (let r = 0; r < seatingChart.length; r++) {
        for (let c = 0; c < seatingChart[r].length; c++) {
            let student = seatingChart[r][c];
            if (student) {
                document.getElementById(r + '_' + c).innerHTML = student.first_name + student.last_name;
            }
        }
    }

    //shows which students are not in the seating chart
    var listedStudentIDs = [];
    seatingChart.forEach((row1) => {
        row1.forEach((student1) => {
            if (student1) {
                listedStudentIDs.push(student1.id);
            }
        });
    });

    var text = document.createElement('p');
    text.id = 'unlisted students';
    text.style.color = 'red';
    teacher.periods[period].forEach((student1, i) => {
        if (!listedStudentIDs.includes(student1.id)) {
            if (i > 0) {
                text.innerHTML += ', ';
            }
            text.innerHTML += student1.first_name.charAt(0).toUpperCase() + student1.first_name.slice(1) + ' ' + student1.last_name.charAt(0).toUpperCase();
        }
    });
    let oldMessage = document.getElementById('ulisted students');
    if (oldMessage) {
        oldMessage.remove();
    }
    if (text.innerHTML) {
        text.innerHTML = 'Not In Seating Chart: ' + text.innerHTML;
        document.getElementById('after edit button').after(text);
    }
}

function updateLocalStorage() {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teachers[JSON.parse(localStorage.getItem('teacher'))] = teacher;
    localStorage.setItem('teachers', JSON.stringify(teachers));
}