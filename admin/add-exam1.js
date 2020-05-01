const auth = firebase.auth();

let examData, selectedFile, result;

var addExam =  document.getElementById('addExam');
var uploadFile = document.querySelector('#fileSubmit');
const uploadDetails = document.querySelector('#uploadDetails');

var addExamRef = firebase.database().ref('addExam');
const storageService = firebase.storage();
auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
    uploadFile.addEventListener('change', handleFileUploadChange);
    uploadDetails.addEventListener('click', generatingPdf);
    addExam.addEventListener('click', submitForm);
    displayExam();

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

function displayExam() {
  addExamRef.on('value', data, error);
}

function data(snapshot) {
  // console.log('values are');
  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  result = Object.keys(allDataObj);

  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  if(allDataArr.length > 0) {
    $('#tableBody').empty()
    for(var i=0; i < allDataArr.length; i++) {
      // console.log(allDataArr);
      let title = allDataArr[i][1].title;
      let semester = allDataArr[i][1].semester;
      let branch = allDataArr[i][1].branch;
      let examTime = allDataArr[i][1].examTime;
      let examFile = allDataArr[i][1].examFile;
      // deleteFileName = fileName;
      // console.log(deleteFileName);
      $('#tableBody').append('    	<tr>        <td>'+i+'</td>        <td>'+ title +'</td>        <td>'+ semester +'</td>        <td>'+ semester +'</td>        <td>'+ examTime +'</td>        <td>          <button onclick="deleteFile()" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>          <p style="display: none">'+ examFile +'</p>        </td>      </tr>'
      );
    }
  } else {
    $('#tableBody').empty();
    $('#tableBody').append('<h3 class="text-center">No record Added</h3>');
  }
}

function error(err) {
  console.log(err);
}

function deleteFile() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').eq(5).text();
    field1 = field1.toString();
    // field1 = field1.substring(17);
    field1 = field1.trim();
    recordId = field1.substring(6,26);
    recordId = recordId.trim();
    console.log(recordId);
    console.log(field1);
  });
  setTimeout(() => {

    // for(var i = 0; i < result.length; i++) {
    //   var k = result[i];
    //   if(recordId === k) {
    //     console.log(k);
    //     console.log(recordId);
    //     addExamRef.child(recordId).remove();
    //   } else {
    //     console.log("Not SAME");
    //     console.log(k);
    //     console.log(recordId);
    //   }
    // }
    storageService.ref().child(field1).delete().then(function() {
      // File deleted successfully
      console.log('File Deleted');
      addExamRef.child(recordId).remove().then(() => {
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
  const branch = getValue('branch');
  const semester = getValue('semester');
  const examDate = getValue('examDate');
  const examTime = getValue('examTime');
  const facultyRequire = 10;
  const addExamPush = addExamRef.push();
  const key = addExamPush.getKey();
  const examFile = `exams/${key}__${selectedFile.name}`;
  // saving values in firebase
  examData = {
    title: title,
    branch: branch,
    semester: semester,
    examDate: examDate,
    examTime: examTime,
    examFile : examFile,
    facultyRequire : facultyRequire
  };

  addExamPush.set(examData);
  console.log("Saving of data done");

  storageService.ref(`exams/${key}__${selectedFile.name}`).put(selectedFile);
  console.log('File uploaded');
}

function getValue(id) {
  return document.getElementById(id).value;
}



function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  // console.log(e.target.files);
  // console.log(selectedFile);
}



function generatingPdf() {
  const title = getValue('title');
  const branch = getValue('branch');
  const semester = getValue('semester');
  const examDate = getValue('examDate');
  const examTime = getValue('examTime');

  // saving values in firebase
  examData = {
    title: title,
    branch: branch,
    semester: semester,
    examDate: examDate,
    examTime: examTime
  };

  // saving data to pdf
  var docDefinition = {
    content: [
      { text: 'Exam Details', style: 'header' },
      { text: '.', style: 'space' },
      { text: 'Exam Title   :  ' + examData.title , style: 'anotherStyle' },
      { text: '.', style: 'space1' },
      { text: 'Branch   :   ' + examData.branch , style: 'anotherStyle' },
      { text: '.', style: 'space1' },
      { text: 'Semester   :   ' + examData.semester , style: 'anotherStyle' },
      { text: '.', style: 'space1' },
      { text: 'Exam Date    :   ' + examData.examDate , style: 'anotherStyle' },
      { text: '.', style: 'space1' },
      { text: 'Exam Time    :   ' + examData.examTime , style: 'anotherStyle' },
    ],
    styles: {
      header: {
        fontSize: 30,
        bold: true,
      },
      space: {
        lineHeight: 2,
        color: 'white'
      },
      space1: {
        lineHeight: 1.5,
        color: 'white'
      },
      anotherStyle: {
        fontSize: 18,
        italics: true,
        alignment: 'left'
      }
    }
  };
  pdfMake.createPdf(docDefinition).download();
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
