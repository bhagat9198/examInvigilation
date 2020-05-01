// const auth = firebase.auth();
// console.log('js');

// auth.onAuthStateChanged(user => {
// 	if(user) {
// 		console.log(user);

// 	} else {
// 		// console.log(user);
// 		const html = `
// 		<br>
// 		<div class="text-center">
// 		<h2>You are not LoggedIn</h2><br>
// 		<h3>Click <a href="../index.html">here </a>to signIn </h3>
// 		</div>
// 		`;
// 		document.querySelector('body').innerHTML = html;
// 	}
// })


// logout
// const logout = document.querySelector('#adminLogout');
// logout.addEventListener('click', () => {
//   auth.signOut();
//   console.log('Loged Out');
// });



document.querySelector('#gerneratePdf').addEventListener('click', gPdf);

function gPdf() {
	// console.log('lol');
	
	// tableDisplay = tableDisplay.toString();
	// console.log(tableDisplay);
	// const lol = document.querySelector('#lol');
	// const lol2 = document.querySelector('#tableDisplay');
	// // const lol3 = lol.innerHTML(lol2)
	// var printWindow = window.open('', '', 'height=400,width=800');
	// printWindow.document.write('<html><head><title>DIV Contents</title>');
	// printWindow.document.write('</head><body >');
	// printWindow.document.write(footer);
	// printWindow.document.write('</body></html>');
	// printWindow.document.close();
	// printWindow.print();

}






// dupliacting the database
const addStudent  = firebase.database().ref('addStudent');
const dupStudent  = firebase.database().ref('dupStudent');
const dupFaculty  = firebase.database().ref('dupFaculty');
let facultyObj, facultyKeys;
let rooms = [];

// addStudent.on('value', data, error);

// function error(err) {
// 	console.log(err);
// }

// function data(snapshot) {
// 	const dataObj = snapshot.val();
// 	// console.log(dataArr);

// 	const dataArr = Object.keys(dataObj);
// 	// console.log(dataObj);

// 	dataArr.forEach(element => {
// 		// console.log(element);
// 		// console.log(typeof(dataArr[element].semester));
		
// 	});
	
// }

