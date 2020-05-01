const auth = firebase.auth();
let result, selectedFile, field1, recordId;

var seatPlanRef = firebase.database().ref('seatPlan');
const storageService = firebase.storage();
const storageRef = storageService.ref();
const fileSubmit = document.querySelector('#fileSubmit');
const submitformData = document.querySelector('#submitformData');

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    fileSubmit.addEventListener('change', handleFileUploadChange);
    submitformData.addEventListener('click', submitForm);

    displaySeatPlan();

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

function displaySeatPlan() {
  seatPlanRef.on('value', data, error);
}

function data(snapshot) {
  // console.log('values are');
  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  result = Object.keys(allDataObj);

  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  if(allDataArr.length > 0) {
    let j = 0;
    $('#tableBody').empty()
    for(var i=0; i < allDataArr.length; i++) {
      // console.log(allDataArr);
      let docId = allDataArr[i][0];
      // console.log(docId);
      
      let title = allDataArr[i][1].title;
      let seatPlanFile = allDataArr[i][1].seatPlanFile
      // console.log(seatPlanFile);
      
      j++;
      $('#tableBody').append('<tr>    <td>'+ j + '</td>    <td>'+ title +'</td>    <td>      <button onclick="tableValues(); downloadFile()" class="btn btn-info btn-sm">   Download    <i class="fa fa-cloud-download"></i>    </button>     <button onclick="tableValues(); deleteFile()" class="btn btn-danger btn-sm">  <i class="fa fa-trash"></i>  </button> <p style="display:none">'+ seatPlanFile +'</td>  </tr>'
      );
    }
  } else {
    $('#tableBody').empty();
    $('#tableBody').append('<h3 class="text-center">No Record Added</h3>');
  }
  
}

function error(err) {
  console.log(err);
}

function tableValues() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').eq(2).text();
    field1 = field1.toString();
    field1 = field1.substring(17);
    field1 = field1.trim();
    recordId = field1.substring(9,29);
    recordId = recordId.trim();
    // console.log(recordId);
    // console.log(field1);
  });
}

function downloadFile() {
  setTimeout(() => {
    storageRef.child(field1).getDownloadURL()
    .then(function(url) {
      // console.log(url);
      window.open(url);
      console.log("file Downloading");
    })
    .catch(err => console.log(err));
  },200);
  
}

function deleteFile() {
  setTimeout(() => {
    // for(var i = 0; i < result.length; i++) {
    //   var k = result[i];
    //   if(recordId === k) {
    //     console.log(k);
    //     console.log(recordId);
    //     // addExamRef.child(recordId).remove();
    //   } else {
    //     console.log("Not SAME");
    //     console.log(k);
    //     console.log(recordId);
    //   }
    // }
    storageService.ref().child(field1).delete().then(function() {
      // File deleted successfully
      console.log('File Deleted');
      seatPlanRef.child(recordId).remove().then(() => {
        // console.log(addExamRef.child(recordId));
        console.log('record deleted!!');})
    }).catch(function(error) {
      console.log(error);
    });
  },200);
}


function submitForm() {
  // e.preventDefault();

  let title = getValue('title');
  title = title.charAt(0).toUpperCase() + title.slice(1);
  const seatPlanPush = seatPlanRef.push();
  const key = seatPlanPush.getKey();
  const seatPlanFile = `seatPlan/${key}__${selectedFile.name}`;
  // saving values in firebase
  seatPlanData = {
    title: title,
    seatPlanFile : seatPlanFile
  };

  seatPlanPush.set(seatPlanData);
  console.log("Saving of data done");

  storageService.ref(`seatPlan/${key}__${selectedFile.name}`).put(selectedFile);
  console.log('File uploaded');
}

function getValue(id) {
  return document.getElementById(id).value;
}


function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  console.log(e.target.files);
  // console.log(selectedFile);

}



// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
