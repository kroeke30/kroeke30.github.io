const saveReport = () => {

    var dateRange = "Nov. 7-13, 2021";
    var file = "nov7-132021"
    localStorage.setItem("savedDateRange", dateRange);
    localStorage.setItem("savedFileName", file);
    alert("Your report has been saved");

}

const displayGraph = (set) => {

    const labels = ['Sun', 'Mon','Tues','Wed','Thurs','Fri','Sat'];
    
    const data = {
        labels: labels,
        datasets: set
    };//data

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Summary of this week Events (Nov.7 - Nov. 13, 2021)',
                    color: '#030C11'
                },
            },
            elements: {
                bar: {
                    borderWidth: 1,
                }
            },
            responsive: true,
            scales: {

                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function (value) {
                            return value + ' h';
                        }
                    }
                }
            }
        }//options
    };//config

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

const displaySummary = (event, time , percentage) =>{

    const events = document.querySelector('div#events');
    let html = `
                <div class="grid-item">
                    <p >${event}</p>
                    <p>${time} h</p>
                    <p>${percentage}%</p>
                </div>`;

    events.insertAdjacentHTML('beforeend', html);
}


const parseData = () =>{
    const newData = JSON.parse(getEvents());

    let eventGroup = [];
    let eventTimes = [];
    let totalTime = 0;
    newData.forEach(element  => {
        
        let eventCategory = element.category.trim().toLowerCase();

        
        //let isThisWeek = dateFns.isThisWeek(element.start_datetime); maybe later we want to check for the current week
        let dayIndex = dateFns.format(element.start_datetime, 'd');
        let timeSpent = dateFns.differenceInHours(element.end_datetime, element.start_datetime);

        if (eventGroup.includes(eventCategory)){      

            let index = eventGroup.indexOf(eventCategory);
          
            eventTimes[index][dayIndex] += timeSpent;
        }
        else{
            eventGroup.push(eventCategory);
            eventTimes.push(new Array(7).fill(0));
            eventTimes[eventTimes.length - 1][dayIndex] = timeSpent;
        }
        totalTime += timeSpent;
    
    });

    document.querySelector('div#data-total').innerHTML = `<p class="lead">Total Time: ${totalTime} h</p>`;
    //load summary 
    eventGroup.forEach((element , index) =>{

        
        let activitySum = eventTimes[index].reduce((total , num) => total + num, 0);
        let percentage = Math.round((activitySum/totalTime) * 100);

        displaySummary(element , activitySum , percentage);
    });


    //load datasets
    let set = [];

    eventGroup.forEach((element, index) => {
        
        //get random colors
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        set.push({
            label: element,
            backgroundColor: `rgb(${r} , ${g} , ${b})`,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            data: eventTimes[index]
        });
    });

    displayGraph(set);
}

const addTask = () => {

    if(document.querySelector('#myBtn') !== null){
        document.querySelector('#myBtn').addEventListener('click' , e => {
            e.preventDefault();
            localStorage.setItem('openModal', '#addEventModal');
            window.location.href="home.html";
        });
    }
}

addTask();
parseData();

