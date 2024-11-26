let queueNumber = 0;
let servingNumber = 0;

// Create an audio object for the bell sound
const bellSound = new Audio('bell.mp3');

// Function to generate a new queue number
function generateQueueNumber() {
    queueNumber += 1;
    document.getElementById('queueNumber').textContent = queueNumber;

    // Play the bell sound
    playBellSound(() => {
        // Announce the queue number after the bell sound
        announceQueue(`Your queue number is ${queueNumber}`);
    });

    // Add the new queue number to the history list
    const historyList = document.getElementById('queueHistory');
    const listItem = document.createElement('li');
    listItem.textContent = `Queue Number ${queueNumber}`;
    historyList.appendChild(listItem);
}

// Function to set the "Now Serving" number
function setNowServing() {
    if (queueNumber > servingNumber) {
        servingNumber += 1;
        document.getElementById('nowServing').textContent = `Queue Number ${servingNumber}`;

        // Play the bell sound
        playBellSound(() => {
            // Announce the "Now Serving" queue number after the bell
            announceQueue(`Serving queue number ${servingNumber}, please proceed to Sir Tres's office.`);
        });
    } else {
        document.getElementById('nowServing').textContent = "N/A";
    }
}

// Function to play the bell sound, then trigger a callback for the announcement
function playBellSound(callback) {
    console.log("Playing bell sound...");
    bellSound.currentTime = 0; // Reset the bell sound
    bellSound.play()
        .then(() => {
            // Wait for the bell sound to finish before making the announcement
            setTimeout(() => {
                if (callback) callback();
            }, bellSound.duration * 1000); // Convert duration from seconds to milliseconds
        })
        .catch(error => {
            console.error("Audio play failed:", error);
            // If the bell sound fails, make the announcement immediately
            if (callback) callback();
        });
}

// Function to announce a message using text-to-speech
function announceQueue(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

// Automatically update "Now Serving" every 5 seconds
setInterval(setNowServing, 5000);
