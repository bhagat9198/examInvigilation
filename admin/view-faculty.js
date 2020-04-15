const allFacultyRef = firebase.database().ref('addFaculty');

allFacultyRef.on('value', data, error);

function data(snapshot) {
  console.log('values are');

  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  
  for(var i=0; i < allDataArr.length; i++) {
    let name = allDataArr[i][1].name;
    let email = allDataArr[i][1].email;
    
    $('#tableBody').append(
      '<tr>      <td>' + name + '</td>      <td>' + email + '</td>      <td>        <button class="btn btn-danger btn-sm">          <i class="fa fa-trash"></i>        </button>        <button class="btn btn-sm btn-info" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-wrench"></i></button>      </td>    </tr>'
    );
  }
}

function error(err) {
  console.log(err);
}