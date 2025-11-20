$(function () {
  // Main Object
  var pet_info = { name: "Mochi", weight: 10, happiness: 5, energy: 5 };

  var $name = $(".name");
  var $weight = $(".weight");
  var $happiness = $(".happiness");
  var $energy = $(".energy");
  var $comment = $(".pet-comment");
  var $img = $(".pet-image");

  // Helper function that's going to be used to stop stats from going below zero
  function limit(n) { return Math.max(0, n); }

  function sync() {
    $name.text(pet_info.name);
    $weight.text(pet_info.weight);
    $happiness.text(pet_info.happiness);
    $energy.text(pet_info.energy);
  }

  function speak(msg) {
    // jQuery unique method #1: .delay()
    // Keeps the message up for a little bit before disappearing
    $comment.stop(true, true)
      .text(msg).slideDown(120).delay(1200).slideUp(160);
  }

  function bounce() {
    // image animation
    $img.stop(true, true)
      .animate({ scale: 1.06 }, { duration: 120, step: function (now) { $(this).css('transform', 'scale(' + now + ')'); } })
      .animate({ scale: 1.00 }, { duration: 120, step: function (now) { $(this).css('transform', 'scale(' + now + ')'); } });
  }

  function checkPetInfo() {
    // bug-fix to stop negative numbers in the stats
    pet_info.weight = limit(pet_info.weight);
    pet_info.happiness = limit(pet_info.happiness);
    pet_info.energy = limit(pet_info.energy);
  }

  function updateInfo() {
    checkPetInfo();
    sync();
  }

  // actions
  function clickedTreatButton() {
    pet_info.happiness += 1;
    pet_info.weight += 1;
    updateInfo();
    speak("Delicious!");
    bounce();
  }

  function clickedPlayButton() {
    pet_info.happiness += 1;
    pet_info.weight -= 1;
    pet_info.energy -= 1;
    updateInfo();
    speak("Wow, so much fun!");
    bounce();
  }

  function clickedExerciseButton() {
    pet_info.happiness -= 1;
    pet_info.weight -= 1;
    pet_info.energy -= 1;
    updateInfo();
    speak("Workout time!");
  }

  function clickedNapButton() {
    pet_info.happiness += 1;
    pet_info.energy += 2;
    pet_info.weight -= 1;
    updateInfo();
    speak("Zzz…");
  }

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);

  // jQuery unique method #2: .one('load', ...)
  // ensures that this intro message is only ran once
  $img.one('load', function () {
    speak("Hi! I'm your new pet.");
  }).each(function () {
    if (this.complete) $(this).trigger('load');
  });

  // Shows the info right off the bat.
  updateInfo();
});
