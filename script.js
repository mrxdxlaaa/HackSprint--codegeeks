// Digital Clock with Date
function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('en-US', options);
    const digitalClock = now.toLocaleTimeString('en-US', { hour12: true });

    document.getElementById('digitalClock').innerHTML = digitalClock;
    document.getElementById('currentDate').innerHTML = currentDate;
}

// Function to toggle between Digital and Analog Clock
function toggleAnalog() {
    const analogClock = document.getElementById('analogClock');
    const digitalClockSection = document.getElementById('digitalClockSection');

    if (analogClock.classList.contains('hidden')) {
        digitalClockSection.classList.add('hidden');
        analogClock.classList.remove('hidden');
        updateAnalogClock();
    } else {
        digitalClockSection.classList.remove('hidden');
        analogClock.classList.add('hidden');
    }
}

// Function to update Analog Clock
function updateAnalogClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const hourDeg = (hour % 12) * 30 + (minute / 60) * 30;
    const minuteDeg = minute * 6 + (second / 60) * 6;
    const secondDeg = second * 6;

    document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${secondDeg}deg)`;

    setTimeout(updateAnalogClock, 1000); // Update every second
}

// Initial setup for Analog Clock on page load
document.addEventListener('DOMContentLoaded', () => {
    updateClock(); // Set the digital clock
});
