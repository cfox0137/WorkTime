// document.getElementById("start").addEventListener("click", Counting(1));
// document.getElementById("stop").addEventListener("click", Counting(0));

var innerTimer;
var result;
var ticketNumber;
var archiveElement;
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var archive = document.getElementById("Table");

stop.style.visibility = "hidden";


///testy

function Counting(counting) {
  if (counting == 1) {

    //show stop

    stop.style.visibility = "visible";

    //set date when button was clicked
    var startTime = new Date();

    //take ticket number
    ticketNumber = document.getElementById("ticket-number").value;

    // wyswiet co sekunde ilosc secund ktore minely od wcisniecia start
    innerTimer = setInterval(startTimeFunction, 1000);

    function startTimeFunction() {
      //take actual time
      var innerCurrentDate = new Date();
      //calculate difference in miliseconds
      var timePassedSinceStart = Math.abs(startTime - innerCurrentDate);
      //time conversion
      (seconds = Math.floor((timePassedSinceStart / 1000) % 60)),
        (minutes = Math.floor((timePassedSinceStart / (1000 * 60)) % 60)),
        (hours = Math.floor((timePassedSinceStart / (1000 * 60 * 60)) % 24));

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      result = hours + ":" + minutes + ":" + seconds;
      // display the result
      document.getElementById("working-on").innerHTML =
        ticketNumber + " " + result;
    }

    //hide strat button
    start.style.visibility = "hidden";


  }

  if (counting == 0) {

     //hide stop button
     stop.style.visibility = "hidden";


    //take the current time spent from working on section
   

    //save it to the logged hours section as an additional entry to the existing ones
    archiveElement = "<tr><td>" + ticketNumber + "</td><td>" + result + "</td></tr><br>";

    archive.insertAdjacentHTML("afterbegin",archiveElement);

    // stop counting
    clearInterval(innerTimer);

    //somehow erease or stop what is going on in the working on section
    document.getElementById("working-on").innerHTML = "";

    document.getElementById("ticket-number").innerHTML.value = "";

      // unhide start 
      start.style.visibility = "visible";

  }
}

//Current time clock
var logoTimer = setInterval(currentTimeClock, 1000);
function currentTimeClock() {
  var currentDate = new Date();
  document.getElementById("timer").innerHTML = currentDate.toLocaleTimeString();
}

function exportTableToExcel (tableID, filename ="summary"){

  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';

   // Create download link element
   downloadLink = document.createElement("a");

   document.body.appendChild(downloadLink);

   
   if(navigator.msSaveOrOpenBlob){
    var blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
    });
    navigator.msSaveOrOpenBlob( blob, filename);
}else{
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    // Setting the file name
    downloadLink.download = filename;
    
    //triggering the function
    downloadLink.click();
}


}