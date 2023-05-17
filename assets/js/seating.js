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

function setTeacher(setTeacher) {
    teacher = setTeacher;
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