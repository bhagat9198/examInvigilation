var addExam =  document.getElementById('addExam');

function submitForm(e) {
  e.preventDefault();

  const title = getValue('title');
  const branch = getValue('branch');
  const semester = getValue('semester');
  const examDate = getValue('examDate');
  const examTime = getValue('examTime');


  // saving values in firebase
  var addExamRef = firebase.database().ref('addExam');
  const data = {
    title: title,
    branch: branch,
    semester: semester,
    examDate: examDate,
    examTime: examTime
  };

  const addExamPush = addExamRef.push();
  addExamPush.set(data);
  console.log("saving of data done");

  
  // showing alert
  // var alert = document.getElementById('alert');
  // alert.style.display = 'block';

  // clearing alert
  // setTimeout(()=>{
  //   alert.style.display = 'none';
  // },2000);

  // clearing form data
  addExam.reset();
}

function getValue(id) {
  return document.getElementById(id).value;
}

addExam.addEventListener('submit', submitForm);