function generatingStudents(b) {
	for(var i = 1; i <= 40; i++) {
		var branchGenerate = b;
		const dupStudentPush = dupStudent.push();
		// const key = dupStudentPush.getKey();
		// console.log(key);
		const name = `s${i}${branchGenerate}`;
		const branch = `${branchGenerate}`.toUpperCase();
		const email = `s${i}.${branchGenerate}@com`;
		const usn = `s${i}${branchGenerate}`;
		const password = `ssssss`;
		const semester = '4';
		
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
		const email = `f${i}.f@com`;
		const password = `ffffff`;
		
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

dupFaculty.on('value', dupFacultyData, dupFacultyError);

function dupFacultyError(err) {
	console.log(err);
}

function dupFacultyData(snapshot) {
	facultyObj = snapshot.val();
	facultyKeys = Object.keys(facultyObj);
}


dupStudent.on('value', dupStudentData, dupStudentError);

function dupStudentError(err) {
	console.log(err);
}

// let totalDupStudent;
function dupStudentData(snapshot) {
	const dataObj = snapshot.val();
	const dataArrKeys  = Object.keys(dataObj);
	// console.log(dataArr);
	let totalDupStudent = dataArrKeys.length;
	let iseKeys = [], cseKeys = [], eceKeys = [], eeeKeys = [], civKeys = [], meKeys = [];
	
	dataArrKeys.forEach(ele => {
		if((dataObj[ele].branch) === 'ISE'){
			iseKeys.push(ele);
			// console.log('ise');
		}
		if((dataObj[ele].branch) === 'CSE'){
			cseKeys.push(ele);
		}
		if((dataObj[ele].branch) === 'EEE'){
			eeeKeys.push(ele);
		}
		if((dataObj[ele].branch) === 'ECE'){
			eceKeys.push(ele);
		}
		if((dataObj[ele].branch) === 'CIV'){
			civKeys.push(ele);
		}
		if((dataObj[ele].branch) === 'ME'){
			meKeys.push(ele);
		}
	});
	// console.log(iseKeys.length);

	setTimeout(()=>{
		// console.log(totalDupStudent);
		cal(dataObj, totalDupStudent, iseKeys, cseKeys, eceKeys, eeeKeys, meKeys, civKeys);
	},3000);
}

// creating rooms
for(let i = 8; i <= 38; i++) {
	let roomNumber = 300 + i;
	rooms.push(roomNumber);
}
//  console.log(rooms);
 

function calMostStudents(b1Keys, b2Keys, b3Keys, b4Keys, b5Keys, compareBranch) {
		if( 
				(compareBranch.length >= b1Keys.length) &&
				(compareBranch.length >= b2Keys.length) &&
				(compareBranch.length >= b3Keys.length) &&
				(compareBranch.length >= b4Keys.length) &&
				(compareBranch.length >= b5Keys.length)
			)
			return compareBranch.length
		else 
			return -1;
}

function cal(dataObj, totalDupStudent, iseKeys, cseKeys, eceKeys, eeeKeys, meKeys, civKeys) {
	let allRows = '', rowHtml = '';
	let mostStudents = 0;
	mostStudents = calMostStudents(cseKeys, eceKeys, eeeKeys, meKeys, civKeys, iseKeys);
	if(mostStudents < 0)
		mostStudents = calMostStudents(iseKeys, eceKeys, eeeKeys, meKeys, civKeys, cseKeys);
	else if(mostStudents < 0)
		mostStudents = calMostStudents(cseKeys, iseKeys, eeeKeys, meKeys, civKeys, eceKeys);
	else if(mostStudents < 0)
		mostStudents = calMostStudents(cseKeys, eceKeys, iseKeys, meKeys, civKeys, eeeKeys);
	else if(mostStudents < 0)
		mostStudents = calMostStudents(cseKeys, eceKeys, eeeKeys, iseKeys, civKeys, meKeys);
	else 
		mostStudents = civKeys.length;
	// console.log(mostStudents);


	let allTabels = '';
	let iseStud, cseStud, eeeStud, eceStud, meStud, civStud;
	let multipler = 1, counter = 0, facultyCount = facultyKeys.length, roomCount = 30;
	let tempFacutyKeys = facultyKeys;
	let tempRooms = rooms;
	while(totalDupStudent >= 0) {
		for(let i = counter; i < mostStudents; i++) {
			// console.log(i);
			
			if(i == 5*multipler){
				multipler++;
				break;
			}

			if(i < iseKeys.length) {
				iseStud = dataObj[iseKeys[i]].name;
			} else {
				iseStud = '---';
			}
			if(i < cseKeys.length){
				cseStud = dataObj[cseKeys[i]].name;
			} else {
				cseStud = '---';
			}
			if(i < eeeKeys.length) {
				eeeStud = dataObj[eeeKeys[i]].name;
			} else {
				eeeStud = '---';
			}
			if(i < eceKeys.length) {
				eceStud = dataObj[eceKeys[i]].name;
			} else {
				eceStud = '---';
			}
			if(i < civKeys.length) {
				civStud = dataObj[civKeys[i]].name;
			} else {
				civStud = '---';
			}
			if(i < meKeys.length) {
				meStud = dataObj[meKeys[i]].name;
			} else {
				meStud = '---';
			}
	
			rowHtml = `
			<tr>
				<th>${iseStud}</th>
				<th>${cseStud}</th>
				<th>${eeeStud}</th>
				<th>${eceStud}</th>
				<th>${civStud}</th>
				<th>${meStud}</th>
			</tr>`;
	
			allRows = allRows + rowHtml;
			
		}	
		counter = counter + 5;	
		// console.log(counter);

		// assigning faulty
		let randomNum = parseInt(Math.random()*facultyCount);
		// console.log(tempFacutyKeys[randomNum], randomNum);
		let facultyName = facultyObj[tempFacutyKeys[randomNum]].name;
		// console.log(facultyName);
		facultyCount--
		
		let randomRoom = parseInt(Math.random()*roomCount);
		let roomName = tempRooms[randomRoom];
		roomCount--;

		let completeTable =`
		<div class="card mb-4">
      <div class="card-body">
				<div class="table-responsive">
					<h1 class="text-center">Room No : ${roomName} </h1>
					<h3>Faculty : ${facultyName}</h3>
					<br>
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>ISE</th>
                <th>CSE</th>
                <th>EEE</th>
                <th>ECE</th>
                <th>CIV</th>
                <th>ME</th>
              </tr>
            </thead>
            <tbody id="tableBody">
							${allRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
		`;
		allRows = '';
		// console.log(allRows);
		
		allTabels = allTabels + completeTable;
		// document.querySelector('#tableDisplay').innerHTML = completeTable;
		// document.querySelector('#tableBody').innerHTML = allRows;

		tempFacutyKeys = tempFacutyKeys.filter(removeFaculty)
		function removeFaculty(index) {
			return tempFacutyKeys[randomNum] != index;
		}
		// console.log(tempFacutyKeys.length);
		
		tempRooms = tempRooms.filter(removeRoom);
		function removeRoom(index) {
			return index != roomName;
		}
		// console.log(tempRooms.length);
		

		totalDupStudent = totalDupStudent - 30;
	}
	// console.log(facultyKeys);
	
	document.querySelector('#tableDisplay').innerHTML = allTabels;
}
