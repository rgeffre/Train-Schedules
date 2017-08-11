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

//On initial load of the database get a snapshot of the current data
//Push Form data field names to database
function pushFirebase(name, destination, firstTrainTime, frequency) {
  db.push({
    name,
    destination,
    firstTrainTime,
    frequency
  })
}
$.get('https://train-db.firebaseio.com/train-db.json', (res) => {
  let html ='';
  for(var prop in res){
    let name = res[prop].name;
    let destination = res[prop].destination;
    let frequency = res[prop].frequency;
    let arrival = res[prop].arrival;
    let away = res[prop].away;
    html += addHtml(name,destination,frequency,arrival,away)
  }
  $('.table').append(html);
});
//clear any values from form
function clear() {
  $('#name').val('');
  $('#destination').val('');
  $('#firstTrainTime').val('');
  $('#frequency').val('');
}
//Append data to table
function appendToTable(name, destination, frequency, arrival, away) {
  let html = `<tr>
        <td class="name">${name.toLowerCase()}</td>
        <td class="destination">${destination.toLowerCase()}</td>
        <td class="frequency">${frequency.replace(/-/g, '/')}</td>
        <td class="arrival">${arrival}</td>
        <td class="away">${away}</td>
      </tr>`;
  $('.table').append(html);
}
//create table
function addHtml(name, destination, frequency, arrival, away) {
  let html = `<tr>
        <td class="name">${name.toLowerCase()}</td>
        <td class="destination">${destination.toLowerCase()}</td>
        <td class="frequency">${frequency.toLowerCase()}</td>
        <td class="arrival>${arrival.toLowerCase()}</td> /*${"MINUTES TILL TRAIN: " + tMinutesTillTrain}</td> */
        <td class="away">${away.toLowerCase()}</td> /*${"Arrival Time: " + moment(nextTrain).format("hh:mm")} */
      </tr>`;
  return html;
}
//create event listeners for submit button
$('#btn-submit').on('click', (event) => {
  event.preventDefault();
  let name = $('#name').val().trim();
  let destination = $('#destination').val().trim();
  let frequency = $('#frequency').val().trim();
//  let arrival = $("Arrival Time: " + moment(nextTrain).format("hh:mm"));
//  let away = $("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  if (name && destination && frequency && arrival) {
    pushFirebase(name, destination, frequency, arrival);
    db.limitToLast(1).on('child_added', (snap) => {
      name = snap.val().name;
      destination = snap.val().destination;
      frequency = snap.val().frequency;
    //  arrival = "Arrival Time: " + moment(nextTrain).format("hh:mm");
     // away = "MINUTES TILL TRAIN: " + tMinutesTillTrain
    });
    appendToTable(name, destination, frequency, arrival, away);
    clear();
  } else {
    alert('please fill in all inputs')
  }
});
//Calculate how many minutes away the train is based on current time, frequency and first time the train left the station
////Pass required information from form entries to calculations
// Assumptions
/*var tFrequency = 0; //pass frequency field value to this variable

// Time is 3:30 AM
var firstTime = $('#firstTrainTime'); //pass firstTrainTime field value to this variable

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
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); */