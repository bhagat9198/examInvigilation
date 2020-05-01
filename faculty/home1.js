const auth = firebase.auth();

var addExamRef = firebase.database().ref('addExam');
var universityExamRef = firebase.database().ref('universityExam'); 
const seatPlanRef = firebase.database().ref('seatPlan');
const storageService = firebase.storage();
const storageRef = storageService.ref();
let result, allDataObj;

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    displayExam();
    displayUniversityExam();
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
});

function displaySeatPlan() {
  seatPlanRef.on('value', dataSeatPlan, errorSeatPlan);
}

function errorSeatPlan(err) {
  console.log(err);
}

function dataSeatPlan(snapshot) {
  let allDataObjSeatPlan = snapshot.val();

  var allDataArrSeatPlan = Object.entries(allDataObjSeatPlan);

  if(allDataArrSeatPlan.length > 0) {
    let j = 1;
    $('#tableBodySeatPlan').empty();
    for(var i=0; i < allDataArrSeatPlan.length; i++) {
      // console.log(allDataArr);
      let title = allDataArrSeatPlan[i][1].title;
      let seatPlanFile = allDataArrSeatPlan[i][1].seatPlanFile;

      $('#tableBodySeatPlan').append('<tr>    <td>'+ j+ '</td>    <td>'+ title +'</td>    <td>      <button onclick="downloadSeatPlanFile()" class="btn btn-info btn-sm">Download<i class="fa fa-cloud-download"></i>        <p style="display:none">'+ seatPlanFile +'</p>      </button>    </td>  </tr>'    );
      j++;
    }
  } else {
    $('#tableBodySeatPlan').empty();
    $('#tableBodySeatPlan').append('<h3>No Records Added</h3>');
  }
}

function downloadSeatPlanFile() {
  let fieldSeatPlan;
  $('#tableBodySeatPlan').find('tr').click(function(){
    fieldSeatPlan =$(this).find('td').eq(2).text();
    fieldSeatPlan = fieldSeatPlan.toString();
    fieldSeatPlan = fieldSeatPlan.substring(17);
    fieldSeatPlan = fieldSeatPlan.trim()
    // console.log(fieldSeatPlan);
  });
  setTimeout(() => {
    storageRef.child(fieldSeatPlan).getDownloadURL()
    .then(function(url) {
      // console.log(url);
      window.open(url);
      console.log("file Downloading");
    })
    .catch(err => console.log(err));
  },200);
}

function displayUniversityExam() {
  universityExamRef.on('value', dataUniversity, errorUniversity);
}

function errorUniversity(err) {
  console.log(err);
}


function dataUniversity(snapshot) {
  // console.log('values are');
  let allDataObjUniversity = snapshot.val();

  var allDataArrUniversity = Object.entries(allDataObjUniversity);

  if(allDataArrUniversity.length > 0) {
    let j = 1;
    $('#tableBodyUniversity').empty();
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
  } else {
    $('#tableBodyUniversity').empty();
    $('#tableBodyUniversity').append('<h3>No Records Added</h3>');
  }
}

function downloadFile() {
  let fieldUniversity;
  $('#tableBodyUniversity').find('tr').click(function(){
    fieldUniversity =$(this).find('td').eq(2).text();
    fieldUniversity = fieldUniversity.toString();
    fieldUniversity = fieldUniversity.substring(17);
    fieldUniversity = fieldUniversity.trim()
    console.log(fieldUniversity);
  });
  setTimeout(() => {
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

  if(allDataArr.length > 0) {
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
      $('#examTableBody').append('<tr>      <td>'+ j +'</td>      <td>'+ examDate +'</td>      <td>'+ examTime +'</td>  '    );
      j++;
    }
  } else {
    $('#examTableBody').empty();
    $('#examTableBody').append('<h3>No Records Added</h3>');
  }
}

function error(err) {
  console.log(err);
}

function applyForExam() {
  let field1;
  $('#examTableBody').find('tr').click(function(){
    field1 =$(this).find('td').eq(4).text();
    field1 = field1.toString();
    field1 = field1.substring(5);
    field1 = field1.trim();
    // recordId = field1.substring(6,26);
    // recordId = recordId.trim();
    // console.log(recordId);
    // console.log(field1);
  });
  setTimeout(() => {
    for(var i=0; i < result.length; i++) {
      // takes a key from array index
      var k=result[i];
      // console.log(k);
      if(k === field1) {
        console.log('dddd');
        
        // decreasing the seat by 1
        let applyCount = allDataObj[k].facultyRequire;
        console.log(applyCount);
        
        applyCount = applyCount - 1;
        console.log(allDataObj[k].facultyRequire);
        addExamRef.child(k).update({
          facultyRequire: applyCount
        });
      }
    }

    // code
  },200);
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
