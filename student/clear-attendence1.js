const auth = firebase.auth();
const clearAttendenceRef = firebase.database().ref('clearAttendence');
const storageService = firebase.storage();
const storageRef = storageService.ref();
let selectedFile, deleteFileName, recordId, result;

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
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
  $('#tableBody').empty();
  for(var i=0; i < allDataArr.length; i++) {
    // console.log(allDataArr);
    let branch = allDataArr[i][1].branch;
    let semester = allDataArr[i][1].semester;
    let fileName = allDataArr[i][1].fileUploaded;
    // deleteFileName = fileName;
    // console.log(deleteFileName);
    $('#tableBody').append('<tr>    <td>'+ branch +'</td>    <TD>'+ semester +'</TD>    <td >      <button onclick="downloadFile()" class="btn btn-info">Download       <span class="fa fa-cloud-download"></span></button><p style="display:none">'+ fileName+'</p>   </td>  </tr>'
    );
  }
}
function error(err) {
  console.log(err);
}

function downloadFile() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').eq(2).text();
    field1 = field1.toString();
    field1 = field1.substring(14);
    field1 = field1.trim()
    // console.log(field1);
  });
  setTimeout(() => {
    storageRef.child(field1).getDownloadURL()
    .then(function(url) {
      console.log(url);
      window.open(url);
      console.log("file Downloading");
    })
    .catch(err => console.log(err));
  },200);
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
