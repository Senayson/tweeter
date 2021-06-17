$(document).ready(function() {
  console.log("Document loaded"); 
 
  
  //timeago.render(document.querySelectorAll('.need_to_be_rendered'));

  $(".tweet-text").on('input', function(){
    console.log("IN This EVEnt")
    //Input length
    const inputVal = $(this).val().length;
    //
    const $counter= $(this).parent().find('.counter');
    let counterVal = 140;
     counterVal -= inputVal;
    //console.log(counterVal);

   $counter.val(counterVal);
  
    if(counterVal < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }
   })


   $("Form").on('submit', function(event){
    event.preventDefault();
    console.log('Submitted'); 
  
    // $.ajax(event, { method: 'POST' })
    //   .then(function (event) {
    //     console.log('Success: ', morePostsHtml);
    //     $button.replaceWith(morePostsHtml);
    //   });
  });

});

