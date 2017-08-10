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
        <td class="name">${name.toLowerCase()}</td>
        <td class="destination">${role.toLowerCase()}</td>
        <td class="frequency">${start.replace(/-/g, '/')}</td>
        <td class="arrival">${arrival}</td>
        <td class="away">$ </td>
      </tr>`;
  $('.table').append(html);
}

function addHtml(name, role, start, months, rate, bill) {
  let html = `<tr>
        <td class="name">${name.toLowerCase()}</td>
        <td class="destination">${role.toLowerCase()}</td>
        <td class="frequency">${frequency.toLowerCase()}</td>
        <td class="arrival</td>
        <td class="away"></td>
      </tr>`;
  return html;
}

$('#btn-submit').on('click', (event) => {
  event.preventDefault();
  let name = $('#name').val().trim();
  let destination = $('#destination').val().trim();
  let frequency = $('#frequency').val().trim();
  let arrival = $('#arrival').val().trim();
  let away = //moment calcs;

  if (name && destination && frequency && arrival) {
    pushFirebase(name, destination, frequency, arrival);
    db.limitToLast(1).on('child_added', (snap) => {
      name = snap.val().name;
      destination = snap.val().destination;
      frequency = snap.val().frequency;
      arrival = snap.val().arrival;
      away = snap.val().away;
    });
    appendToTable(name, destination, frequency, arrival, away);
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