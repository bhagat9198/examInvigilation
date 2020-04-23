const auth = firebase.auth();

var addExamRef = firebase.database().ref('addExam');
let result, field1, allDataObj;

auth.onAuthStateChanged(user => {
  if(user) {
    // console.log(user);
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
});

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
    $('#examTableBody').append('<tr>      <td>'+ j +'</td>      <td>'+ examDate +'</td>      <td>'+ examTime +'</td>      <td><span class="badge badge-pill badge-primary">'+ facultyRequire +'</span></td>      <td><button onclick="applyForExam()" class="btn btn-info">Apply <p style="display:none">'+ recordId +'</p>  </button></td>    </tr>'
    );
    j++;
  }
}

function error(err) {
  console.log(err);
}

function applyForExam() {
  // console.log('apply');
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
    // for(var i = 0; i < result.length; i++) {
    //   var k = result[i];
    //   if(field1 === k) {
    //     // console.log(k);
    //     // console.log(field1);
    //     // addExamRef.child(recordId).remove();
    //   } else {
    //     console.log("Not SAME");
    //     console.log(k);
    //     console.log(field1);
    //   }
    // }

    for(var i=0; i < result.length; i++) {
      // takes a key from array index
      var k=result[i];
      // console.log(k);
      if(k === field1) {
        // decreasing the seat by 1
        c = allDataObj[k].facultyRequire;
        console.log(c);

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
