
// when user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // make a newCharacter obj
  var food = {
    // name from name input
    Username: $("#Username").val().trim(),
    // role from role input
    Main_Ingredien: $("#Main_Ingredien").val().trim(),
    // age from age input
    Title: $("#Sequelize").val().trim(),
    // points from force-points input
    Url_to_Recipe: $("#Url_to_Recipe").val().trim()
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/new", food)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Adding character...");
    });

  // empty each input box by replacing the value with an empty string
  $("#Username").val("");
  $("#Main_Ingredien").val("");
  $("#Title").val("");
  $("#Url_to_Recipe").val("");

});
