$(document).ready(function() {
  $("#text").keydown(function(){
   let charCount = $("#counter").text((140 - $(this).val().length));
   if ($(this).val().length > 140) {
     $('#counter').css('color', '#FF0000');
   } else {
    $('#counter').css('color', '#000000');
   }
  });
});
