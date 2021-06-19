$(document).ready(function() {
  console.log("Document loaded");


  timeago.render(document.querySelectorAll('#Timestamp'));

  $(".tweet-text").on('input', function() {
    //Input length
    const inputVal = $(this).val().length;
    //Counter variable
    const $counter = $(this).parent().find('.counter');
    //Initial counter value
    let counterVal = 140;

    counterVal -= inputVal;
    //Sets remaining characters possible
    $counter.val(counterVal);
    //Sets red color if over character limit
    if (counterVal < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }
  })
});

