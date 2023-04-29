const loginForm = document.getElementById("loginpage");
const loginButton = document.getElementById("loginpageSubmit");

let events = JSON.parse(getEvents());


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
 ];
var selectedDate;

function logoutFunc(){
    alert("You have successfully logged out.");
     window.location.href="index.html";
}
function openNav() {
    document.getElementById("mySidenav").style.width = "25%";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function addEventFn(e){

  e.preventDefault();

  const getEmailVal=document.getElementById("title");
  const getCategoryVal=document.getElementById("category");
  const getNotesVal=document.getElementById("notes");
  const getStartDateVal=document.getElementById("startdate");
  const getEndDateVal=document.getElementById("enddate");
  const getStartTimeVal=document.getElementById("starttime");
  const getEndTimeVal=document.getElementById("endtime");
  const newData={
    "id": 0,
    "start_datetime": getStartDateVal.value+" "+getStartTimeVal.value+":00",
    "end_datetime": getEndDateVal.value+" "+getEndTimeVal.value+":00 UTC",
    "event": getEmailVal.value,
    "category": getCategoryVal.value
     };
    if(getEmailVal.value===""){
      document.getElementById("titleError").style.visibility="visible";
      document.getElementById("title").style.border="1px solid red";

    }
    if(getStartDateVal.value===""){
      document.getElementById("startdateError").style.visibility="visible";
      document.getElementById("startdate").style.border="1px solid red";

    }
    if(getEndDateVal.value===""){
      document.getElementById("enddateError").style.visibility="visible";
      document.getElementById("enddate").style.border="1px solid red";

    }
    if(getStartTimeVal.value===""){
      document.getElementById("starttimeError").style.visibility="visible";
      document.getElementById("starttime").style.border="1px solid red";

    }
    if(getEndTimeVal.value===""){
      document.getElementById("endtimeError").style.visibility="visible";
      document.getElementById("endtime").style.border="1px solid red";

    }

     
    if(getStartDateVal.value!=="" && getStartTimeVal.value!==""&& getEndDateVal.value!==""&& getEndTimeVal.value!==""&& getEmailVal.value!==""&& getCategoryVal.value!==""){
      addEvents(newData);
      showTodayEvent();
      updateEventSummary();

      modal.style.display = "none";

      document.querySelector('.modal-body form').reset();
    
      document.querySelectorAll('.error').forEach(element => {
         element.style.visibility = "hidden"
      });

      document.querySelectorAll('.modal-body form input').forEach(element => {
        element.style.border=" 2px solid rgba(0,0,0,0.3)";
      });


      let notification = document.querySelector('div.alert');
       
      notification.removeAttribute('hidden')
      notification.classList.add('animate__fadeInDown');
     

      setTimeout(() => {
         notification.classList.remove('animate__fadeInDown');
         notification.classList.add('animate__fadeOutUp');

          notification.onanimationend = () =>{
              notification.setAttribute('hidden', true);
             notification.classList.remove('animate__fadeOutUp');
          }
      }, 2500);

    }
   
    return false;
}
function addCategoryFn(){
  var y=document.getElementById("customCategory");
  var x=document.getElementById("category");
  if(y.value===""){
    document.getElementById("customCatError").style.visibility="visible";
    document.getElementById("customCatError").style.color="red";
    document.getElementById("customCategory").style.border="1px solid red";

  }
  if(y.value!==""){
    var option=document.createElement("option");
    option.text=y.value;
    x.add(option);
    y.value="";
    document.getElementById("customCatError").style.visibility="hidden";
    document.getElementById("customCategory").style.border="1px solid #ccc";
  }
}
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = dateFns.format(new Date(), 'dddd, MMM DD');

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="date today selected">${i}</div>`;
    } else {
      days += `<div class ="date">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }

};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();


//this function helps toggles on/off(show/hide) the event summary 
const toggleEventSummary = () =>{

   const hideEvents = document.querySelector('div#memo div.header a');
   const eventList = document.querySelector('div#memo ul');
  
    if(hideEvents.classList.contains('on')){
      
      //hide summary

      hideEvents.classList.remove('on');
      hideEvents.classList.add('off');
      hideEvents.innerHTML = 'Show Summary';
      eventList.classList.remove('animate__backInDown');
      eventList.classList.add('animate__backOutUp');

      setTimeout(() => {
         eventList.setAttribute('hidden', true);
      }, 1000);
    
    }
    else{

      //show summary
      hideEvents.classList.remove('off');
      hideEvents.classList.add('on');
      eventList.removeAttribute('hidden');
      eventList.classList.remove('animate__backOutUp');
      eventList.classList.add('animate__backInDown');     

      hideEvents.innerHTML = 'Hide Summary';

    }

}
//show the events of today by default 

