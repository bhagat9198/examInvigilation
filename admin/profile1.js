//
// const addAdmin = document.getElementById('addAdmin');
// const addAdminRef = firebase.database().ref('addAdim');

// function submitForm(e) {
//   e.preventDefault()
//
//   name = getValue('name');
//   email = getValue('email');
//   password = getValue('password');
//
//   const data = {
//     name: name,
//     email: email,
//     password: password
//   }
//
//   const addAdimPush = addAdminRef.push();
//   addAdimPush.set(data);
//   console.log('all data got submited');
//
// }
//
// function getValue(id) {
//   return document.getElementById(id).value;
// }
//
// addAdmin.addEventListener('submit', submitForm);


// displaying all the admins

// addAdminRef.on('value', data, error);
//
// function data(snapshot) {
//   const allDataObj = snapshot.val();
//   const allDataArr = Object.entries(allDataObj);
//   // console.log(allDataArr);
//
//   for(let data of allDataArr) {
//     let i = 1;
//     // console.log(data);
//     $('#tableBody').append(
//       '<tr>      <td>' + i + '</td>      <td>' + data[1].name + '</td>      <td><button class="btn btn-danger">Delete <span class="fa fa-trash"></span></button></td>    </tr>'
//     );
//     i++;
//   }
// }
//
// function error(err) {
//   console.log(err);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////
// console.log('ui js');

// setup admins
const displayingAdmins = (data) => {
  // console.log(data);
  if (data.length) {
    let html = '';
    let i = 0;
    data.forEach(doc => {
      i++;
      const admin = doc.data();
      const tr = `
      <tr>
        <td>${i}</td>
        <td>${admin.name}</td>
      </tr>
      `;
      html += tr;
    });
    tableBody.innerHTML = html
  } else {
    tableBody.innerHTML = '<h5 class="center-align">No admin registered</h5>';
  }
};

const adminInfo = (data, uid) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      // console.log(doc.id);
      if(doc.id == uid) {
        const admin = doc.data();
        const adminName = `<p>${admin.name}</p>`;
        const adminEmail = `<p>${admin.email}</p>`;

        document.querySelector('#adminName').innerHTML = adminName;
        document.querySelector('#adminEmail').innerHTML = adminEmail;

      }
    });
  }
};
