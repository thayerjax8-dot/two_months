document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "I can't wait to see you running around with your long stick,
    " I'm Ken Tran, your husband.",
    "You make me so h.....",
    "Can you sit on my..",
  ];

  const button = document.getElementById("heart-btn");
  const messageText = document.getElementById("message");

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageText.textContent = messages[randomIndex];
  });
});


