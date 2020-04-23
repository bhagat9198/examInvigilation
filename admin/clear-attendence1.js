const auth = firebase.auth();

const clearAttendence =  document.getElementById('clearAttendence');
const fileSubmit = document.getElementById('fileSubmit');
let selectedFile, deleteFileName, recordId, result;
const clearAttendenceRef = firebase.database().ref('clearAttendence');
const storageService = firebase.storage();
const storageRef = storageService.ref();

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    fileSubmit.addEventListener('change', uploadFile);
    displayAttendence()
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

function displayAttendence() {
  clearAttendenceRef.on('value', data, error);
}

function data(snapshot) {
  // console.log('values are');
  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  result = Object.keys(allDataObj);

  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  $('#tableBody').empty()
  for(var i=0; i < allDataArr.length; i++) {
    // console.log(allDataArr);
    let branch = allDataArr[i][1].branch;
    let semester = allDataArr[i][1].semester;
    let fileName = allDataArr[i][1].fileUploaded;
    // deleteFileName = fileName;
    // console.log(deleteFileName);
    $('#tableBody').append('<tr>        <td>'+ branch +'</td>        <TD>'+ semester +'</TD>        <td>            <button  onclick="deleteFile()" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button> <p style="display:none">'+ fileName +'</p>       </td>      </tr>'
    );
  }
}

function error(err) {
  console.log(err);
}

function deleteFile() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').text();
    field1 = field1.toString();
    field1 = field1.substring(17);
    field1 = field1.trim();
    recordId = field1.substring(16,36);
    recordId = recordId.trim();
    // console.log(recordId);
    // console.log(field1);
  });
  setTimeout(() => {

    // for(var i = 0; i < result.length; i++) {
    //   var k = result[i];
      // if(recordId === k) {
      //   console.log(k);
      //   console.log(recordId);
      //   clearAttendenceRef.child(recordId).remove();
      // } else {
      //   console.log("Not SAME");
      //   console.log(k);
      //   console.log(recordId);
      // }
    // }
    storageRef.child(field1).delete().then(function() {
      // File deleted successfully
      console.log('File Deleted');
      clearAttendenceRef.child(recordId).remove().then(() => {
        console.log(clearAttendenceRef.child(recordId));
        console.log('record deleted!!');})
    }).catch(function(error) {
      console.log(error);
    });
  },200);
}

function submitForm(e) {
  e.preventDefault();

  const branch = getValue('branch');
  const semester = getValue('semester');

  const clearAttendencePush = clearAttendenceRef.push();
  const key = clearAttendencePush.getKey();

  // saving values in firebase
  const data = {
    branch: branch,
    semester: semester,
    fileUploaded: 'clearAttendence/'+key +'__'+selectedFile.name
  };

  clearAttendencePush.set(data);
  console.log("saving of data done");

  const storageService = firebase.storage();
  storageService.ref(`clearAttendence/${key}__${selectedFile.name}`).put(selectedFile);
  console.log("saving of file done");

  // showing alert
  // var alert = document.getElementById('alert');
  // alert.style.display = 'block';

  // clearing alert
  // setTimeout(()=>{
  //   alert.style.display = 'none';
  // },2000);

  // clearing form data
  clearAttendence.reset();
}

function getValue(id) {
  return document.getElementById(id).value;
}

function uploadFile(e) {
  selectedFile = e.target.files[0];
  // console.log(selectedFile);
  clearAttendence.addEventListener('submit', submitForm);
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
