const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user);
  } else {
    console.log(user);
  }
});


// login admin
const adminLoginForm = document.querySelector('#adminLoginForm');
adminLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = adminLoginForm['adminLoginEmail'].value;
  const password = adminLoginForm['adminLoginPassword'].value;
  // console.log(email, password);
  // log the user in
  const adminAlert = document.querySelector('#adminAlert');
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    const html = `<p>Login Successful</p>`;
    adminAlert.innerHTML = html;
    adminAlert.style.display = 'block';
    adminAlert.style.color = 'green';
    adminLoginForm.reset();
    location = './admin/home.html';
  }).catch(err => {
    const html = `<p>Login Failed <br> ${err.message}</p>`;
    adminAlert.innerHTML = html;
    adminAlert.style.display = 'block';
    adminAlert.style.color = 'red';
  });
});

// login admin
const facultyLoginForm = document.querySelector('#facultyLoginForm');
facultyLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = facultyLoginForm['facultyLoginEmail'].value;
  const password = facultyLoginForm['facultyLoginPassword'].value;
  // console.log(email, password);
  // log the user in
  const facultyAlert = document.querySelector('#facultyAlert');
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    const html = `<p>Login Successful</p>`;
    facultyAlert.innerHTML = html;
    facultyAlert.style.display = 'block';
    facultyAlert.style.color = 'green';
    facultyLoginForm.reset();
    location = './faculty/home.html';

  }).catch(err => {
    const html = `<p>Login Failed <br> ${err.message}</p>`;
    facultyAlert.innerHTML = html;
    facultyAlert.style.display = 'block';
    facultyAlert.style.color = 'red';
  });
});

// login admin
const studentLoginForm = document.querySelector('#studentLoginForm');
studentLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = studentLoginForm['studentLoginEmail'].value;
  const password = studentLoginForm['studentLoginPassword'].value;
  // console.log(email, password);
  // log the user in
  const studentAlert = document.querySelector('#adminAlert');
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    const html = `<p>Login Successful</p>`;
    studentAlert.innerHTML = html;
    studentAlert.style.display = 'block';
    studentAlert.style.color = 'green';
    studentLoginForm.reset();
    location = './student/home.html';

  }).catch(err => {
    const html = `<p>Login Failed <br> ${err.message}</p>`;
    studentAlert.innerHTML = html;
    studentAlert.style.display = 'block';
    studentAlert.style.color = 'red';
  });
});
