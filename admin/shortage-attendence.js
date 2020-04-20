
var shortageAttendence =  document.getElementById('shortageAttendence');
var fileSubmit = document.getElementById('fileSubmit');
var selectedFile;

function submitForm(e) {
  e.preventDefault();

  const branch = getValue('branch');
  const semester = getValue('semester');

  var shortageAttendenceRef = firebase.database().ref('shortageAttendence');
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

fileSubmit.addEventListener('change', uploadFile);