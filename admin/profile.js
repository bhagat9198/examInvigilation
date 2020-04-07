const addAdmin = document.getElementById('addAdmin');

function submitForm(e) {
  e.preventDefault()

  name = getValue('name');
  email = getValue('email');
  password = getValue('password');

  const data = {
    name: name,
    email: email,
    password: password
  }

  const addAdminRef = firebase.database().ref('addAdim');
  const addAdimPush = addAdminRef.push();
  addAdimPush.set(data);
  console.log('all data got submited');
  
}

function getValue(id) {
  return document.getElementById(id).value;
}


addAdmin.addEventListener('submit', submitForm);