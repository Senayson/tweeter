$(document).ready(function() {
  console.log("Document loaded");

  $("#tweet-text").on('input', function(){
    const val = $(this).val().length;
    const counter= $(this).parent().find('.counter').val();
    $('.counter').val(counter - val);
  })
  

});