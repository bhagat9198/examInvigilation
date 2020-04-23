console.log("Auth file");

const auth = firebase.auth();
// console.log(auth);
const db = firebase.firestore();
var currentUser = firebase.auth().currentUser;

const addAdmin = document.querySelector('#addAdmin');
// const updateAdminInfo = document.querySelector('#updateAdminInfo');

const updatePassSubmit = document.querySelector('#updatePassSubmit');
updatePassSubmit.addEventListener('click', () => {
  if(currentUser) {
    var newPassword = document.querySelector('#updatePass').value;
    currentUser.updatePassword(newPassword).then(function() {
      // const htmlTxt = `    <p>Successfuly password reset</p>`;
      // addAdmin.querySelector('#alert').innerHTML = htmlTxt;
      // addAdmin.querySelector('#alert').style.display = 'block';
      // addAdmin.querySelector('#alert').style.color = 'green';
      console.log('updating done');
      return auth.signOut();
    }).then(() => {
      location = '../index.html';
      console.log('logout done');
    }).catch(function(err) {
      const htmlTxt = ` <p>${err.message}</p> `;
      updateAdminInfo.querySelector('#alert').innerHTML = htmlTxt;
      updateAdminInfo.querySelector('#alert').style.display = 'block';
      updateAdminInfo.querySelector('#alert').style.color = 'red';
    });
  }

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
