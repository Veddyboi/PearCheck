var teacher = {};
var students = {};

//test() runs when index.body loads
function test() {
    
    setTeacher({
        students: ["Alexis", "Ved", "Aayan"],
        password: "password1"
    });
    
    console.log("STUDENT LIST: \n" + studentsAsString());
}

//runs when seating.html loads

function startSeating() {
    setTeacher(localStorage.getItem("teacher"));
    console.log(studentsAsString());
}

function setTeacher(setTeacher) {
    teacher = setTeacher;
    console.log(JSON.stringify(teacher));
    teacher.students.forEach((name) => {
        students[name] = "absent";
    });
}

function studentsAsString() {
    var result;
    var json = JSON.stringify(students);
    var studentsAsString = json.substring(1, json.length - 1).split(",");

    result = "{\n";
    studentsAsString.forEach((student) => {
        result += student + "\n";
    });
    result += "}";
    return result;
}