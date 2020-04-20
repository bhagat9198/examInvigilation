
let examData, selectedFile;

var addExam =  document.getElementById('addExam');
var uploadFile = document.querySelector('#fileSubmit');

var addExamRef = firebase.database().ref('addExam');
const storageService = firebase.storage();

function submitForm() {
  // e.preventDefault();

  const title = getValue('title');
  const branch = getValue('branch');
  const semester = getValue('semester');
  const examDate = getValue('examDate');
  const examTime = getValue('examTime');

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
    examFile : examFile
  };

  addExamPush.set(examData);
  console.log("saving of data done");

  storageService.ref(`exams/${key}__${selectedFile.name}`).put(selectedFile);
  console.log('File uploaded');
}

function getValue(id) {
  return document.getElementById(id).value;
}

addExam.addEventListener('click', submitForm);

function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  // console.log(e.target.files);
  // console.log(selectedFile);
}

uploadFile.addEventListener('change', handleFileUploadChange);

const uploadDetails = document.querySelector('#uploadDetails');
uploadDetails.addEventListener('click', generatingPdf);

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
