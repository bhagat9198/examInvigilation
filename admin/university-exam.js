
var universityExam =  document.getElementById('universityExam');
var fileSubmit = document.getElementById('fileSubmit');

function submitForm(e) {
  e.preventDefault();

  const title = getValue('title');

  var universityExamRef = firebase.database().ref('universityExam');
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

fileSubmit.addEventListener('change', uploadFile);