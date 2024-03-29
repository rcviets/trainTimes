// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAEzv1kuChFBRClgNoaStov8oqGIOIyZxA",
    authDomain: "traintimes-6d1a4.firebaseapp.com",
    databaseURL: "https://traintimes-6d1a4.firebaseio.com",
    projectId: "traintimes-6d1a4",
    storageBucket: "",
    messagingSenderId: "539361636374",
    appId: "1:539361636374:web:60836fa82a22b8d30c8537"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

// Submit Button
$("#add-train-button").on('click', function(event) {
    event.preventDefault();

    //Grab user input
    var trainName = $('#name-input').val().trim();
    var trainLocal = $('#location-input').val().trim();
    var trainTime = $('#time-input').val().trim();
    var trainFreq = $('#frequency-input').val().trim();
    
    //Object to hold data
    var newTrain = {
        name: trainName,
        local: trainLocal,
        time: trainTime,
        freq: trainFreq
    };

    //Upload data to database
    database.ref().push(newTrain);

    //Clear text-boxes
    $('#name-input').val('');
    $('#location-input').val('');
    $('#time-input').val('');
    $('#frequency-input').val('');
});

// Create event to add train to Firebase
database.ref().on('child_added', function(childSnapshot) {

    //Create variables
    var trainName = childSnapshot.val().name;
    var trainLocal = childSnapshot.val().local;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
    
        //Format time
        trainFreq = parseInt(trainFreq);
        trainTime = parseInt(trainTime);
    
        var timeLeft = moment().diff(moment.unix(trainTime), 'minutes') % trainFreq;
        var minutesAway = trainFreq - timeLeft;
        var nextTrain = moment().add(minutesAway, 'm').format('hh:mm A');
    
    //Create Table
    var trainRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(trainLocal),
        $('<td>').text(trainFreq),
        $('<td>').text(nextTrain),
        $('<td>').text(minutesAway)
    );

    //Append to HTML
    $('#tableBody').append(trainRow);

});
    