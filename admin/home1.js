const auth = firebase.auth();
const dupStudent  = firebase.database().ref('dupStudent');
const dupFaculty  = firebase.database().ref('dupFaculty');
const universityExamRef = firebase.database().ref('universityExam'); 

auth.onAuthStateChanged(user => {
  if(user) {
    displayBar();
    // console.log(user);
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

function displayBar() {
  dupStudent.on('value', dataStud, errStud);
  dupFaculty.on('value', dataFacu, errFacu);
  universityExamRef.on('value', dataExam, errExam);
}

function dataExam(snapshot) {
  const allDataObj = snapshot.val();
  const allDataArr = Object.entries(allDataObj);
  const totalExam = allDataArr.length;
  console.log(totalExam);
  document.getElementById('totalExams').innerHTML = totalExam;
}

function dataFacu(snapshot) {
  const allDataObj = snapshot.val();
  const allDataArr = Object.entries(allDataObj);
  const totalFacu = allDataArr.length;
  console.log(totalFacu);
  document.getElementById('totalFaculties').innerHTML = totalFacu;
}

function dataStud(snapshot) {
  const allDataObj = snapshot.val();
  const allDataArr = Object.entries(allDataObj);
  const totalStud = allDataArr.length;
  console.log(totalStud);
  document.getElementById('totalStudents').innerHTML = totalStud;
}

function errExam(err) {
  console.log(err);
}

function errFacu(err) {
  console.log(err);
}

function errStud(err) {
  console.log(err);
}

// logout
const logout = document.querySelector('#adminLogout');
logout.addEventListener('click', () => {
  auth.signOut();
  console.log('Loged Out');
});
