const auth = firebase.auth();

var shortageAttendence =  document.getElementById('shortageAttendence');
var fileSubmit = document.getElementById('fileSubmit');
var selectedFile;
var shortageAttendenceRef = firebase.database().ref('shortageAttendence');
const storageService = firebase.storage();
const storageRef = storageService.ref();

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    fileSubmit.addEventListener('change', uploadFile);
    displayAttendence();
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

function displayAttendence() {
  shortageAttendenceRef.on('value', data, error);
}

function error(err) {
  console.log(err);
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

function deleteFile() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').text();
    field1 = field1.toString();
    field1 = field1.substring(17);
    field1 = field1.trim();
    recordId = field1.substring(19,39);
    recordId = recordId.trim();
    console.log(recordId);
    // console.log(field1);
  });
  setTimeout(() => {
    storageRef.child(field1).delete().then(function() {
      // File deleted successfully
      console.log('File Deleted');
      shortageAttendenceRef.child(recordId).remove().then(() => {
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

  const shortageAttendencePush = shortageAttendenceRef.push();
  const key = shortageAttendencePush.getKey();

  // saving values in firebase
  const data = {
    branch: branch,
    semester: semester,
    fileUploaded: 'shortageAttendence/'+key +'__'+selectedFile.name
  };

  shortageAttendencePush.set(data);
  console.log("saving of data done");

  const storageService = firebase.storage();
  storageService.ref(`shortageAttendence/${key}__${selectedFile.name}`).put(selectedFile);
  console.log("saving of file done");

  // showing alert
  // var alert = document.getElementById('alert');
  // alert.style.display = 'block';

  // clearing alert
  // setTimeout(()=>{
  //   alert.style.display = 'none';
  // },2000);

  // clearing form data
  shortageAttendence.reset();
}

function getValue(id) {
  return document.getElementById(id).value;
}

function uploadFile(e) {
  selectedFile = e.target.files[0];
  // console.log(selectedFile);
  shortageAttendence.addEventListener('submit', submitForm);
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
