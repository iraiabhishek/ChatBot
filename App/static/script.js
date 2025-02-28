document.addEventListener("DOMContentLoaded", function () {
    loadChatHistory();
});

function sendMessage() {
    let userInputField = document.getElementById("userInput");
    let sendButton = document.getElementById("sendButton");
    let userInput = userInputField.value.trim();
    if (!userInput) return;

    let chatbox = document.getElementById("chatbox");

    // Append user message
    appendMessage("user", userInput);

    // Disable input, send button and show "Thinking..." as placeholder
    userInputField.value = "";
    userInputField.placeholder = "Thinking...";
    userInputField.disabled = true;
    sendButton.disabled = true;

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
        // Re-enable input field and send button
        userInputField.disabled = false;
        sendButton.disabled = false;
        userInputField.placeholder = "Type a message...";
        userInputField.focus();
    });
}

function appendMessage(sender, message) {
    let chatbox = document.getElementById("chatbox");
    let messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);
    messageDiv.textContent = (sender === "user" ? "You: " : "Chatbot: ") + message;

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


// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

// Load chat history from localStorage
function loadChatHistory() {
    let chatbox = document.getElementById("chatbox");
    let storedChat = localStorage.getItem("chatHistory");
    if (storedChat) {
        chatbox.innerHTML = storedChat;
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

// Clear chat history and start a new conversation
function clearChat() {
    localStorage.removeItem("chatHistory");
    document.getElementById("chatbox").innerHTML = "";
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
        themeToggleBtn.textContent = "🌙"; // Moon icon for dark mode
    } else {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light"); // Save preference
        themeToggleBtn.textContent = "☀"; // Sun icon for light mode
    }
}

// Load theme on page load
document.addEventListener("DOMContentLoaded", function () {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("themeToggleBtn").textContent = "☀";
    }
});
