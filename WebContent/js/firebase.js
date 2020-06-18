
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script  src="https://www.gstatic.com/firebasejs/7.15.0/firebase-auth.js"></script>
<script  src="https://www.gstatic.com/firebasejs/7.15.0/firebase-database.js"></script>
<script>

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCaxkCZx_QEmXXpj214jpyAJhFSRR6lifI",
    authDomain: "spacewalk-5df9f.firebaseapp.com",
    databaseURL: "https://spacewalk-5df9f.firebaseio.com",
    projectId: "spacewalk-5df9f",
    storageBucket: "spacewalk-5df9f.appspot.com",
    messagingSenderId: "441071891924",
    appId: "1:441071891924:web:e7a89ab96d5398c3e49241"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database =  firebase.database();

//database.ref().push({nombre:'gato'}); //colocar data

var ref = firebase.database().ref(); //retreave data

ref.on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});


</script>