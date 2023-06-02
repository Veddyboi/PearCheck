//runs on load of login.html
function startLogin() {
    var teachers = localStorage.getItem('teachers');
    if (teachers == null || JSON.parse(teachers).length == 0) {
        localStorage.setItem('teachers', '[]');
        createTeacher();
    } else {
        localStorage.removeItem('teacher');
        var sidebar = document.createElement('div');
        sidebar.className = 'sidenav';
        sidebar.innerHTML =
              "<ul id='teacher list'>"
            + '<li id="teacher"><button value="t1">Teacher Template</button></li>'
            + '</ul>';
        document.getElementById('top').after(sidebar);

        teachers = JSON.parse(localStorage.getItem('teachers'));
        let teacherTemplate = document.getElementById('teacher');
        for (let i = 0; i < teachers.length; i++) {
            let teacherNode = teacherTemplate.cloneNode(true);
            teacherNode.id = 'teacher' + i;
            teacherNode.childNodes[0].innerHTML = teachers[i].last_name;
            teacherNode.childNodes[0].value = 't' + i;
            if (i == 0) {
                teacherTemplate.after(teacherNode);
            } else {
                document.getElementById('teacher' + (i - 1)).after(teacherNode);
            }

            teacherNode.onclick = () => {
                document.getElementById('username').value = teachers[i].username;
            }
        }
        teacherTemplate.remove();
    }
}

function login(myForm) {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    var username = document.getElementById('username').value;
    var usernameError = document.getElementById('username error');
    var password = document.getElementById('password').value;
    var passwordError = document.getElementById('password error');
    
    var foundUsername = false;
    teachers.forEach((teacher, i) => {
        if (username == teacher.username) {
            foundUsername = true;
            if (usernameError != null) {
                usernameError.remove();
            }
            if (password == teacher.password) {
                localStorage.setItem('teacher', i);
                location.href = 'index.html';
            } else if (passwordError == null) {
                let message = document.createElement('p');
                message.id = 'password error';
                message.style.color = 'red';
                message.innerHTML = 'The entered password was incorrect';
                document.getElementById('password').after(message);
            }
        }
    });

    if (!foundUsername) {
        if (usernameError == null) {
            let message = document.createElement('p');
            message.id = 'username error';
            message.style.color = 'red';
            message.innerHTML = 'This username does not exist';
            document.getElementById('username').after(message);
        }
    
        if (passwordError != null) {
            passwordError.remove();
        }
    }

    return false;
}

function createTeacher() {
    document.getElementById('create button').remove();
    var clearButton = document.getElementById('clear');
    clearButton.value = 'Cancel';
    clearButton.onclick = () => {
        location.reload();
    }

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login header').innerHTML = 'Create Profile';
    document.getElementById('password').type = 'text';
    document.getElementById('login button').value = 'Create Profile';

    var firstNameDiv = document.createElement('div');
    firstNameDiv.className = 'field half';

    var firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'first_name');
    firstNameLabel.innerHTML = 'First Name';

    var firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.name = 'first_name';
    firstNameInput.id = 'first_name';
    firstNameInput.placeholder = 'first-name';

    firstNameDiv.appendChild(firstNameLabel);
    firstNameDiv.appendChild(firstNameInput);

    var lastNameDiv = document.createElement('div');
    lastNameDiv.className = 'field half';

    var lastNameLabel = document.createElement('label');
    lastNameLabel.setAttribute('for', 'last_name');
    lastNameLabel.innerHTML = 'Last Name';

    var lastNameInput = document.createElement('input');
    lastNameInput.type = 'text';
    lastNameInput.name = 'last_name';
    lastNameInput.id = 'last_name';
    lastNameInput.placeholder = 'last-name';

    lastNameDiv.appendChild(lastNameLabel);
    lastNameDiv.appendChild(lastNameInput);

    var credentials = document.getElementById('credentials');
    credentials.insertBefore(firstNameDiv,credentials.firstChild);
    firstNameDiv.after(lastNameDiv); 

    document.getElementById('form').onsubmit = (event) => {
        let teachers = JSON.parse(localStorage.getItem('teachers'));
        let first_name = firstNameInput.value;
        let last_name = lastNameInput.value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        var retry = false;
        let text = document.createElement('p');
        text.style.color = 'red';
        var oldMessage = document.getElementById('first_name empty');
        
        if (first_name.length == 0) {
            retry = true;
            if (oldMessage == null) {
                let message = text.cloneNode(true);
                message.innerHTML = 'Please enter your first name';
                message.id = 'first_name empty';
                firstNameInput.after(message);
            }
        } else if (oldMessage != null) {
            oldMessage.remove();
        }

        oldMessage = document.getElementById('last_name empty');
        if (last_name.length == 0) {
            retry = true;
            if (oldMessage == null) {
                let message = text.cloneNode(true);
                message.innerHTML = 'Please enter your last name';
                message.id = 'last_name empty';
                lastNameInput.after(message);
            }
        } else if (oldMessage != null) {
            oldMessage.remove();
        }

        oldMessage = document.getElementById('username empty');
        if (username.length == 0) {
            retry = true;
            if (oldMessage == null) {
                let message = text.cloneNode(true);
                message.innerHTML = 'Please enter a username';
                message.id = 'username empty';
                document.getElementById('username').after(message);
            }
        } else if (oldMessage != null) {
            oldMessage.remove();
        }

        oldMessage = document.getElementById('password empty');
        if (password.length == 0) {
            retry = true;
            if (oldMessage == null) {
                let message = text.cloneNode(true);
                message.innerHTML = 'Please enter a password';
                message.id = 'password empty';
                document.getElementById('password').after(message);
            }
        } else if (oldMessage != null) {
            oldMessage.remove();
        }

        if (!retry) {
            let periods = new Array(6);
            for (let i = 0; i < periods.length; i++) {
                //creates seating chart with 3 rows and 5 columns
                let seatingChartArr = new Array(3);
                for (let j = 0; j < seatingChartArr.length; j++) {
                    seatingChartArr[j] = new Array(5);
                }
                periods[i] = {
                    students: [],
                    seatingChart: seatingChartArr,
                };
            }
            teachers.push({
                first_name: first_name.toLowerCase(),
                last_name: last_name.toLowerCase(),
                username: username,
                password: password,
                periods: periods
            });
            localStorage.setItem('teachers', JSON.stringify(teachers));
            location.reload();
        }

        return false;
    };
}