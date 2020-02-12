/*

developer: Derek Dombek
verison:headshot fade
date created: 10-16-19
date modified: 10-16-19
file description: this jQuery code adds a fade out and in at 50% to my headshot photo on my home page.

*/

$(document).ready(function(){
    $(".my-picture").mouseenter(function(){
      $(".my-picture").fadeTo(1000, 0.5);
      
    });
    $(".my-picture").mouseleave(function(){
      $(".my-picture").fadeTo(1000, 1.0);
      
    });
  });