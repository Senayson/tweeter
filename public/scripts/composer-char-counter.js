$(document).ready(function() {
  console.log("Document loaded"); 
 
  //timeago.render(document.querySelectorAll('.Timestamp'));
  //$("p.Timestamp").text('2008-07-17T09:24:17Z');
  // jQuery("p.Timestamp").timeago();
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));

  $(".tweet-text").on('input', function(){
    console.log("IN This EVEnt")
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
    } else {
      $('.counter').removeClass('negative');
    }
   })

});

