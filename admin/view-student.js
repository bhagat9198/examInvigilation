const allStudentRef = firebase.database().ref('addStudent');

allStudentRef.on('value', data, error);
let totalRecords = 0;

function data(snapshot) {
  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  totalRecords = allDataArr.length;

  for(var i=0; i < allDataArr.length; i++) {
    let branch = allDataArr[i][1].branch;
    let semester = allDataArr[i][1].semester;
    let name = allDataArr[i][1].name;
    let usn = allDataArr[i][1].usn;
    let uid = allDataArr[i][0];
    
    $('#tableBody').append(
      '<tr><td>' + name + '</td>        <td>' + semester + '</td>        <td>' + branch + '</td>        <td>' + usn + '</td>        <td>          <button class="btn btn-danger btn-sm"   >            <i class="fa fa-trash"></i>          </button>          <button class="btn btn-sm btn-info" class="btn btn-info btn-lg" data-toggle="modal" id="updateBtn" value="'+uid+'"  data-target="#myModal">            <i class="fa fa-wrench"></i>        </button>        </td>     </tr>'
    );
  }
}

function error(err) {
  console.log(err);
}

function impFun(){
  console.log('hello');
  
  var updateBtn = document.getElementById('updateBtn');
  updateBtn.addEventListener('click', updateForm);
  function updateForm() {
    const v = updating.value;
    console.log(v);
    console.log('clicked');

  }
}
window.onload= impFun;


// function update() {
//   console.log('update btn clicked');

//   firebase.database().ref('addStudent').then(h => {
//     console.log(h);
    
//   })


  // for(let i = 0; i < totalRecords; i++) {
  //   let id = 'updateBtn_'+i;
  //   console.log(id);
    
  //   document.getElementById(id).addEventListener('hover',doSomething);

  //   function doSomething() {
  //     console.log('hey');
      
  //   }
  // }
  // const ref = firebase.database().ref('addStudent');
  // console.log(ref);
  
  // ref.on('value',lol,error);
// }



// function lol(snap) {
//   const data = snap.val();
//   console.log(data);
//   const keys = Object.keys(data);
//   console.log(keys);
  
  
// }