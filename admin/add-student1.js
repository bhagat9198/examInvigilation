const auth = firebase.auth();

var addStudent =  document.getElementById('addStudent');

auth.onAuthStateChanged(user => {
  if(user) {
    addStudent.addEventListener('submit', submitForm);
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
});

function submitForm(e) {
  e.preventDefault();

  const name = getValue('name');
  const branch = getValue('branch');
  const semester = getValue('semester');
  const usn = getValue('usn');
  const email = getValue('email');
  const password = getValue('password');

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // saving values in firebase
    // var addStudentRef = firebase.database().ref('addStudent');
    // changing the db
    var addStudentRef = firebase.database().ref('dupStudent');
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
  }).then(() => {
    const htmlTxt = `    <p>Successfuly Signed Up</p>`;
    addStudent.querySelector('#alert').innerHTML = htmlTxt;
    addStudent.querySelector('#alert').style.display = 'block';
    addStudent.querySelector('#alert').style.color = 'green';
    addStudent.reset();
  }).catch(err => {
    const htmlTxt = ` <p>${err.message}</p> `;
    addStudent.querySelector('#alert').innerHTML = htmlTxt;
    addStudent.querySelector('#alert').style.display = 'block';
    addStudent.querySelector('#alert').style.color = 'red';
  });
  function getValue(id) {
    return document.getElementById(id).value;
  }
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
