const auth = firebase.auth();

var addFaculty = document.getElementById('addFaculty');

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    addFaculty.addEventListener('submit', submitForm);

  } else {
    // console.log(user);
    const html = `
    <br>
    <div class="text-center">
    <h2>You are not LoggedIn</h2><br>
    <h3>Click <a href="../index.html">here </a>to signIn </h3>
    </div>
    `;
    document.querySelector('body').innerHTML = html;
  }
})

function submitForm(e) {
  e.preventDefault();

  // extracting the values
  const name = getValues('name');
  const email = getValues('email');
  const password = getValues('password');

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
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
  }).then(() => {
    const htmlTxt = `    <p>Successfuly Signed Up</p>`;
    addFaculty.querySelector('#alert').innerHTML = htmlTxt;
    addFaculty.querySelector('#alert').style.display = 'block';
    addFaculty.querySelector('#alert').style.color = 'green';
    addFaculty.reset();
  }).catch(err => {
    const htmlTxt = ` <p>${err.message}</p> `;
    addFaculty.querySelector('#alert').innerHTML = htmlTxt;
    addFaculty.querySelector('#alert').style.display = 'block';
    addFaculty.querySelector('#alert').style.color = 'red';
  });

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

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
