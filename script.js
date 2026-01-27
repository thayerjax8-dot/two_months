document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "I love you more every day 🥹",
    "Two months already, forever to go ❤️",
    "You make my life better 💫",
    "I’m so lucky to have you 💕",
    "This is just the beginning 😌"
  ];

  const button = document.getElementById("heart-btn");
  const messageText = document.getElementById("message");

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageText.textContent = messages[randomIndex];
  });
});


