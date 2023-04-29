const fakeData = [{
  "id": 1,
  "start_datetime": "2021-01-12 08:15:00",
  "end_datetime": "2021-01-12 09:15:00 UTC",
  "event": "Phased modular definition",
  "category": "Flooring"
}, {
  "id": 2,
  "start_datetime": "2021-06-29 15:45:01",
  "end_datetime": "2021-06-29 16:45:01 UTC",
  "event": "Polarised scalable system engine",
  "category": "DFX"
}, {
  "id": 3,
  "start_datetime": "2021-10-29 13:05:38",
  "end_datetime": "2021-10-29 14:05:38 UTC",
  "event": "Customer-focused even-keeled website",
  "category": "Transportation Management"
}, {
  "id": 4,
  "start_datetime": "2021-03-16 21:44:53",
  "end_datetime": "2021-03-16 22:44:53 UTC",
  "event": "Pre-emptive discrete orchestration",
  "category": "ILM"
}, {
  "id": 5,
  "start_datetime": "2021-02-13 09:42:48",
  "end_datetime": "2021-02-13 10:42:48 UTC",
  "event": "Networked dynamic concept",
  "category": "Transportation Management"
}, {
  "id": 6,
  "start_datetime": "2021-03-21 11:52:24",
  "end_datetime": "2021-03-21 12:52:24 UTC",
  "event": "Integrated content-based customer loyalty",
  "category": "CGEIT"
}, {
  "id": 7,
  "start_datetime": "2021-01-04 11:28:43",
  "end_datetime": "2021-01-04 12:28:43 UTC",
  "event": "Vision-oriented high-level superstructure",
  "category": "RCM"
}, {
  "id": 8,
  "start_datetime": "2021-09-25 12:04:05",
  "end_datetime": "2021-09-25 13:04:05 UTC",
  "event": "Grass-roots intangible portal",
  "category": "Visual Communication"
}, {
  "id": 9,
  "start_datetime": "2020-12-22 02:19:40",
  "end_datetime": "2020-12-22 03:19:40 UTC",
  "event": "Reverse-engineered non-volatile attitude",
  "category": "Floor Plans"
}, {
  "id": 10,
  "start_datetime": "2021-06-28 10:53:09",
  "end_datetime": "2021-06-28 11:53:09 UTC",
  "event": "Grass-roots actuating superstructure",
  "category": "LPIC"
}, {
  "id": 11,
  "start_datetime": "2021-09-08 23:13:08",
  "end_datetime": "2021-09-09 00:13:08 UTC",
  "event": "Reduced asynchronous orchestration",
  "category": "QML"
}, {
  "id": 12,
  "start_datetime": "2021-11-09 17:17:19",
  "end_datetime": "2021-11-09 18:17:19 UTC",
  "event": "Profound optimal archive",
  "category": "RTI"
}, {
  "id": 13,
  "start_datetime": "2021-05-18 03:20:57",
  "end_datetime": "2021-05-18 04:20:57 UTC",
  "event": "De-engineered systemic capacity",
  "category": "Home Owners"
}, {
  "id": 14,
  "start_datetime": "2021-04-02 23:20:44",
  "end_datetime": "2021-04-03 00:20:44 UTC",
  "event": "Pre-emptive bottom-line budgetary management",
  "category": "Snow"
}, {
  "id": 15,
  "start_datetime": "2021-05-17 08:33:20",
  "end_datetime": "2021-05-17 09:33:20 UTC",
  "event": "Down-sized bandwidth-monitored task-force",
  "category": "TDMoIP"
}, {
  "id": 16,
  "start_datetime": "2021-08-18 23:42:10",
  "end_datetime": "2021-08-19 00:42:10 UTC",
  "event": "Object-based didactic workforce",
  "category": "XML Sitemaps"
}, {
  "id": 17,
  "start_datetime": "2020-12-18 02:27:53",
  "end_datetime": "2020-12-18 03:27:53 UTC",
  "event": "Digitized user-facing analyzer",
  "category": "Estate Planning"
}, {
  "id": 18,
  "start_datetime": "2021-11-11 19:46:41",
  "end_datetime": "2021-11-11 20:46:41 UTC",
  "event": "Programmable directional superstructure",
  "category": "RNA Biology"
}, {
  "id": 19,
  "start_datetime": "2021-01-26 11:56:13",
  "end_datetime": "2021-01-26 12:56:13 UTC",
  "event": "Re-contextualized 24 hour solution",
  "category": "NWDS"
}, {
  "id": 20,
  "start_datetime": "2021-07-15 23:30:39",
  "end_datetime": "2021-07-16 00:30:39 UTC",
  "event": "Intuitive mobile adapter",
  "category": "Teaching Writing"
}]

function getEvents() {
    return JSON.stringify(fakeData);
}

/* pass as a json object like so
    {
    "id": 20,
    "start_datetime": "2021-06-08 20:31:37",
    "end_datetime": "2021-06-08 21:31:37 UTC",
    "event": "Grass-roots scalable forecast",
    "category": "work"
     }
*/
function addEvents(data) {
    if(data) {
        // creating new json object
        var newEvent = {
            "id": data.id,
            "start_datetime": data.start_datetime,
            "end_datetime": data.end_datetime,
            "event": data.event,
            "category": data.category
        }
        // pushing json object to json array
        fakeData.push( newEvent );
    } else {
        console.log("No data supplied");
    }
}