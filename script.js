var CONSTANTS = {
  STUDENTS_QTY: 5,
  MIN_GRADE: 1,
  MAX_GRADE: 6,
  GRADES_QTY: 10,
}

function Student (StudentName, StudentSurname, StudentGrades) {
  this.name = StudentName;
  this.surname = StudentSurname;
  this.grades = StudentGrades;
  this.average = 0;
}

function calculateAverageGradesByStudent(student) {
  var sum = 0;

  for (var i = 0; i < student.grades.length; i++) {
    sum += +student.grades[i];
  }
    
   return (sum / student.grades.length).toFixed(2);
}

function getRaport () {
  for(var i = 0; i < CONSTANTS.STUDENTS_QTY; i++) {
    console.log((i + 1) + ". " + students[i].name + " " + students[i].surname + " - srednia ocen = " + students[i].average)
  }
}

// interface
function updateTable(record) {
  var $tableBody = $('#students tbody'),
      newRecord;
  
  newRecord = '<tr> \
    <td>' + students.length + '</td> \
    <td>' + record.name + '</td> \
    <td>' + record.surname + '</td> \
    <td>' + record.average + '</td> \
  </tr>';
  
  $tableBody.append($(newRecord));
}

function isFormValid() {
  var error = false;
  
  $('form input').each(function(index, element) {
    if (!$(element).val()) {
      $(element).addClass('error');
      error = true;
    } else {
      $(element).removeClass('error');
    }    
  });
  
  return error ? false : true;
}


// main
var $createButton = $('#create'),
    students = [];

$createButton.click(function(event) {
  // anulowanie domyślnego zachowania elementu
  // tutaj -> wysłanie formularza
  event.preventDefault();
  
  var $name = $('#name'),
      $surname = $('#surname'),
      $grades = $('#grades'),
      student;
  
  if (isFormValid()) {    
    student = new Student($name.val(), $surname.val(), $grades.val().trim().split(' '));
    student.average = calculateAverageGradesByStudent(student);

    students.push(student);
    updateTable(student);
  }
});


$('#grades').keyup(function() {
  var inputValue = $(this).val(),
      lastChar = inputValue.slice(-1);
  if (lastChar >= CONSTANTS.MIN_GRADE && lastChar <= CONSTANTS.MAX_GRADE) {
    $(this).val(inputValue + ' ');    
  } else {
    $(this).val(inputValue.slice(0, -1));    
  }
});