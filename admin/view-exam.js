const allExamRef = firebase.database().ref('addExam');

allExamRef.on('value', data, error);

function data(snapshot) {
  // console.log('values are');

  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  var allDataArr = Object.entries(allDataObj);
  // console.log(allDataArr);
  
  for(var i=0; i < allDataArr.length; i++) {
    let title = allDataArr[i][1].title;
    
    $('#tableBody').append(
      '<tr>      <td>' + (i+1) + '</td>      <td>' + title + '</td>      <td>        <button class="btn btn-info">Download <span class="fa fa-cloud-download"></span></button>      </td>    </tr>'
    );
  }
}

function error(err) {
  console.log(err);
}