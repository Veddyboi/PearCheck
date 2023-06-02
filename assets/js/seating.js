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
        period = JSON.parse(sessionStorage.getItem('period'));
    }

    drawSeatingChart();

    //clones the student template to make a list of students
    let template = document.createElement('p');
    template.id = 'student';
    teacher.periods[period].students.forEach((student, i) => {
        let copy = template.cloneNode(true);
        let first = student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);
        let last = student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);

        copy.innerHTML = 'id# ' + student.id + ': ' + last + ", " + first;
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
            td.style.width = pixel_width + 'px';
            td.style.height = pixel_height + 'px';
            let cell = tr.appendChild(td);
            cell.addEventListener('click', gridClick, false);
        }
    }
    return grid;
}

function gridClick(event) {
    if (editMode) {
        var row = parseInt(event.currentTarget.id.split('_')[0]);
    var col = parseInt(event.currentTarget.id.split('_')[1]);

    if (teacher.periods[period].students.length > 0) {
        let cell = seatingChart[row][col];
        let unlistedStudents = JSON.parse(JSON.stringify(teacher.periods[period].students));
        for (let r1 = 0; r1 < seatingChart.length; r1++) {
            for (let c1 = 0; c1 < seatingChart[0].length; c1++) {
                if (seatingChart[r1][c1]) {
                    for (let index = unlistedStudents.length - 1; index >= 0; index--) {
                        if (seatingChart[r1][c1].student && unlistedStudents[index].id == seatingChart[r1][c1].student.id) {
                            unlistedStudents.splice(index, 1);
                        }
                    }
                }
            }
        }

        if (cell) {
            if (cell.student) {
                if (confirm("Are you sure you want to remove '" + cell.student.first_name.charAt(0).toUpperCase() + cell.student.first_name.slice(1) + ' ' + cell.student.last_name.charAt(0).toUpperCase() + "' from the seating chart?")) {
                    seatingChart[row][col].student = null;
                }
            } else if (document.getElementById('student-check').checked) {
                if (unlistedStudents.length > 0) {
                    let chosenID = prompt('Choose a student by their id# to add to the seating chart:\n' + unlistedStudents.map(student1 => student1.id + ': ' + student1.first_name.charAt(0).toUpperCase() + student1.first_name.slice(1) + ' ' + student1.last_name.charAt(0).toUpperCase() + student1.last_name.slice(1) + '\n'));
                    unlistedStudents.forEach((student1) => {
                        if (student1.id == chosenID) {
                            setGrid(row, col, student1);
                        }
                    });
                } else {
                    let chosenID = prompt('Choose a student by their id# to move to this location on the seating chart:\n' + teacher.periods[period].students.map(student1 => student1.id + ': ' + student1.first_name.charAt(0).toUpperCase() + student1.first_name.slice(1) + ' ' + student1.last_name.charAt(0).toUpperCase() + student1.last_name.slice(1) + '\n'));
                    teacher.periods[period].students.forEach((student1) => {
                        if (student1.id == chosenID) {
                            setGrid(row, col, student1);
                        }
                    });
                }
            } else if (confirm("Are you sure you want to remove this " + cell.type + "?")) {
                seatingChart[row][col] = null;
            }
        } else {
            if (document.getElementById('desk-check').checked) {
                seatingChart[row][col] = {
                    type: 'desk',
                    student: null
                }
            }
        }

        updateLocalStorage();
        drawSeatingChart();
    }
    }
    return;
}

