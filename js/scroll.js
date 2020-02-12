/*

developer: Derek Dombek
version:nav bar fade
date created: 10-16-19
date modified: 10-16-19
file description: this jQuery code adds a fade out on the nav bar when the user scrolls down on every page

*/

$(document).ready(function() {
  $(window).scroll(function(){
    if($(this).scrollTop() > 370){
      $(".topbar").css({"opacity" : "0"})
    }
    else {
      $(".topbar").css({"opacity" : "1"})
    }
  })
})
