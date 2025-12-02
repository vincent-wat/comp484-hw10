$(function () {
  var pet_info = { name: "Pikachu", weight: 10, happiness: 5, energy: 5 };

  var $name = $(".name");
  var $weight = $(".weight");
  var $happiness = $(".happiness");
  var $energy = $(".energy");
  var $comment = $(".pet-comment");
  var $img = $(".pet-image");

  $img.wrap('<div class="pet-frame"></div>');

  function limit(n) { return Math.max(0, n); }

  function sync() {
    $name.text(pet_info.name);
    $weight.text(pet_info.weight);
    $happiness.text(pet_info.happiness);
    $energy.text(pet_info.energy);
  }

  function speak(msg) {
    $comment.stop(true, true)
      .text(msg).slideDown(120).delay(1200).slideUp(160);
  }

  function bounce() {
    $img.stop(true, true)
      .animate({ scale: 1.06 }, { duration: 120, step: function (now) { $(this).css('transform', 'scale(' + now + ')'); } })
      .animate({ scale: 1.00 }, { duration: 120, step: function (now) { $(this).css('transform', 'scale(' + now + ')'); } });
  }

  function checkPetInfo() {
    pet_info.weight = limit(pet_info.weight);
    pet_info.happiness = limit(pet_info.happiness);
    pet_info.energy = limit(pet_info.energy);
  }

  function updateInfo() {
    checkPetInfo();
    sync();
  }

  function clickedTreatButton() {
    console.count('treat');
    pet_info.happiness += 1;
    pet_info.weight += 1;
    updateInfo();
    console.assert(pet_info.weight >= 0, 'weight negative', pet_info.weight);
    speak("Delicious!");
    bounce();
  }

  function clickedPlayButton() {
    console.count('play');
    pet_info.happiness += 1;
    pet_info.weight -= 1;
    pet_info.energy -= 1;
    updateInfo();
    console.assert(pet_info.weight >= 0, 'weight negative', pet_info.weight);
    speak("Wow, so much fun!");
    bounce();
  }

  function clickedExerciseButton() {
    console.count('exercise');
    pet_info.happiness -= 1;
    pet_info.weight -= 1;
    pet_info.energy -= 1;
    updateInfo();
    console.assert(pet_info.weight >= 0, 'weight negative', pet_info.weight);
    speak("Workout time!");
  }

  function clickedNapButton() {
    console.count('nap');
    pet_info.happiness += 1;
    pet_info.energy += 2;
    updateInfo();
    console.assert(pet_info.weight >= 0, 'weight negative', pet_info.weight);
    speak("Zzz…");
  }

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);

  $img.one('load', function () { 
    speak("Hi! I'm your new pet.");
  }).each(function () {
    if (this.complete) $(this).trigger('load');
  });

  var $buttons = $('.button-container button');

  $buttons.each(function(){
    var $b = $(this);
    var label = $b.text().trim();
    var icon = $b.data('icon');
    $b.empty()
      .append($('<img>', { class: 'btn-icon', src: icon, alt: '' }))
      .append($('<span>', { class: 'btn-label', text: label }));
  });

  /* DevTools demo buttons */
  $('#btn-debug-treat').on('click', function () {
    debugger;
    clickedTreatButton();
  });

  $('#btn-dom-change').on('click', function () {
    $('.dashboard')
      .attr('data-last', 'domChange')
      .append($('<div class="debug-node">Dashboard updated</div>'));
  });

  $('#btn-cause-error').on('click', function () {
    window.notAFunction();
  });

  $('#btn-fetch').on('click', function () {
    console.time('fetchSample');
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(r => r.json())
      .then(d => {
        console.timeEnd('fetchSample');
        console.log('fetch result', d);
        $comment.stop(true, true)
          .text('Fetched: ' + d.title).slideDown(120).delay(1200).slideUp(160);
      })
      .catch(e => console.error('fetch error', e));
  });

  $('#btn-log-table').on('click', function () {
    console.table([pet_info]);
  });

  updateInfo();
});