function toggleEdit() {
    editMode = !editMode;
    var edit = document.getElementById('editButton');
    var cancel = document.getElementById('cancelEdit');
    var randomizer = document.getElementById('randomizer');
    var dimensions = document.getElementById('dimensions');
    var field = document.createElement('div');
    field.id = 'field';

    if (editMode) {
        edit.innerHTML = 'confirm';
        
        cancel = document.createElement('button');
        cancel.onclick = () => {
            toggleEdit();
        };
        cancel.id = 'cancelEdit';
        cancel.innerHTML = 'cancel';
        edit.after(cancel);

        randomizer = document.createElement('button');
        randomizer.onclick = () => {
            randomize(teacher.periods[period]);
            updateLocalStorage();
            drawSeatingChart();
        };
        randomizer.id = 'randomizer';
        randomizer.innerHTML = 'randomize';
        cancel.after(randomizer);

        cancel.after(dimensions);
        field.innerHTML = '<fieldset><legend>What would you like to edit?</legend>' +
        '<div>' +
        '  <input type="radio" id="student-check" name="drone" value="student-check" checked>' +
        '  <label for="student-check">Students</label>' +
        '</div>' +
        '<div>' +
        '  <input type="radio" id="desk-check" name="drone" value="desk-check">' +
        '  <label for="desk-check">Desks</label>' +
        '</div>' +
        '</fieldset>';
        dimensions.after(field);

        var widthText = document.createElement('p');
        widthText.innerHTML = 'width: ';
        widthText.id = 'width-text';
        dimensions.appendChild(widthText);

        var widthInput = document.createElement('input');
        widthInput.addEventListener('input', () => {
            let val = parseInt(widthInput.value);
            if (!val || val < parseInt(widthInput.min)) {
                widthInput.value = widthInput.min;
                val = parseInt(widthInput.min);
            }
            if (val > parseInt(heightInput.max)) {
                widthInput.value = widthInput.max;
                val = parseInt(heightInput.max);
            }
            if (val > seatingChart[0].length) {
                let difference = val - seatingChart[0].length;
                for (let row of seatingChart) {
                    for (let i = 0; i < difference; i++) {
                        row.push(null);
                    }
                }
            } else if (val < seatingChart[0].length) {
                loop1: for (let c = seatingChart[0].length - 1; c > val - 1; c--) {
                    let count = 0;
                    for (let row of seatingChart) {
                        if (row[c]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        if (!confirm('Are you sure you want to remove ' + count + ' students from the seating chart?')) {
                            widthInput.value++;
                            break loop1;
                        }
                    }
                    for (let row of seatingChart) {
                        row.pop();
                    }
                }
            }

            updateLocalStorage();
            drawSeatingChart();
            return;
        });
        widthInput.id = 'width';
        widthInput.type = 'number';
        widthInput.min = '3';
        widthInput.max = '500';
        //default width
        widthInput.value = seatingChart[0].length;
        dimensions.appendChild(widthInput);

        var heightText = document.createElement('p');
        heightText.innerHTML = 'height: ';
        heightText.id = 'height-text';
        dimensions.appendChild(heightText);

        var heightInput = document.createElement('input');
        heightInput.addEventListener('input', () => {
            let val = parseInt(heightInput.value);
            if (!val || val < parseInt(heightInput.min)) {
                heightInput.value = heightInput.min;
                val = parseInt(heightInput.min);
            }
            if (val > parseInt(heightInput.max)) {
                heightInput.value = heightInput.max;
                val = parseInt(heightInput.max);
            }
            if (val > seatingChart.length) {
                let difference = val - seatingChart.length;
                for (let i = 0; i < difference; i++) {
                    seatingChart.push(new Array(seatingChart[0].length));
                }
            } else if (val < seatingChart.length) {
                loop1: for (let r = seatingChart.length - 1; r > val - 1; r--) {
                    let count = 0;
                    for (let c = 0; c < seatingChart[0].length; c++) {
                        if (seatingChart[r][c]) {
                            count++;
                        }
                    }
                    if (count > 0) {
                        if (!confirm('Are you sure you want to remove ' + count + ' students from the seating chart?')) {
                            heightInput.value++;
                            break loop1;
                        }
                    }
                    seatingChart.pop();
                }
            }
            updateLocalStorage();
            drawSeatingChart();
            return;
        });
        heightInput.id = 'height';
        heightInput.type = 'number';
        heightInput.min = '3';
        heightInput.max = '500';
        //default height
        heightInput.value = seatingChart.length;
        dimensions.appendChild(heightInput);
    } else {
        edit.innerHTML = 'edit layout';
        cancel.remove();
        randomizer.remove();
        dimensions.innerHTML = '';
        document.getElementById('field').remove();
    }
    drawSeatingChart();
}

function showPeriod(newPeriod) {
    sessionStorage.setItem('period', newPeriod);
    location.reload();
}

function createStudent() {
    teacher.periods[period].students.push({
        first_name: prompt("Student's First Name").toLowerCase(),
        last_name: prompt("Student's Last Name").toLowerCase(),
        id: prompt("Student's id"),
        attendance: 'absent',
        time_arrived: null
    });
    updateLocalStorage();
    location.reload();
}

function setGrid(row, col, student) {
    for (let r = 0; r < seatingChart.length; r++) {
        for (let c = 0; c < seatingChart[r].length; c++) {
            let oldPosition = seatingChart[r][c];
            if (oldPosition && oldPosition.student && oldPosition.student.id == student.id) {
                seatingChart[r][c] = {
                    type: 'desk',
                    student: null
                };
                document.getElementById(r + '_' + c).innerHTML = '';
            }
        }
    }
    seatingChart[row][col].student = student;

    updateLocalStorage();
    drawSeatingChart();
    return;
}

function randomize(classPeriod) {
    var desks = [];
    for (let r = 0; r < classPeriod.seatingChart.length; r++) {
        for (let c = 0; c < classPeriod.seatingChart[r].length; c++) {
            let desk = classPeriod.seatingChart[r][c];
            if (desk && desk.type == 'desk') {
                desk.student = null;
                desks.push(desk);
            }
        }
    }
    classPeriod.students.forEach((student) => {
        if (desks.length == 0) {
            alert('There are not enough desks for each student');
            return;
        }
        let rand = Math.floor(Math.random() * desks.length);
        desks[rand].student = student;
        desks.splice(rand, 1);
    });
    if (desks.length > 0) {
        alert('There are not enough students to fill each desk!');
    }
}

function drawSeatingChart() {
    seatingChart = teacher.periods[period].seatingChart;

    //creates grid with square cells
    let oldGrid = document.getElementById('grid');
    let grid = createGrid(seatingChart.length, seatingChart[0].length, 100, 100);
    oldGrid.parentNode.replaceChild(grid, oldGrid);

    for (let r = 0; r < seatingChart.length; r++) {
        for (let c = 0; c < seatingChart[r].length; c++) {
            let cell = seatingChart[r][c];
            if (cell) {
                if (cell.student) {
                    document.getElementById(r + '_' + c).innerHTML = cell.student.first_name + '<br>' + cell.student.last_name;
                }
                if (cell.type = 'desk') {
                    document.getElementById(r + '_' + c).style.backgroundColor = '#7393B3';
                }
            }
        }
    }

    //shows which students are not in the seating chart
    var listedStudentIDs = [];
    seatingChart.forEach((row1) => {
        row1.forEach((cell) => {
            if (cell && cell.student) {
                listedStudentIDs.push(cell.student.id);
            }
        });
    });

    var text = document.createElement('p');
    text.id = 'unlisted-students';
    let firstMatch = true;
    teacher.periods[period].students.forEach((student1) => {
        if (!listedStudentIDs.includes(student1.id)) {
            if (!firstMatch) {
                text.innerHTML += ', ';
            }
            firstMatch = false;
            text.innerHTML += student1.first_name.charAt(0).toUpperCase() + student1.first_name.slice(1) + ' ' + student1.last_name.charAt(0).toUpperCase();
        }
    });
    let oldMessage = document.getElementById('unlisted-students');
    if (oldMessage) {
        oldMessage.remove();
    }
    if (text.innerHTML) {
        text.innerHTML = (editMode? '<br><br><br>' : '') + 'Not In Seating Chart: ' + text.innerHTML;
        document.getElementById('after edit button').after(text);
    }
}

function updateLocalStorage() {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teachers[JSON.parse(localStorage.getItem('teacher'))] = teacher;
    localStorage.setItem('teachers', JSON.stringify(teachers));
}