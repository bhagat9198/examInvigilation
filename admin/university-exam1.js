const auth = firebase.auth();

var universityExam =  document.getElementById('universityExam');
var fileSubmit = document.getElementById('fileSubmit');
var universityExamRef = firebase.database().ref('universityExam');
const storageService = firebase.storage();
const storageRef = storageService.ref();

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    displayUniversityExam();
    fileSubmit.addEventListener('change', uploadFile);
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
  universityExamRef.on('value', data, error);
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
    let branch = allDataArr[i][1].title;
    let fileName = allDataArr[i][1].fileUploaded;
    // deleteFileName = fileName;
    // console.log(deleteFileName);
    $('#tableBody').append('<tr>        <td>'+ branch +'</td>         <td>            <button  onclick="deleteFile()" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button> <p style="display:none">'+ fileName +'</p>       </td>      </tr>'
    );
  }
}

function deleteFile() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').text();
    field1 = field1.toString();
    field1 = field1.substring(10);
    field1 = field1.trim();
    recordId = field1.substring(16,36);
    recordId = recordId.trim();
    console.log(recordId);
    console.log(field1);
  });
  setTimeout(() => {
    storageRef.child(field1).delete().then(function() {
      // File deleted successfully
      console.log('File Deleted');
      universityExamRef.child(recordId).remove().then(() => {
        console.log('record deleted!!');})
    }).catch(function(error) {
      console.log(error);
    });
  },200);
}


function submitForm(e) {
  e.preventDefault();

  let title = getValue('title');
  title = title.charAt(0).toUpperCase() + title.slice(1);

  const universityExamPush = universityExamRef.push();
  const key = universityExamPush.getKey();
  // console.log(key);

  // saving values in firebase
  const data = {
    title: title,
    fileUploaded: 'universityExams/'+key +'__'+selectedFile.name
  };

  universityExamPush.set(data);
  console.log("saving of data done");

  // saving the file
  // console.log(selectedFile);
  // creating storage place
  const storageService = firebase.storage();
  // const storageRef = storageService.ref();
  // changing the anme of the file while uploading
  //create a child directory called images, and place the file inside this directory
  storageService.ref(`universityExams/${key}__${selectedFile.name}`).put(selectedFile);

  // showing alert
  // var alert = document.getElementById('alert');
  // alert.style.display = 'block';

  // clearing alert
  // setTimeout(()=>{
  //   alert.style.display = 'none';
  // },2000);

  // clearing form data
  universityExam.reset();
}

function getValue(id) {
  return document.getElementById(id).value;
}

var selectedFile;
function uploadFile(e) {
  selectedFile = e.target.files[0];
  console.log(selectedFile);
  universityExam.addEventListener('submit', submitForm);

}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
