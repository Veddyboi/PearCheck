var teacher = {};

//runs on load of attendance.html
function startAttendance() {
    //Checks if user is logged in
    var teacherIndex = localStorage.getItem('teacher');
    if (teacherIndex == null) {
        location.href = 'login.html';
    }

    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teacher = teachers[JSON.parse(teacherIndex)];

    let lastName = teacher.last_name;
    document.getElementById('login').innerHTML = 'Log Out';
    document.getElementById('greeting').innerHTML = 'Hi, ' + lastName.charAt(0).toUpperCase() + lastName.slice(1);

    showStudents(0);
}

function showStudents(period) {
    // Get the elements
    var scheduleText = document.getElementById("schedule-text");
    var scheduleList = document.getElementById("schedule-list");
  
    // Determine the schedule based on the day of the week
    const today = new Date();   
    const dayOfWeek = today.getDay();
    scheduleText = "";
    scheduleTimes = "";
    var times;
    
    switch (dayOfWeek) {
        case 1:
            times = [
                "A˚ 7:15 AM - 8:23 AM (68 min)",
                "1˚ 8:30 AM - 9:27 AM (57 min)",
                "2˚ 9:34 AM - 10:31 AM (57 min)",
                "Brunch 10:31 AM - 10:36 AM (5 min)",
                "3˚ 10:43 AM - 11:40 AM (57 min)",
                "4˚ 11:47 AM - 12:44 PM (57 min)",
                "Lunch 12:44 PM - 1:14 PM (30 min)",
                "5˚ 1:21 PM - 2:18 PM (57 min)",
                "6˚ 2:25 PM - 3:22 PM (57 min)",
                "B˚ 3:29 PM - 4:26 PM (57 min)"
            ];
            break;
        case 2:
            times = [
                "A˚ 7:15 AM - 8:23 AM (68 min)",
                "1˚ 8:30 AM - 9:27 AM (57 min)",
                "2˚ 9:34 AM - 10:31 AM (57 min)",
                "Brunch 10:31 AM - 10:36 AM (5 min)",
                "3˚ 10:43 AM - 11:40 AM (57 min)",
                "4˚ 11:47 AM - 12:44 PM (57 min)",
                "Lunch 12:44 PM - 1:14 PM (30 min)",
                "5˚ 1:21 PM - 2:18 PM (57 min)",
                "6˚ 2:25 PM - 3:22 PM (57 min)",
                "B˚ 3:29 PM - 4:26 PM (57 min)"
            ];
            break;
        case 3:
            times = [
                "Staff Collaboration 8:00 AM - 8:45 AM (45 min)",
                "1˚ 8:50 AM - 10:22 AM (92 min)",
                "Brunch 10:22 AM - 10:30 AM (8 min)",
                "3˚ 10:37 AM - 12:09 PM (92 min)",
                "Lunch 12:09 PM - 12:39 PM (30 min)",
                "ACCESS 12:46 PM - 1:41 PM (55 min)",
                "5˚ 1:48 PM - 3:20 PM (92 min)",
                "B˚ 3:27 PM - 4:24 PM (57 min)"
            ];
            break;
        case 4:
            times = [
                "A˚ 7:15 AM - 8:45 AM (90 min)",
                "2˚ 8:50 AM - 10:22 AM (92 min)",
                "Brunch 10:22 AM - 10:30 AM (8 min)",
                "4˚ 10:37 AM - 12:09 PM (92 min)",
                "Lunch 12:09 PM - 12:39 PM (30 min)",
                "ACCESS 12:46 PM - 1:41 PM (55 min)",
                "6˚ 1:48 PM - 3:20 PM (92 min)",
                "B˚ 3:27 PM - 4:24 PM (57 min)"
            ];
            break;
        case 5:
            times = [
                "A˚ 7:15 AM - 8:23 AM (68 min)",
                "1˚ 8:30 AM - 9:27 AM (57 min)",
                "2˚ 9:34 AM - 10:31 AM (57 min)",
                "Brunch 10:31 AM - 10:36 AM (5 min)",
                "3˚ 10:43 AM - 11:40 AM (57 min)",
                "4˚ 11:47 AM - 12:44 PM (57 min)",
                "Lunch 12:44 PM - 1:14 PM (30 min)",
                "5˚ 1:21 PM - 2:18 PM (57 min)",
                "6˚ 2:25 PM - 3:22 PM (57 min)",
                "B˚ 3:29 PM - 4:26 PM (57 min)"
            ];
            break;
        default:
            scheduleText = "No schedule available for today.";
            break;
    }
    
    // Update the schedule text and times
    scheduleText.innerText = "Schedule for Today";
    scheduleTimes = times.map(time => `<li style='list-style-type: none; margin-right: 219px'>${time}</li>`).join("");
    
    // Update the schedule elements
    scheduleText.innerText = scheduleText;
    scheduleList.innerHTML = scheduleTimes;

    var absentStudents = [];
    var presentStudents = [];

    teacher.periods[period].students.forEach((student) => {
        let fullName = student.first_name + ' ' + student.last_name;
        if (student.attendance == 'absent') {
            absentStudents.push(fullName);
        } else if (student.attendance == 'present') {
            presentStudents.push(fullName);
        }
    });

    var element_of_absent_students = document.getElementById('absent-students');
    var element_of_present_students = document.getElementById('present-students');

    element_of_absent_students.innerHTML = '<strong>Absent Students:</strong><br>' + absentStudents.join('<br>');
    element_of_present_students.innerHTML = '<strong>Present Students:</strong><br>' + presentStudents.join('<br>');
    
}

function updateLocalStorage() {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teachers[JSON.parse(localStorage.getItem('teacher'))] = teacher;
    localStorage.setItem('teachers', JSON.stringify(teachers));
}