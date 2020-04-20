
var addStudent =  document.getElementById('addStudent');

function submitForm(e) {
  e.preventDefault();

  const name = getValue('name');
  const branch = getValue('branch');
  const semester = getValue('semester');
  const usn = getValue('usn');
  const email = getValue('email');
  const password = getValue('password');

  // saving values in firebase
  var addStudentRef = firebase.database().ref('addStudent');
  const data = {
    name: name,
    branch: branch,
    semester: semester,
    usn: usn,
    email: email,
    password: password
  };

  const addStudentPush = addStudentRef.push();
  addStudentPush.set(data);
  console.log("saving of data done");

  // showing alert
  // var alert = document.getElementById('alert');
  // alert.style.display = 'block';

  // clearing alert
  // setTimeout(()=>{
  //   alert.style.display = 'none';
  // },2000);

  // clearing form data
  addStudent.reset();
}

function getValue(id) {
  return document.getElementById(id).value;
}

addStudent.addEventListener('submit', submitForm);