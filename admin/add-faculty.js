
var addFaculty = document.getElementById('addFaculty');

function submitForm(e) {
  e.preventDefault();

  // extracting the values
  const name = getValues('name');
  const email = getValues('email');
  const password = getValues('password'); 


  // saving values in firebase
  // making the reffernce
  var addFacultyRef = firebase.database().ref('addFaculty');
  // data to be saved
  const data = {
    name:name,
    email: email,
    password:password
  };
  // pushing the data to firbase
  const addFacultyPush = addFacultyRef.push();

  addFacultyPush.set(data);
  console.log("saving of data done");

  // showing alert
  // var alert = document.getElementById('alert');
  // alert.style.display = 'block';

  // clearing alert
  // setTimeout(()=>{
  //   alert.style.display = 'none';
  // },2000);

  // clearing form data
  addFaculty.reset();

}

function getValues(id) {
  return document.getElementById(id).value;
}

addFaculty.addEventListener('submit', submitForm);








