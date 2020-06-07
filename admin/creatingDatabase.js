// const auth = firebase.auth();

// dupliacting the database
// const dupStudent  = firebase.database().ref('dupStudent');
// const dupFaculty  = firebase.database().ref('dupFaculty');

function generatingStudents(b) {
	for(var i = 1; i <= 40; i++) {
		var branchGenerate = b;
		const dupStudentPush = dupStudent.push();
		// const key = dupStudentPush.getKey();
		// console.log(key);
		const name = `ss${i}${branchGenerate}`;
		const branch = `${branchGenerate}`.toUpperCase();
		const email = `ss${i}@${branchGenerate}.com`;
		const usn = `ss${i}${branchGenerate}`;
		const password = `ssssss`;
		let r = Math.ceil(Math.random()*(8-0)+0)
		const semester = r;
    
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      const wholeData = {
        name: name,
        branch: branch,
        email: email,
        usn: usn,
        password: password,
        semester: semester
      };
      dupStudentPush.set(wholeData);
    }).then(() => {
      console.log('done');
    }).catch(err => {
      console.log(err);
    });
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
		const name = `ff${i}`;
		const email = `ff${i}@f.com`;
		const password = `ffffff`;
		
		
		auth.createUserWithEmailAndPassword(email, password).then(cred => {
      const wholeData = {
				name: name,
				email: email,
				password: password,
			};
      dupFacultyPush.set(wholeData);
    }).then(() => {
      console.log(`faculty done`);
    }).catch(err => {
      console.log(err);
    });
	} 
}
// generatingFaculty();

