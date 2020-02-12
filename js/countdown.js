"use strict"

/*

Original Author: Derek Dombek
Date Created:08-26-19
Version:clock js
Date Last Modified:09-26-19
Modified by:Derek Dombek
Modification log: adjusted the date.

 
*/
runClock();
setInterval("runClock()", 1000);
/* function to create and run the countdown clock */
function runClock() {
/* Store the current date and time */
var currentDay = new Date();
var dateStr = currentDay.toLocaleDateString();
var timeStr = currentDay.toLocaleTimeString();

/* Display the current date and time */

/* calculate the days until bio rel */
var bioRel = new Date("October 7, 2019");
var nextYear = currentDay.getFullYear();
bioRel.setFullYear(nextYear);
var daysLeft = (bioRel - currentDay)/(1000*60*60*24);

/*Display the time left until bio rel */
var hrsLeft = (daysLeft - Math.floor(daysLeft))*24;

/*calc the mins and secs left in the current hour*/
var minsLeft = (hrsLeft - Math.floor(hrsLeft))*60;
var secsLeft = (minsLeft - Math.floor(minsLeft))*60;

/* Display the time left until bio rel */
document.getElementById("days").textContent = Math.floor(daysLeft);
document.getElementById("hrs").textContent = Math.floor(hrsLeft);
document.getElementById("mins").textContent = Math.floor(minsLeft);
document.getElementById("secs").textContent = Math.floor(secsLeft);
}