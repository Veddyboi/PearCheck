//runs on load of login.html
function startLogin() {
    sessionStorage.removeItem('teacher');
    
    let errorMessage = sessionStorage.getItem('Error Message');
    if (errorMessage != null) {
        let text = document.createElement('p');
        text.innerHTML = errorMessage;
        text.style.color = 'red';
        document.getElementById(errorMessage.includes('username')? 'name' : 'password').after(text);
        document.getElementById('name').value = sessionStorage.getItem('enteredUsername');
    }
}

function login(){
    const teachers = {
        kiyoi: {
            first_name: 'kevin',
            last_name: 'kiyoi',
            students: ['alexis_tadeusz_sliwak', 'john_lennon', 'donald_john_trump', 'hillary_clinton', 'tony_stark','john_quincy_adams'],
            password: 'kiyoi2023'
        },
        kramer: {
            first_name: 'george',
            last_name: 'kramer',
            students: ['miley_ray_cyrus', 'vin_diesel', 'elton_hercules_john', 'kim_jong_un'],
            password: 'kramer2023'
        },
        devor: {
            first_name: 'mike',
            last_name: 'devor',
            students: ['first_middle_last', 'first_last', 'jenna_marbles', 'bill_gates'],
            password: 'devor2023'
        }
    };

    var username = document.getElementById('name').value.toLowerCase();

if (teachers.hasOwnProperty(username)) {
    if (teachers[username].password == document.getElementById('password').value) {
        sessionStorage.setItem('teacher', JSON.stringify(teachers[username]));
        sessionStorage.removeItem('Error Message');
        sessionStorage.removeItem('enteredUsername');
        window.open('seating.html', '_self');
        // window.close();
    } else {
        sessionStorage.setItem('Error Message', 'The entered password was incorrect');
        sessionStorage.setItem('enteredUsername', document.getElementById('name').value);
        window.open('login.html', '_self');
        // window.close();
    }
} else {
    sessionStorage.setItem('Error Message', 'This username does not exist');
    sessionStorage.setItem('enteredUsername', document.getElementById('name').value);
    window.open('login.html', '_self');
    // window.close();
}   
}