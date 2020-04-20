
let downloadFileName, field1 ;

const allExamRef = firebase.database().ref('addExam');

allExamRef.on('value', data, error);

function data(snapshot) {
  // console.log('values are');

  const allDataObj = snapshot.val();
  // console.log(allDataObj);
  var allDataArr = Object.entries(allDataObj);
  console.log(allDataArr);

  for(var i=0; i < allDataArr.length; i++) {
    let title = allDataArr[i][1].title;
    let fileName = allDataArr[i][1].examFile;

    downloadFileName = fileName;
    console.log(downloadFileName);
    $('#tableBody').append(
      '<tr>      <td>' + (i+1) + '</td>      <td>' + title + '</td>      <td style="color:white" >        <button onclick="downloadFile(); " class="btn btn-info">Download<span class="fa fa-cloud-download"></span></button> '+ fileName +'    </td>    </tr>'
    );
  }
}

function error(err) {
  console.log(err);
}

function tableValues() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').eq(2).text();
    field1 = field1.substring(17);
    console.log(field1);
  });
}

const storageService = firebase.storage();
const storageRef = storageService.ref();

function downloadFile() {
  $('#tableBody').find('tr').click(function(){
    field1 =$(this).find('td').eq(2).text();
    field1 = field1.substring(17);
    console.log(field1);
  });
    storageRef.child(downloadFileName).getDownloadURL()
    .then(function(url) {
      console.log(url);
      window.open(url);
      console.log("file Downloading");
    })
    .catch(err => console.log(err));

}