const showTodayEvent = () => {

    events = JSON.parse(getEvents())
  
  let arrayOfEvents = [];
  //get todates date
  let currDate = new Date().getDate();
  let monthIndex = new Date().getMonth();

  //find the events for the current date
  events.forEach(element => {

    let day = dateFns.getDate(element.start_datetime);
    let dayIndex = parseInt(dateFns.format(element.start_datetime, 'MM'));

    if(day === currDate && dayIndex === (monthIndex+1) ){ 

      arrayOfEvents.push( element.event.trim());
    
    }//if

  });//forEach()

   

  let listOfEvents = document.getElementById("myUL");

  let collectDateString =  dateFns.format(`${months[monthIndex]} ${currDate}` , 'MMM Do');
  document.querySelector(".header h3 ").innerHTML="Event Summary for "+collectDateString;

  if(arrayOfEvents.length === 0){ // if there are no events for today, 

    listOfEvents.innerHTML = '<p class="text-center"> No Event on this day </p>';
    
  }
  else{
    let currDayEvent = " ";

    arrayOfEvents.forEach(element => {
        currDayEvent += `<li> ${element} </li>`;
    });

    listOfEvents.innerHTML = currDayEvent;

    if(!document.querySelector('div#memo div.header a').classList.contains('on'))
        toggleEventSummary();

  }//if-else
}

showTodayEvent();


const updateEventSummary = function (){


   events = JSON.parse(getEvents())
  const calendar = document.querySelector('div.calendar');

  calendar.addEventListener( 'click' , e => {

    if(e.target.classList.contains('date')){
        
      let selectedDate =  document.querySelector('div.selected');

      if(selectedDate !== null) {

          selectedDate.classList.remove('selected');
      }
      
      let dateClicked = e.target;
      dateClicked.classList.add('selected');

      let currDate = parseInt(dateClicked.innerHTML);
      
      let currMonth= document.querySelector(".date h1").innerHTML;


      let lastDateNumber=  function(y,m) {
          return new Date(y, m+1,0).getDate();
      }

      let monthIndex = months.indexOf(currMonth);

      if(currDate >= 1 && currDate <= lastDateNumber(2021,monthIndex)){

          let collectDateString = dateFns.format(`${months[monthIndex]} ${currDate}` , 'MMM Do');;
          document.querySelector(".header h3 ").innerHTML="Event Summary for "+collectDateString;
      }


      let arrayOfEvents = [];
        //get the events for the current date the user clicked
      events.forEach(element => {

        let day = dateFns.getDate(element.start_datetime);
        let dayIndex = parseInt(dateFns.format(element.start_datetime, 'MM'));
       
        if(day === currDate && dayIndex === (monthIndex+1) ){ 

          arrayOfEvents.push( element.event.trim());  
        }//if

      });//forEach()

   

      let listOfEvents = document.getElementById("myUL");
      let currDayEvent =" ";

      if(arrayOfEvents.length === 0){
          currDayEvent = '<p class="text-center"> No Event on this day </p>';
      }
      else{
        arrayOfEvents.forEach(element => {
          currDayEvent += `<li> ${element} </li>`;
        });
      }

      if(document.querySelector('div#memo div.header a').classList.contains('off')){
          toggleEventSummary();
      }
      

      listOfEvents.innerHTML = currDayEvent;
     
    }//if()


  });//onclick()

}

updateEventSummary();

const showEventSummary = () => {

   document.querySelector('div#memo div.header a').addEventListener('click' , toggleEventSummary);
}

showEventSummary();




//can collect selected day and month like this
window.onclick = e =>{


    if (e.target == modal) {
      modal.style.display = "none";

      document.getElementById("title").value="";
      document.getElementById("startdate").value="";
      document.getElementById("enddate").value="";
      document.getElementById("starttime").value="";
      document.getElementById("endtime").value="";

      // document.getElementById("titleError").style.visibility="hidden";
      // document.getElementById("startdateError").style.visibility="hidden";
      // document.getElementById("enddateError").style.visibility="hidden";
      // document.getElementById("starttimeError").style.visibility="hidden";
      // document.getElementById("endtimeError").style.visibility="hidden";
      
      // document.getElementById("title").style.border="1px solid #ccc";
      // document.getElementById("startdate").style.border="1px solid #ccc";
      // document.getElementById("enddate").style.border="1px solid #ccc";
      // document.getElementById("starttime").style.border="1px solid #ccc";
      // document.getElementById("endtime").style.border="1px solid #ccc";
    }
    
}


// var myNodelist = document.querySelector("#myUL li");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;

  var t = document.createTextNode(inputValue);

  li.appendChild(t);

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }

  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

//open modal if redirected from report

const openModal = () =>{
  let modalId = localStorage.getItem('openModal');
  if(modalId !== null){
     modal.style.display = "block";
      localStorage.removeItem('openModal');
  }
}

openModal();

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById("title").value="";
  document.getElementById("startdate").value="";
    document.getElementById("enddate").value="";
    document.getElementById("starttime").value="";
    document.getElementById("endtime").value="";

    document.getElementById("titleError").style.visibility="hidden";
    document.getElementById("startdateError").style.visibility="hidden";
    document.getElementById("enddateError").style.visibility="hidden";
    document.getElementById("starttimeError").style.visibility="hidden";
    document.getElementById("endtimeError").style.visibility="hidden";
    document.getElementById("title").style.border="1px solid #ccc";
    document.getElementById("startdate").style.border="1px solid #ccc";
    document.getElementById("enddate").style.border="1px solid #ccc";
    document.getElementById("starttime").style.border="1px solid #ccc";
    document.getElementById("endtime").style.border="1px solid #ccc";
}
