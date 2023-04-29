let reports = [
    { dateRange: "Oct. 3-9, 2020", file: "oct3-92020"},
    { dateRange: "Oct. 17-23, 2020", file: "oct17-232020"},
  ];

function generatePDF(fileName) {
    var doc = new jsPDF();  //create jsPDF object
     doc.fromHTML(document.getElementsByTagName("html")[0],
     15,
     15, 
     {
       'width': 170  //set width
     },
     function() 
      {
       doc.save(fileName.concat(".pdf"));
     });
   }
  
function generateTable(table, data) {

    table.style = "color: #57575A; font-weight: bold;";

    for (let element of data) {
      //date range labels
      let row = table.insertRow();
      let cell1 = row.insertCell();
      let dates = document.createTextNode(element.dateRange);
      cell1.style = "border-color: rgba(87, 87, 90,0.35)";
      cell1.appendChild(dates);

      //a large blank cell
      let blankCell = row.insertCell();
      blankCell.style = "border-color: rgba(87, 87, 90,0.35)";
      blankCell.width = '50%';


      //view and export buttons
      let cell2 = row.insertCell();
      let cell3 = row.insertCell();
      let viewButtonFile = "./savedReports/".concat(element.file, ".html");
      let exportButtonFile = "./savedReports/".concat(element.file, ".pdf");
      let viewButton = document.createElement("button");
      let exportButton = document.createElement("button");
      exportButton.classList.add('btn');
      viewButton.classList.add('btn');
      cell2.style = "border-color: rgba(87, 87, 90,0.35);";
      cell3.style = "border-color: rgba(87, 87, 90,0.35)";
      viewButton.innerHTML = "View";
      exportButton.innerHTML = "Export to PDF";
      exportButton.style = 'padding: 0.8em 2em;';
      viewButton.style = 'padding: 0.8em 2em;';
      viewButton.onclick = function(){window.open(viewButtonFile, '_blank')};
      exportButton.onclick = function(){window.open(exportButtonFile, '_blank')};
      cell2.appendChild(viewButton);
      cell3.appendChild(exportButton);
    }
}

let table = document.querySelector("table");
var newDateRange = localStorage.getItem("savedDateRange");
var newFile = localStorage.getItem("savedFileName");
if(newDateRange !== null){
  reports.push({dateRange: newDateRange, file: newFile});
}
let data = Object.keys(reports[0]);
generateTable(table, reports);