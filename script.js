let alarms = []; // Initialize an array to store alarms

// Load alarms from localStorage
function loadAlarms() {
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
        alarms = JSON.parse(storedAlarms);
        updateAlarmList();
    }
}

// Function to update the alarm list
function updateAlarmList() {
    const alarmList = document.getElementById('alarmList');
    alarmList.innerHTML = ''; // Clear the existing list

    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.textContent = `${alarm.hour}:${alarm.minute} ${alarm.amPm}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteAlarm(index);
        };
        li.appendChild(deleteButton);
        alarmList.appendChild(li);
    });
}

// Function to delete an alarm
function deleteAlarm(index) {
    alarms.splice(index, 1); // Remove the alarm from the array
    saveAlarms(); // Save updated alarms to localStorage
    updateAlarmList(); // Update the displayed list of alarms
}

// Function to save alarms to localStorage
function saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// Function to set an alarm
document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const hour = parseInt(document.getElementById('alarmHour').value);
    const minute = parseInt(document.getElementById('alarmMinute').value);
    const amPm = document.getElementById('alarmAmPm').value;

    if (hour && minute) {
        alarms.push({ hour, minute, amPm });
        saveAlarms(); // Save alarms whenever a new alarm is set
        updateAlarmList();
        checkAlarms(); // Start checking for alarms
    }
});

// Function to check and trigger alarms
function checkAlarms() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    alarms.forEach((alarm) => {
        let alarmHour = alarm.hour;
        if (alarm.amPm === "PM" && alarmHour < 12) {
            alarmHour += 12; // Convert PM hour to 24-hour format
        } else if (alarm.amPm === "AM" && alarmHour === 12) {
            alarmHour = 0; // Convert 12 AM to 0 hours
        }

        if (currentHour === alarmHour && currentMinute === alarm.minute) {
            const alarmAudio = document.getElementById('buzzSound');
            alarmAudio.play(); // Play the alarm sound
            alarms.splice(alarms.indexOf(alarm), 1); // Remove the alarm after it rings
            saveAlarms(); // Update local storage
            updateAlarmList(); // Update the displayed list of alarms
        }
    });
}

// Function to get current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Show position and display location information
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display latitude and longitude
    document.getElementById("latLong").innerHTML = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    // Example: Hardcoded location. Replace this with a proper API call if needed.
    const locationName = "Bangalore"; // Placeholder for the location name
    document.getElementById("location").innerHTML = `Location: ${locationName}`;
}

// Handle errors in getting location
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}

// Function to update the digital clock every second in IST
function updateClock() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istDate = new Date(now.getTime() + istOffset); // Calculate IST time

    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const timeString = istDate.toLocaleTimeString('en-US', options);
    document.getElementById("digitalClock").innerHTML = timeString;

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementBy
