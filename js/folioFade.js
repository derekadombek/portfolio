$(document).ready(function(){
    $(".bobScreenshot").mouseenter(function(){
      $(".bobScreenshot").fadeTo(500, 0);
      
    });
    $(".bobScreenshot").mouseleave(function(){
      $(".bobScreenshot").fadeTo(500, 1);
      
    });
  });