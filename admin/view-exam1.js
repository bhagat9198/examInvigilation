const auth = firebase.auth();

let downloadFileName, field1 ;

const allExamRef = firebase.database().ref('addExam');
const storageService = firebase.storage();
const storageRef = storageService.ref();

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    allExamRef.on('value', data, error);
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

function data(snapshot) {
  // console.log('values are');

  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);

  for(var i=0; i < allDataArr.length; i++) {
    let title = allDataArr[i][1].title;
    let fileName = allDataArr[i][1].examFile;
    // fileName1 = fileName.toString();
    // console.log(fileName1);
    let recordId = allDataArr[i][0];
    // console.log(recordId);
    downloadFileName = fileName;
    // console.log(typeof(downloadFileName));
    $('#tableBody').append(
      '<tr >      <td>' + (i+1) + '</td>      <td>' + title + '</td>      <td style="color:white" >        <button id="'+ i +'1" fileData="'+ fileName +'" onclick="downloadFile()" class="btn btn-info">Download<span class="fa fa-cloud-download"></span></button> '+ fileName +'    </td>    </tr>'
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
    field1 = field1.substring(17);
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
