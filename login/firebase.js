// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAmRNA-YH5wbNJnMVFhf6WH__RQXbxlPk",
    authDomain: "loginforbot-ecb9b.firebaseapp.com",
    databaseURL: "https://loginforbot-ecb9b.firebaseio.com",
    projectId: "loginforbot-ecb9b",
    storageBucket: "loginforbot-ecb9b.appspot.com",
    messagingSenderId: "522012330685"
}
  firebase.initializeApp(config);

  var auth = firebase.auth()


  $('#create-user-form').on('submit', function(event){
    event.preventDefault()
    var email = $("#create-user-email").val()
    var password = $("#create-user-password").val()
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    })
  })

  $('#create-user-form').on('submit', function(event){
    event.preventDefault()
    var email = $("#create-user-email").val()
    var password = $("#create-user-password").val()
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    })
  })



  $('#sign-in-form').on('submit', function(event){
    event.preventDefault()
    var email = $("#sign-in-email").val()
    var password = $("#sign-in-password").val()
    auth.signInWithEmailAndPassword(email, password)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    })
  })



  $('#sign-out').on('click', function(){
      auth.signOut()
  })



  var uid

  auth.onAuthStateChanged(function(user){
    if(user){
        console.log(user);

        uid = user.uid
        $('#sign-out').show()
        $('#sign-in-form').hide()
        $('#create-user-form').hide()
    } else {
        console.log('not signed in');
        $('#sign-out').hide()
        $('#sign-in-form').show()
        $('#create-user-form').show()
    }
  })
  $('#sign-in-form').on('submit', function(event){
    event.preventDefault()
    var email = $("#sign-in-email").val()
    var password = $("#sign-in-password").val()
    auth.signInWithEmailAndPassword(email, password)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){

        $('#message').html(error.message)
        console.log(error);
        setTimeout(function(){
            $('#message').empty()
        }, 3000)
    })
  })