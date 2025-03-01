// Global interval ID for the "Thinking..." bullet animation
let thinkingIntervalId = null;

document.addEventListener("DOMContentLoaded", function () {
    // Load chat history from sessionStorage
    loadChatHistory();

    // Load saved theme
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("themeToggleBtn").textContent = "☀";
    }

    // Load saved style for header & footer
    let savedStyle = localStorage.getItem("headerFooterStyle");
    if (savedStyle) {
        document.getElementById("styleSelect").value = savedStyle;
        updateHeaderFooterStyle();
    }
});

function sendMessage() {
    let userInputField = document.getElementById("userInput");
    let sendButton = document.getElementById("sendButton");
    let userInput = userInputField.value.trim();
    if (!userInput) return;

    let chatbox = document.getElementById("chatbox");

    // Append user message
    appendMessage("user", userInput);

    // Disable input & send button
    userInputField.value = "";
    userInputField.disabled = true;
    sendButton.disabled = true;

    // Start the "Thinking..." bullet animation in the placeholder
    startThinkingAnimation(userInputField);

    // Send AJAX request to the backend
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        appendMessage("bot", data.response);
    })
    .catch(() => {
        appendMessage("bot", "Error in response.");
    })
    .finally(() => {
        // Re-enable input field & send button
        userInputField.disabled = false;
        sendButton.disabled = false;
        stopThinkingAnimation(userInputField); // Stop bullet animation
        userInputField.focus();
    });
}

function appendMessage(sender, message) {
    let chatbox = document.getElementById("chatbox");
    let messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);
//    messageDiv.textContent = (sender === "user" ? "You: " : "Chatbot: ") + message;
    messageDiv.textContent = (sender === "user" ? "" : "") + message;

    // Allow multi-line messages to be displayed properly
    messageDiv.style.whiteSpace = "pre-wrap";

    // Proper alignment
    if (sender === "user") {
        messageDiv.style.alignSelf = "flex-end";
    } else {
        messageDiv.style.alignSelf = "flex-start";
    }

    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message
    saveChatHistory();
}

// Save chat history to sessionStorage (instead of localStorage)
function saveChatHistory() {
    sessionStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

// Load chat history from sessionStorage
function loadChatHistory() {
    let chatbox = document.getElementById("chatbox");
    let storedChat = sessionStorage.getItem("chatHistory");
    if (storedChat) {
        chatbox.innerHTML = storedChat;
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

// Clear chat history and start a new conversation
function clearChat() {
    sessionStorage.removeItem("chatHistory");
    document.getElementById("chatbox").innerHTML = "";
}

// Animate the placeholder text to move "Thinking..." back and forth like a bullet
function startThinkingAnimation(inputField) {
    // Sequence of frames shifting spaces
    const frames = [
        "Thinking...",
        " Thinking..",
        "  Thinking.",
        "   Thinking",
        "  Thinking.",
        " Thinking..",
    ];
    let index = 0;

    thinkingIntervalId = setInterval(() => {
        inputField.placeholder = frames[index];
        index = (index + 1) % frames.length;
    }, 150); // Animation speed in ms
}

// Stop the bullet animation and reset placeholder
function stopThinkingAnimation(inputField) {
    if (thinkingIntervalId) {
        clearInterval(thinkingIntervalId);
        thinkingIntervalId = null;
    }
    inputField.placeholder = "Ask anything";
}

// Send message on Enter key press
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Function to toggle between light and dark mode
function toggleTheme() {
    let body = document.body;
    let themeToggleBtn = document.getElementById("themeToggleBtn");

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark"); // Save preference
        themeToggleBtn.textContent = "🌙"; // Moon icon
    } else {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light"); // Save preference
        themeToggleBtn.textContent = "☀"; // Sun icon
    }
}

// Function to update header & footer gradient style
function updateHeaderFooterStyle() {
    let style = document.getElementById("styleSelect").value;
    let header = document.querySelector("header");
    let footer = document.querySelector("footer");

    // Clear existing shadows/borders
    header.style.boxShadow = "none";
    footer.style.boxShadow = "none";
    header.style.borderBottom = "none";
    footer.style.borderTop = "none";

    if (style === "multiStop") {
        // Dark multi-stop gradient
        header.style.background = "linear-gradient(to right, #141e30, #243b55)";
        footer.style.background = "linear-gradient(to right, #141e30, #243b55)";

        header.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        header.style.borderBottom = "2px solid #444";
        footer.style.boxShadow = "0 -4px 8px rgba(0, 0, 0, 0.3)";
        footer.style.borderTop = "2px solid #444";

    } else if (style === "vibrant") {
        // Vibrant multi-stop gradient
        header.style.background = "linear-gradient(90deg, #8A2387, #E94057, #F27121)";
        footer.style.background = "linear-gradient(90deg, #8A2387, #E94057, #F27121)";

        header.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        footer.style.boxShadow = "0 -4px 8px rgba(0, 0, 0, 0.3)";

    } else if (style === "metallic") {
        // Metallic look
        header.style.background = "linear-gradient(135deg, #3f3f46, #505057 25%, #3f3f46 50%, #505057 75%, #3f3f46 100%)";
        footer.style.background = "linear-gradient(135deg, #3f3f46, #505057 25%, #3f3f46 50%, #505057 75%, #3f3f46 100%)";

        header.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        footer.style.boxShadow = "0 -4px 8px rgba(0, 0, 0, 0.3)";
    }
    localStorage.setItem("headerFooterStyle", style);
}


function updateClock() {
    let now = new Date();

    // Format date as DD-MM-YYYY
    let dateString = now.toLocaleDateString("en-GB"); // "02-03-2025"

    // Format time as HH:MM:SS AM/PM with uppercase AM/PM
    let timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).replace("am", "AM").replace("pm", "PM"); // Convert to uppercase AM/PM

    // Set the formatted date and time in the footer
    document.getElementById("footerClock").textContent = `${dateString} | ${timeString}`;
}

// Run the clock every second
setInterval(updateClock, 1000);
updateClock(); // Call once immediately

