import React from "react";

function Heading() {
  var d = new Date();
  var day = d.getDay();
  var daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();

  var dateStr = daylist[day] + " , " + date + "-" + month + "-" + year;
  return <h1 id="heading">{dateStr}</h1>;
}

export default Heading;
