
let field1, field2, result, allDataObj;

const allFacultyRef = firebase.database().ref('addFaculty');

allFacultyRef.on('value', data, error);

function data(snapshot) {
  allDataObj = snapshot.val();
  // console.log(allDataObj);

  result = Object.keys(allDataObj);

  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);

  $('#tableBody').empty();
  for(var i=0; i < allDataArr.length; i++) {
    let name = allDataArr[i][1].name;
    let email = allDataArr[i][1].email;

    $('#tableBody').append(
      '<tr>      <td>' + name + '</td>      <td>' + email + '</td>      <td>        <button class="btn btn-danger btn-sm"  onclick="tableValues(); deleteRecord()">          <i class="fa fa-trash"></i>        </button>        <button class="btn btn-sm btn-info" class="btn btn-info btn-lg" onclick="tableValues()" data-toggle="modal" data-target="#myModal"><i class="fa fa-wrench"></i></button>      </td>    </tr>'
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
    // console.log(field1, field2);
  });
}

function deleteRecord() {
  console.log('Deleting Record');
  setTimeout(function () {
    for(var i = 0; i < result.length; i++) {
      var k = result[i];
      var matchField1 = allDataObj[k].name;
      var matchField2 = allDataObj[k].email;
      if(field1 == matchField1 && field2 == matchField2 ) {
        allFacultyRef.child(k).remove();
      }
    }
  },500);
}

function upadateRecord() {
  console.log('Updating Record');
  for(var i = 0; i < result.length; i++) {
    var k=result[i];
    var matchField1 = allDataObj[k].name;
    var matchField2 = allDataObj[k].email;
    // console.log(matchField1, matchField2);

    if((field1 == matchField1) && (field2 == matchField2)) {
      name = document.querySelector('#name').value;
      email = document.querySelector('#email').value;
      updatedData = {
        name : name,
        email : email
      };
      allFacultyRef.child(k).update(updatedData);
      // console.log("Record Updated");
    }
  }
}
