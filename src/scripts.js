document.getElementById('send-button').addEventListener('click', async () => {
    const userMessage = document.getElementById('user-message').value;
    if (!userMessage.trim()) return;

    appendMessage(userMessage, 'user');

    const response = await fetch('http://localhost:5000/gemini/send-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            history: getChatHistory(),
            message: userMessage
        })
    });

    const result = await response.json();
    appendMessage(result, 'bot');

    document.getElementById('user-message').value = '';
});

function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getChatHistory() {
    const messages = document.querySelectorAll('.chat-message');
    const history = [];
    messages.forEach(message => {
        history.push({ role: message.classList.contains('user') ? 'user' : 'bot', content: message.innerText });
    });
    return history;
}
