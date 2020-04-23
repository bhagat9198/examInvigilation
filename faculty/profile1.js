const auth = firebase.auth();
const allFacultyRef = firebase.database().ref('addFaculty');
const updatePassSubmit = document.querySelector('#updatePassSubmit');
const updateForm = document.querySelector('#updateForm');
let email;

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    email = user.email;
    allFacultyRef.on('value', data, error);
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

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const updatePass = updateForm.querySelector('#updatedUserPassword').value;
  // console.log(updatePass);

  const cuser = firebase.auth().currentUser;
  cuser.updatePassword(updatePass).then(function() {
    // Update successful.
    const htmlTxt = `<p>Successfuly password reset</p>`;
    document.querySelector('#alert').innerHTML = htmlTxt;
    document.querySelector('#alert').style.display = 'block';
    document.querySelector('#alert').style.color = 'green';
    console.log('updating done');
    
  }).catch(function(error) {
    const htmlTxt = ` <p>${error.message}</p> `;
    document.querySelector('#alert').innerHTML = htmlTxt;
    document.querySelector('#alert').style.display = 'block';
    document.querySelector('#alert').style.color = 'red';
  });
});

function data(snapshot) {
  const allDataObj = snapshot.val();

  var allDataArr = Object.entries(allDataObj);

  for(var i=0; i < allDataArr.length; i++) {
    let userEmail = allDataArr[i][1].email;
    if(userEmail === email) {
      const name = allDataArr[i][1].name;
      document.querySelector('#currentUserName').innerHTML = `<p>${name}</p>`;
      document.querySelector('#currentUserEmail').innerHTML = `<p>${email}</p>`;
    }
  }
}

function error(err) {
  console.log(err);
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
