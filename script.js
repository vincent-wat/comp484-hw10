$(function () {
  // Main object
  var pet_info = { name: "Pikachu", weight: 10, happiness: 5, energy: 5 };

  // Define attributes
  var $name = $(".name");
  var $weight = $(".weight");
  var $happiness = $(".happiness");
  var $energy = $(".energy");
  var $comment = $(".pet-comment");
  var $img = $(".pet-image");

// Jquery Method #1: .wrap()
// Simply wraps the image with the div tags provided

  $img.wrap('<div class="pet-frame"></div>');

  function limit(n) { return Math.max(0, n); }

  // Updates the screen
  function sync() {
    $name.text(pet_info.name);
    $weight.text(pet_info.weight);
    $happiness.text(pet_info.happiness);
    $energy.text(pet_info.energy);
  }

  // Text box appears below pet
  function speak(msg) {
    $comment.stop(true, true)
      .text(msg).slideDown(120).delay(1200).slideUp(160);
  }

  // Animation for the pet to zoom in and out like bouncing
  function bounce() {
    $img.stop(true, true)
      .animate({ scale: 1.06 }, { duration: 120, step: function (now) { $(this).css('transform', 'scale(' + now + ')'); } })
      .animate({ scale: 1.00 }, { duration: 120, step: function (now) { $(this).css('transform', 'scale(' + now + ')'); } });
  }

  // Make sure no stat drops below 0
  function checkPetInfo() {
    pet_info.weight = limit(pet_info.weight);
    pet_info.happiness = limit(pet_info.happiness);
    pet_info.energy = limit(pet_info.energy);
  }

  // Updates the info on the screen
  function updateInfo() {
    checkPetInfo();
    sync();
  }

  // Treat button functionality
  function clickedTreatButton() {
    pet_info.happiness += 1;
    pet_info.weight += 1;
    updateInfo();
    speak("Delicious!");
    bounce();
  }

  // Play button functionality
  function clickedPlayButton() {
    pet_info.happiness += 1;
    pet_info.weight -= 1;
    pet_info.energy -= 1;
    updateInfo();
    speak("Wow, so much fun!");
    bounce();
  }

  // Exercise button functionality
  function clickedExerciseButton() {
    pet_info.happiness -= 1;
    pet_info.weight -= 1;
    pet_info.energy -= 1;
    updateInfo();
    speak("Workout time!");
  }

  // Nap button functionality
  function clickedNapButton() {
    pet_info.happiness += 1;
    pet_info.energy += 2;
    updateInfo();
    speak("Zzz…");
  }

  //assign classes being clicked to the action functions I made
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);

  // loads the intro message exactly once
  $img.one('load', function () { 
    speak("Hi! I'm your new pet.");
  }).each(function () {
    if (this.complete) $(this).trigger('load');
  });

  var $buttons = $('.button-container button');

  // Jquery Method #2: .each()
  // This method is being used to iterate through EACH button on the page.
  // In doing so, EVERY button will be rendered the same way.

  $buttons.each(function(){
    var $b = $(this); // current button
    var label = $b.text().trim(); // retrieves text from object
    var icon = $b.data('icon'); // retrieves src frmo data-icon
    $b.empty()
      .append($('<img>', { class: 'btn-icon', src: icon, alt: '' })) //add image for button
      .append($('<span>', { class: 'btn-label', text: label })); // add span for label to button
  });

  updateInfo();
});
