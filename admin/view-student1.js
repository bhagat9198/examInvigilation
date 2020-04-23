const auth = firebase.auth();
// gloval varaiables
let field1, field2, field3, field4, result, allDataObj;

const allStudentRef = firebase.database().ref('addStudent');
auth.onAuthStateChanged(user => {
  if (user) {
    allStudentRef.on('value', data, error);

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


let totalRecords = 0;

function data(snapshot) {
  allDataObj = snapshot.val();
  // console.log(allDataObj);

  // extrating data through keys
  result = Object.keys(allDataObj);
  // gives us an array of all the uniqueID
  // console.log(result);

  // console.log(allDataObj);
  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  totalRecords = allDataArr.length;

  $('#tableBody').empty();
  for(var i=0; i < allDataArr.length; i++) {
    let branch = allDataArr[i][1].branch;
    let semester = allDataArr[i][1].semester;
    let name = allDataArr[i][1].name;
    let usn = allDataArr[i][1].usn;
    let uid = allDataArr[i][0];

    $('#tableBody').append(
      '<tr><td>' + name + '</td>        <td>' + semester + '</td>        <td>' + branch + '</td>        <td>' + usn + '</td>        <td>          <button class="btn btn-danger btn-sm"  onclick="tableValues(); deleteRecord()" >            <i class="fa fa-trash"></i>          </button>          <button class="btn btn-sm btn-info" class="btn btn-info btn-lg" data-toggle="modal" onclick="tableValues()" id="updateBtn"  data-target="#myModal">            <i class="fa fa-wrench"></i>        </button>        </td>     </tr>'
    );
  }
}

function error(err) {
  console.log(err);
}

function tableValues() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td:first').text();
    field2 =$(this).find('td').eq(1).text();
    field3 =$(this).find('td').eq(2).text();
    field4 =$(this).find('td').eq(3).text();
    // console.log(field1, field2, field3, field4);
  });
}

function deleteRecord() {
  console.log('Deleting Record');
  setTimeout(function () {
    for(var i = 0; i < result.length; i++) {
      var k = result[i];
      var matchField1 = allDataObj[k].name;
      var matchField2 = allDataObj[k].semester;
      if(field1 == matchField1 && field2 == matchField2 ) {
        allStudentRef.child(k).remove();
      }
    }
  },500);
}

function upadateRecord() {
  console.log('Updating Record');
  for(var i = 0; i < result.length; i++) {
    var k=result[i];
    var matchField1 = allDataObj[k].name;
    var matchField2 = allDataObj[k].semester;
    var matchField3 = allDataObj[k].branch;
    var matchField4 = allDataObj[k].usn;
    // console.log(matchField1, matchField2, matchField3, matchField4);

    if((field1 == matchField1) && (field2 == matchField2) && (field3 == matchField3) && (field4 == matchField4) ) {
      name = document.querySelector('#name').value;
      semester = document.querySelector('#semester').value;
      branch = document.querySelector('#branch').value;
      usn = document.querySelector('#usn').value;
      email = document.querySelector('#email').value;
      updatedData = {
        name : name,
        semester : semester,
        branch : branch,
        usn : usn,
        email : email
      };
      allStudentRef.child(k).update(updatedData);
      // console.log("Record Updated");
    }
  }
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
