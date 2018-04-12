
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5hp6ipo0E2GVECpXT1vX4ljtlhZyGwko",
    authDomain: "fir-homework-1a1d6.firebaseapp.com",
    databaseURL: "https://fir-homework-1a1d6.firebaseio.com",
    projectId: "fir-homework-1a1d6",
    storageBucket: "",
    messagingSenderId: "294776274839"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // Initial Values
  var name = "";
  var destination = "";
  var time = 0;
  var frequency = 0;
  
  
  //User provides form input, then clicks the add button so that information is put in the database and next train info is added to the table on the page.
  $("#add").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();
  
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();
  
    database.ref().push({
      name: name,
      destination: destination,
      time: time,
      frequency: frequency,
      // Keeps track of when the info is entered
      startedAt: firebase.database.ServerValue.TIMESTAMP
    });
});

    // Declare this variable outside the function so it's not being declared again every time the function is run
    var tBody = $("tbody");

    // Taking the info from the database to be added to our table
    database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().time);
      console.log(snapshot.val().frequency);

      // Adds results into table on page
      var tRow = $("<tr>");

      // Lists the info the user has inputted
      tRow.append("<td>" + snapshot.val().name + "</td>");
      tRow.append("<td>" + snapshot.val().destination + "</td>");
      tRow.append("<td>" + snapshot.val().frequency + " minutes" + "</td>");
      
      // Calculates next arrival time
      tRow.append("<td>" + moment(snapshot.val().startedAt).format("LT") + "</td>");

      // Calculates minutes away
      tRow.append("<td>" + moment(snapshot.val().frequency, 'h:mm').fromNow() + "<td>");
      
      tBody.append(tRow);
      $("#results").append(tBody);

})
