//Initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyAfrq27u8r7EN328Lq_-tosbE8kM0k4ZKc",
    authDomain: "train-scheduler-83d9c.firebaseapp.com",
    databaseURL: "https://train-scheduler-83d9c.firebaseio.com",
    projectId: "train-scheduler-83d9c",
    storageBucket: "",
    messagingSenderId: "650136534207",
    appId: "1:650136534207:web:0d989f97a5f2c6a1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

//Adding button for Train

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    //Grabs users input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#train-start-time-input").val().trim();
    var tFrequency = $("#frequency-input").val().trim();

    //Momentjs Time converted
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minutesAway = tFrequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("hh:mm");
    

    //Create local object data
    var trainData = {
        name: trainName,
        destination: destination,
        start: firstTime,
        frequency: tFrequency
    };

    //upload database
    database.ref().push(trainData);

    //console log
   console.log(trainData.name);
   console.log(trainData.destination);
   console.log(trainData.start);
   console.log(trainData.frequency);
   console.log("next arrival" + nextArrival);
   console.log("minutesAway" + minutesAway);


   // Clears all of the text-boxes
   $("#train-name-input").val("");
   $("#destination-input").val("");
   $("#train-start-time-input").val("");
   $("#frequency-input").val("");


});

//3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().start;
    var tFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(tFrequency);
  
    //Momentjs Time converted
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minutesAway = tFrequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("hh:mm");
    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(tFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#trainschedule-table > tbody").append(newRow);
  });

