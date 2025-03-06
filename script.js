const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "black";
let isBlackBackground = false;

// Start Drawing
canvas.addEventListener("mousedown", (event) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
});

// Draw Lines
canvas.addEventListener("mousemove", (event) => {
    if (drawing) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 3;
        ctx.stroke();
    }
});

// Stop Drawing
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
});

// Set Color
function setColor(color) {
    currentColor = color;
}

// Clear Board
function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isBlackBackground ? "black" : "white"; // Maintain background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Save Board
function saveImage() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "whiteboard.png";
    link.click();
}

// Add Emoji
function addEmoji(emoji) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.font = "40px Arial";
    ctx.fillText(emoji, x, y);
}

// Toggle Background
function toggleBackground() {
    isBlackBackground = !isBlackBackground;
    ctx.fillStyle = isBlackBackground ? "black" : "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Voice Recognition (Speech to Text)
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = function () {
        console.log("Voice recognition started...");
    };

    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        console.log("Recognized text:", text);

        // Display recognized text on canvas
        ctx.font = "20px Arial";
        ctx.fillStyle = isBlackBackground ? "white" : "black";
        ctx.fillText(text, canvas.width / 2 - 50, canvas.height / 2);
    };

    recognition.onerror = function (event) {
        console.log("Voice recognition error:", event.error);
    };

    recognition.start();
}
