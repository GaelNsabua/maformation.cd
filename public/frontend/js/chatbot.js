document.getElementById('chatbot-send').addEventListener('click', sendMessage);

document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const input = document.getElementById('chatbot-input').value;
  if (input) {
    addMessage('User', input);
    document.getElementById('chatbot-input').value = '';

    // Simuler une réponse du bot avec une animation de saisie
    showTypingAnimation();
    setTimeout(async () => {
      const botReply = await fetchBotReply(input);
      removeTypingAnimation();
      addMessage('Bot', botReply);
    }, 2000); // Délai simulé de 2 secondes pour la réponse
  }
}

function addMessage(sender, message) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('mb-2', 'p-2', 'rounded', 'max-w-xs');
  if (sender === 'User') {
    messageContainer.classList.add('bg-blue-100', 'self-start');
  } else {
    messageContainer.classList.add('bg-gray-100', 'self-end');
  }
  messageContainer.innerText = message;
  document.getElementById('chatbot-messages').appendChild(messageContainer);
  document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

function showTypingAnimation() {
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'typing-indicator';
  typingIndicator.classList.add('typing', 'bg-gray-100', 'p-2', 'rounded', 'max-w-xs', 'self-end');
  typingIndicator.innerText = 'Bot is typing...';
  document.getElementById('chatbot-messages').appendChild(typingIndicator);
  document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

function removeTypingAnimation() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

async function fetchBotReply(input) {
  // Remplacer par l'appel à votre API Gemini
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Here is a simulated reply to: ${input}`);
    }, 1000); // Simuler un délai de réponse de 1 seconde
  });
}
