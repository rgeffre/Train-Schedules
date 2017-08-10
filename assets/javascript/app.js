//Initialize Firebase database
var config = {
  apiKey: "AIzaSyDQJH3SB-j_JOm1MYzKgyL_pMQP05hPsNQ",
  authDomain: "train-db.firebaseapp.com",
  databaseURL: "https://train-db.firebaseio.com",
  projectId: "train-db",
  storageBucket: "",
  messagingSenderId: "743370352190"
};
firebase.initializeApp(config);

//Create a variable to reference the database
const database = firebase.database();
db = database.ref('/train-db');

//Initialize values
var = firstTrainTime
var = tfrequency
//On initial load of the database get a snapshot of the current data
//Push Form data field names to database
function pushFirebase(name, destination, first-train-time, frequency) {
  db.push({
    name,
    destination,
    first-train-time,
    frequency
  })
}
$.get('https://train-db.firebaseio.com/', (res) => {
  let html ='';
  for(var prop in res){
    let name = res[prop].name;
    let destination = res[prop].;
    let frequency = res[prop].frequency;
    let arrival = res[prop].;
    let away = //see moment calcs
    html += addHtml(name,destination,frequency,arrival,away)
  }
  $('.table').append(html);
});

function clear() {
  $('#name').val('');
  $('#destination').val('');
  $('#first-train-time').val('');
  $('#frequency').val('');
}

function appendToTable(name, destination, frequency, arrival, away) {
  let html = `<tr>
        <td class="emp-name">${name.toLowerCase()}</td>
        <td class="emp-role">${role.toLowerCase()}</td>
        <td class="emp-start">${start.replace(/-/g, '/')}</td>
        <td class="emp-months">${months} mo.</td>
        <td class="emp-rate">$ ${rate}/month</td>
        <td class="emp-bill">$ ${bill}</td>
      </tr>`;
  $('.table').append(html);
}

function addHtml(name, role, start, months, rate, bill) {
  let html = `<tr>
        <td class="emp-name">${name.toLowerCase()}</td>
        <td class="emp-role">${role.toLowerCase()}</td>
        <td class="emp-start">${start.replace(/-/g, '/')}</td>
        <td class="emp-months">${months} mo.</td>
        <td class="emp-rate">$ ${rate}/month</td>
        <td class="emp-bill">$ ${bill}</td>
      </tr>`;
  return html;
}

$('#btn-submit').on('click', (event) => {
  event.preventDefault();
  let name = $('#name').val().trim();
  let role = $('#role').val().trim();
  let start = $('#start-date').val().trim();
  let rate = $('#monthly-rate').val().trim();
  let months = getTime(start);
  let bill;
  if (name && role && start && rate) {
    pushFirebase(name, role, start, rate);
    db.limitToLast(1).on('child_added', (snap) => {
      name = snap.val().name;
      rate = snap.val().rate;
      role = snap.val().role;
      start = snap.val().start;
      bill = months * rate;
    });
    appendToTable(name, role, start, months, rate, bill);
    clear();
  } else {
    alert('please fill in all inputs')
  }
});
//Pass form values to table
//Calculate how many minutes away the train is based on current time, frequency and first time the train left the station
////Pass required information from form entries to calculations
// Assumptions
var tFrequency = 0; //pass frequency field value to this variable

// Time is 3:30 AM
var firstTime = "03:30"; //pass firstTrainTime field value to this variable

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));