const auth = firebase.auth();
var addExamRef = firebase.database().ref('addExam');
var universityExamRef = firebase.database().ref('universityExam');
const storageService = firebase.storage();
const storageRef = storageService.ref();

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    displayExam();
    displayUniversityExam();

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

function displayUniversityExam() {
  universityExamRef.on('value', dataUniversity, errorUniversity);
}

function errorUniversity(err) {
  console.log(err);
}

$('#tableBodyUniversity').empty()
function dataUniversity(snapshot) {
  // console.log('values are');
  let allDataObjUniversity = snapshot.val();

  var allDataArrUniversity = Object.entries(allDataObjUniversity);
  let j = 1;
  for(var i=0; i < allDataArrUniversity.length; i++) {
    // console.log(allDataArr);
    let title = allDataArrUniversity[i][1].title;
    let fileUploaded = allDataArrUniversity[i][1].fileUploaded;

    // deleteFileName = fileName;
    // console.log(deleteFileName);

    $('#tableBodyUniversity').append('<tr>    <td>'+ j +'</td>    <td>'+ title +'</td>    <td>        <button class="btn btn-warning" onclick="downloadFile()" >Download <i class="fa fa-cloud-download"></i> </button>        <p style="display:none">'+ fileUploaded +'</p>    </td>  </tr>'
    );
    j++;
  }
}

function downloadFile() {
  let fieldUniversity;
  $('#tableBodyUniversity').find('tr').click(function(){
    fieldUniversity =$(this).find('td').eq(2).text();
    fieldUniversity = fieldUniversity.toString();
    fieldUniversity = fieldUniversity.substring(17);
    fieldUniversity = fieldUniversity.trim()
    // console.log(fieldUniversity);
  });
  setTimeout(() => {
    // console.log(fieldUniversity);
    storageRef.child(fieldUniversity).getDownloadURL()
    .then(function(url) {
      console.log(url);
      window.open(url);
      console.log("file Downloading");
    })
    .catch(err => console.log(err));
  },200);
}

function displayExam() {
  addExamRef.on('value', data, error);
}

function data(snapshot) {
  // console.log('values are');
  allDataObj = snapshot.val();
  // console.log(allDataObj);
  result = Object.keys(allDataObj);

  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  let j = 1;
  $('#examTableBody').empty()
  for(var i=0; i < allDataArr.length; i++) {
    // console.log(allDataArr);
    let recordId = allDataArr[i][0];
    // console.log(recordId);
    let facultyRequire = allDataArr[i][1].facultyRequire;
    let examTime = allDataArr[i][1].examTime;
    let examDate = allDataArr[i][1].examDate;
    // deleteFileName = fileName;
    // console.log(deleteFileName);
    $('#examTableBody').append('<tr>      <td>'+ j +'</td>      <td>'+ examDate +'</td>      <td>'+ examTime +'</td></tr>'
    );
    j++;
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
