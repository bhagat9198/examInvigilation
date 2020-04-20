
var clearAttendence =  document.getElementById('clearAttendence');
var fileSubmit = document.getElementById('fileSubmit');
var selectedFile;

function submitForm(e) {
  e.preventDefault();

  const branch = getValue('branch');
  const semester = getValue('semester');

  var clearAttendenceRef = firebase.database().ref('clearAttendence');
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

fileSubmit.addEventListener('change', uploadFile);