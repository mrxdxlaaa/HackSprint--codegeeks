// Function to update the clocks every second in IST
let timerInterval; // Variable to store timer interval

function updateClock() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istDate = new Date(now.getTime() + istOffset); // Calculate IST time

    // Update digital clock
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const timeString = istDate.toLocaleTimeString('en-US', options);
    document.getElementById("digitalClock").innerHTML = timeString;

    // Update date display
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("currentDate").innerHTML = istDate.toLocaleDateString('en-US', dateOptions);

    // Get hours, minutes, and seconds
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const seconds = istDate.getSeconds();

    // Calculate the rotation of each hand
    const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30; // 360 degrees / 12 hours = 30 degrees
    const minuteDeg = (minutes + seconds / 60) * 6; // 360 degrees / 60 minutes = 6 degrees
    const secondDeg = seconds * 6; // 360 degrees / 60 seconds = 6 degrees

    // Update the rotation of the hands
    document.getElementById("hourHand").style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.getElementById("minuteHand").style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.getElementById("secondHand").style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

// Timer functionality
let timerDuration = 0;

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    const input = document.getElementById("timerInput").value;
    timerDuration = parseInt(input) || 0; // Set timer duration from input

    if (timerDuration > 0) {
        timerInterval = setInterval(() => {
            if (timerDuration > 0) {
                timerDuration--;
                document.getElementById("timerDisplay").innerHTML = formatTime(timerDuration);
            } else {
                clearInterval(timerInterval);
                alert("Time's up!");
                document.getElementById("timerDisplay").innerHTML = "00:00";
            }
        }, 1000);
    } else {
        alert("Please enter a valid time in seconds.");
    }
}

function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
}

function resetTimer() {
    clearInterval(timerInterval); // Stop the timer
    timerDuration = 0; // Reset duration
    document.getElementById("timerDisplay").innerHTML = "00:00"; // Reset display
}

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Update the clocks every second
setInterval(updateClock, 1000);

// Initialize the clocks
updateClock();
