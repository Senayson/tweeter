const counterVar = 

$(document).ready(function() {
  console.log("Document loaded");

  $("#tweet-text").on('input', function(){
    //Input length
    const inputVal = $(this).val().length;
    //
    const $counter= $(this).parent().find('.counter');
    let counterVal = 140;
     counterVal -= inputVal;
    console.log(counterVal);

   $counter.val(counterVal);
  
    if(counterVal < 0) {
      $('.counter').addClass('negative');
    }


   })

})

const timestamp = document.querySelectorAll('Timestamp');
timestamp = timeago.format(new Date());
