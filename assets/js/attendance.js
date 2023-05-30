var teacher = {};
var period = 0;

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

function showStudents(newPeriod) {
    period = newPeriod;

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

    // var element_of_absent_students = document.getElementById('absent-students');
    // var element_of_present_students = document.getElementById('present-students');

    // element_of_absent_students.innerHTML = '<strong>Absent Students:</strong><br>' + absentStudents.join('<br>');
    // element_of_present_students.innerHTML = '<strong>Present Students:</strong><br>' + presentStudents.join('<br>');
    
    var days = [
        [['08:30', '9:27'], ['09:34', '10:31'], ['10:43','11:40'], ['11:47','12:44'], ['13:21','14:18'], ['14:25','15:22']],
        [['08:30', '9:27'], ['09:34', '10:31'], ['10:43','11:40'], ['11:47','12:44'], ['13:21','14:18'], ['14:25','15:22']],
        [['08:50', '10:22'], ['08:50','10:22'], ['10:37','12:09'], ['10:37','12:09'], ['13:48','15:20'], ['13:48','15:20']],
        [['08:50', '10:22'], ['08:50','10:22'], ['10:37','12:09'], ['10:37','12:09'], ['13:48','15:20'], ['13:48','15:20']],
        [['08:30', '9:27'], ['09:34', '10:31'], ['10:43','11:40'], ['11:47','12:44'], ['13:21','14:18'], ['14:25','15:22']]
    ]
    let currentTime = new Date();
    var studentsText = document.getElementById('students');
    studentsText.innerHTML = '<strong>Students:</strong><br>';
    studentsText.innerHTML += absentStudents.map(student => student + ' <br>');
}

function updateLocalStorage() {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    teachers[JSON.parse(localStorage.getItem('teacher'))] = teacher;
    localStorage.setItem('teachers', JSON.stringify(teachers));
}

var html5QrcodeScanner;
      var scannerInitialized = false;

      function onScanSuccess(decodedText, decodedResult) {
//   console.log(`Code scanned = ${decodedText}`, decodedResult);

  // Find the student in the teacher's periods
  var students = teacher.periods[period].students;
  var scannedStudent = students.find(student => student.id === decodedText);

  if (scannedStudent) {
    var fullName = scannedStudent.first_name + ' ' + scannedStudent.last_name;

    // Update the attendance status if the student has not been scanned in yet
    if (scannedStudent.attendance == 'absent') {
        scannedStudent.attendance = 'present';
        scannedStudent.time_arrived = new Date();
        console.log(scannedStudent.id + '(' + scannedStudent.first_name + ' ' + scannedStudent.last_name + ') has arrived at ' + scannedStudent.time_arrived);
    }

    // Save the updated data to localStorage
      updateLocalStorage();
      showStudents(period);

    // Update the UI
    var presentStudents = document.getElementById('present-students');
    var absentStudents = document.getElementById('absent-students');

    // Remove the student from the absent students list if present
    // var absentStudentsList = Array.from(absentStudents.children);
    // var absentStudentItem = absentStudentsList.find(item => item.innerText === fullName);
    // if (absentStudentItem) {
    //   absentStudents.removeChild(absentStudentItem);
    // }

    // Add the student to the present students list if not already present
    // var presentStudentsList = Array.from(presentStudents.children);
    // var presentStudentItem = presentStudentsList.find(item => item.innerText === fullName);
    // if (!presentStudentItem) {
    //   var listItem = document.createElement('li');
    //   listItem.innerText = fullName;
    //   presentStudents.appendChild(listItem);
    // }
  }
}


      function initializeScanner() {
        // Initialize the physical wired scanner
        // Implement the code to connect to the scanner here
        // ...

        // Assuming the physical scanner triggers a scan event
        scanner.on('scan', function (barcodeData) {
          onScanSuccess(barcodeData.text, barcodeData.result);
        });

        scannerInitialized = true;
      }

      function checkTimeAndStartScanning() {
        var today = new Date();
        var dayOfWeek = today.getDay();
        var currentHour = today.getHours();
        var currentMinute = today.getMinutes();

        var schedule = {
          1: [
            { startHour: 8, startMinute: 35, endHour: 8, endMinute: 39 },
            { startHour: 8, startMinute: 40, endHour: 23, endMinute: 59 },
          ],
          2: [
            { startHour: 8, startMinute: 35, endHour: 8, endMinute: 39 },
            { startHour: 8, startMinute: 40, endHour: 9, endMinute: 49 },
          ],
          3: [
            { startHour: 8, startMinute: 35, endHour: 8, endMinute: 39 },
            { startHour: 8, startMinute: 40, endHour: 9, endMinute: 49 },
          ],
          4: [
            { startHour: 8, startMinute: 35, endHour: 8, endMinute: 39 },
            { startHour: 8, startMinute: 40, endHour: 9, endMinute: 49 },
          ],
          5: [
            { startHour: 8, startMinute: 35, endHour: 8, endMinute: 39 },
            { startHour: 8, startMinute: 40, endHour: 9, endMinute: 49 },
          ],
          6: [
            { startHour: 8, startMinute: 35, endHour: 8, endMinute: 39 },
            { startHour: 8, startMinute: 40, endHour: 9, endMinute: 49 },
          ],
        };

        if (dayOfWeek in schedule) {
          var timeSlots = schedule[dayOfWeek];
          var scanningAllowed = false;

          for (var i = 0; i < timeSlots.length; i++) {
            var { startHour, startMinute, endHour, endMinute } = timeSlots[i];
            var startTime = new Date();
            startTime.setHours(startHour);
            startTime.setMinutes(startMinute);
            var endTime = new Date();
            endTime.setHours(endHour);
            endTime.setMinutes(endMinute);

            //DELETE THIS
            scanningAllowed = true;
            if (today >= startTime && today <= endTime) {
              scanningAllowed = true;
              break;
            }
          }

          // ...

          if (scanningAllowed) {
          html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 400 });
          html5QrcodeScanner.render(onScanSuccess);

          // Calculate the remaining time until the next time slot ends
          var nextTimeSlot = timeSlots[i + 1];
          if (nextTimeSlot) {
            var nextEndTime = new Date();
            nextEndTime.setHours(nextTimeSlot.endHour);
            nextEndTime.setMinutes(nextTimeSlot.endMinute);
            var remainingTime = nextEndTime - today;

            // Reload the page after the remaining time to refresh the screen
            setTimeout(function () {
              location.href = location.href;
            }, remainingTime);
          }
        } else {
          alert("It isn't time to scan today.");
        }
        } else {
          alert("No scanning schedule available for today.");
        }
      }

      function showStudentIdInput() {
  var startScanningButton = document.getElementById('start-scanning');
  var studentIdInput = document.getElementById('student-id-input');
  startScanningButton.style.display = 'none';
  studentIdInput.style.display = 'block';
}

function processStudentId() {
  var studentIdInput = document.getElementById('student-id');
  var studentId = studentIdInput.value.trim();

  if (studentId !== '') {
    console.log('Entered student ID:', studentId);
    // Process the student ID as needed (e.g., check attendance, update UI)

    // Clear the student ID input field
    studentIdInput.value = '';
  } else {
    alert('Please enter a valid student ID.');
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var startScanningButton = document.getElementById('start-scanning');
  var enterIdButton = document.getElementById('enter-id-button');

  startScanningButton.addEventListener('click', showStudentIdInput);
  enterIdButton.addEventListener('click', processStudentId);
});









      window.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.button.next').addEventListener('click', function (event) {
          event.preventDefault();
          checkTimeAndStartScanning();
        });
      });

