var config = {
    apiKey: "AIzaSyDp2Em9g1Om4y3-ccZLJ3vutli07GU_HRw",
    authDomain: "cookies-a8b6e.firebaseapp.com",
    databaseURL: "https://cookies-a8b6e.firebaseio.com",
    projectId: "cookies-a8b6e",
    storageBucket: "cookies-a8b6e.appspot.com",
    messagingSenderId: "52793967330"
  };
  firebase.initializeApp(config);

var database = firebase.database();
console.log(database)
$("#submit").on("click", function () {
  event.preventDefault()

  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#freq-input").val().trim();
  var start = $("#start-input").val().trim();
  
  var time = moment().format("HH:mm");
  console.log(time)
  var inputConvert = start.split(":");
  console.log(inputConvert)
  var convertTime = moment().hours(inputConvert[0]).minutes(inputConvert[1]);
  console.log(convertTime)
  // var findDiff = moment(time - convertTime).format("HH:mm");

  var findDiff = moment().diff(moment(convertTime), "minutes");
  while(findDiff > 0) {
    convertTime = moment(convertTime).add(frequency, "minutes");
    findDiff = moment().diff(moment(convertTime), "minutes");
  }

  console.log(findDiff)
  console.log(convertTime)
  findDiff = Math.abs(findDiff);
  // console.log(typeof start)
  database.ref().push({
    trainName: name,
    trainDestination: destination,
    trainFrequency: frequency,
    trainStartTime: start,
    trainNextArrival: moment(convertTime).format("HH:mm"),
    trainMinsAway: findDiff
  })
})

database.ref().on("child_added", function(snapshot) {
  var newTr = $("<tr>");
  var newTrain = $("<td id='train-name'>");
  var newDestination = $("<td id='train-destination'>");
  var newFrequency = $("<td id='frequency'>");
  var nextArrival = $("<td id ='arrival'>");
  var newMinsAway = $("<td id='mins-away'>");



  newTrain.append(snapshot.val().trainName);
  newDestination.append(snapshot.val().trainDestination);
  newFrequency.append(snapshot.val().trainFrequency);
  nextArrival.append(snapshot.val().trainNextArrival);
  newMinsAway.append(snapshot.val().trainMinsAway);

  $(".table").append(newTr,newTrain,newDestination,newFrequency,nextArrival,newMinsAway);
  // console.log("this is monthly rate" + snapshot.val().employeeRate)
})