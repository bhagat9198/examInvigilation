console.log("Auth file");

const auth = firebase.auth();
// console.log(auth);
const db = firebase.firestore();
var currentUser = firebase.auth().currentUser;
const updatePassSubmit = document.querySelector('#updatePassSubmit');
const updateAdminForm = document.querySelector('#updateAdminForm');
// const updateAdminInfo = document.querySelector('#updateAdminInfo');

updateAdminForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const updateAdminOldPassword = updateAdminForm.querySelector('#updateAdminOldPassword').value;
  // console.log(updatePass);
  const cadminEmail = updateAdminForm.querySelector('#adminEmail').textContent;
  
  auth.signInWithEmailAndPassword(cadminEmail, updateAdminOldPassword).then((cred) => {
    console.log(cadminEmail, updateAdminOldPassword);
    
    const updateAdminPassword = updateAdminForm.querySelector('#updateAdminPassword').value;
    const cuser = firebase.auth().currentUser;
    return cuser.updatePassword(updateAdminPassword)
  })
  .then( updateAdminPassword => {
    console.log(updateAdminPassword);
    
    // Update successful.
    const htmlTxt = `<p>Successfuly password reset</p>`;
    updateAdminForm.querySelector('#alert').innerHTML = htmlTxt;
    updateAdminForm.querySelector('#alert').style.display = 'block';
    updateAdminForm.querySelector('#alert').style.color = 'green';
    console.log('updating done');
  }) 
  .catch(function(error) {
    const htmlTxt = ` <p>${error.message}</p> `;
    updateAdminForm.querySelector('#alert').innerHTML = htmlTxt;
    updateAdminForm.querySelector('#alert').style.display = 'block';
    updateAdminForm.querySelector('#alert').style.color = 'red';
  });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('admin').onSnapshot(snapshot => {
      // console.log(snapshot);
      // console.log(snapshot.docs);
      displayingAdmins(snapshot.docs);
      adminInfo(snapshot.docs, user.uid);
    }, err => console.log(err.message));
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

addAdmin.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = addAdmin['email'].value;
  const password = addAdmin['password'].value;
  // console.log(email, password);

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user);
    return db.collection('admin').doc(cred.user.uid).set({
      name: addAdmin['name'].value,
      email: addAdmin['email'].value
    });
  }).then(() => {
    const htmlTxt = `    <p>Successfuly Signed Up</p>`;
    addAdmin.querySelector('#alert').innerHTML = htmlTxt;
    addAdmin.querySelector('#alert').style.display = 'block';
    addAdmin.querySelector('#alert').style.color = 'green';
    addAdmin.reset();
  }).catch(err => {
    const htmlTxt = ` <p>${err.message}</p> `;
    addAdmin.querySelector('#alert').innerHTML = htmlTxt;
    addAdmin.querySelector('#alert').style.display = 'block';
    addAdmin.querySelector('#alert').style.color = 'red';
  })
})

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
