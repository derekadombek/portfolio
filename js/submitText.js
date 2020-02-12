/*

developer: Derek Dombek
version:form submit text
date created: 10-16-19
date modified: 10-16-19
file description: this jQuery code shows "talk to you soon" text right when a user hits the submit button
                 on the contact form. Unlike before it just always sat there.

*/

$(document).ready(function() {
    $(function(){
        $("#lowertext").hide();
        $(".subButton").on("click", function(){
            $("#lowertext").show();
        });
    });
  })
  
  