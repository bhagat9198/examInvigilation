// const auth = firebase.auth();

// dupliacting the database
const dupStudent  = firebase.database().ref('addStudent');
const dupFaculty  = firebase.database().ref('addFaculty');

function generatingStudents(b) {
	for(var i = 1; i <= 40; i++) {
		var branchGenerate = b;
		const dupStudentPush = dupStudent.push();
		// const key = dupStudentPush.getKey();
		// console.log(key);
		const name = `s${i}${branchGenerate}`;
		const branch = `${branchGenerate}`.toUpperCase();
		const email = `s${i}@${branchGenerate}.com`;
		const usn = `s${i}${branchGenerate}`;
		const password = `ssssss`;
		const semester = '4';
    
    // auth.createUserWithEmailAndPassword(email, password).then(cred => {
    //   const wholeData = {
    //     name: name,
    //     branch: branch,
    //     email: email,
    //     usn: usn,
    //     password: password,
    //     semester: semester
    //   };
    //   dupStudentPush.set(wholeData);
    // }).then(() => {
    //   console.log('done');
    // }).catch(err => {
    //   console.log(err);
		// });
		const wholeData = {
			name: name,
			branch: branch,
			email: email,
			usn: usn,
			password: password,
			semester: semester
		};
		dupStudentPush.set(wholeData);
		console.log(`${branch} done`);
	}
}
// generatingStudents('ise');
// generatingStudents('cse');
// generatingStudents('ece');
// generatingStudents('eee');
// generatingStudents('civ');
// generatingStudents('me');


function generatingFaculty() {
	for(var i = 1; i <= 20; i++) {
		const dupFacultyPush = dupFaculty.push();
		const name = `f${i}`;
		const email = `f${i}@f.com`;
		const password = `ffffff`;
		
		
		// auth.createUserWithEmailAndPassword(email, password).then(cred => {
    //   const wholeData = {
		// 		name: name,
		// 		email: email,
		// 		password: password,
		// 	};
    //   dupFacultyPush.set(wholeData);
    // }).then(() => {
    //   console.log(`faculty done`);
    // }).catch(err => {
    //   console.log(err);
		// });
		
		const wholeData = {
			name: name,
			email: email,
			password: password,
		};
		dupFacultyPush.set(wholeData);
		console.log(`faculty done`);
	} 
}
// generatingFaculty();