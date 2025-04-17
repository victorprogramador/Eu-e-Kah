function setTargetDate(dateString, timeString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  }
  
  let targetDate;
  
  // Verifica se tem data salva no localStorage
  if (localStorage.getItem("savedDate") && localStorage.getItem("savedTime")) {
    targetDate = setTargetDate(localStorage.getItem("savedDate"), localStorage.getItem("savedTime"));
  } else {
    // valor padrão inicial
    targetDate = setTargetDate("2025-04-12", "19:00");
  }
  
  const waitingMessages = [
    "Cada segundo me aproxima do teu sorriso, meu amor! 😊",
    "Mal posso esperar para estar ao seu lado, minha vida! ❤️",
    "Contando os minutos para te ver de novo, meu bem! 😻",
    "Meu coração acelera a cada segundo que passa, amor! 💫"
  ];
  
  let messageIndex = 0;
  let countdownInterval;
  
  function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;
  
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  
    const messageElement = document.getElementById("message");
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      messageElement.textContent = "Meu amor, chegou o momento de te abraçar, Kah! 💕";
      document.querySelector(".countdown").style.display = "none";
      document.getElementById("newDateForm").style.display = "block";
    }
  }
  
  function updateMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = waitingMessages[messageIndex];
    messageIndex = (messageIndex + 1) % waitingMessages.length;
  }
  
  countdownInterval = setInterval(updateCountdown, 1000);
  setInterval(updateMessage, 30000);
  updateCountdown();
  updateMessage();
  
  document.getElementById("printBtn").addEventListener("click", () => {
    const container = document.querySelector(".container");
  
    html2canvas(container, {
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      useCORS: true,
      scale: 2 // melhora a qualidade da imagem capturada
    }).then(canvas => { 
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          alert("Imagem copiada para a área de transferência! 🥰");
        }).catch(err => {
          console.error("Erro ao copiar para a área de transferência:", err);
          alert("Erro ao copiar a imagem 😢");
        });
      });
    });
  });  
  
  document.getElementById("newDateForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newDate = document.getElementById("newDate").value;
    const newTime = document.getElementById("newTime").value;
  
    if (newDate && newTime) {
      localStorage.setItem("savedDate", newDate);
      localStorage.setItem("savedTime", newTime);
  
      targetDate = setTargetDate(newDate, newTime);
      document.querySelector(".countdown").style.display = "flex";
      this.style.display = "none";
      countdownInterval = setInterval(updateCountdown, 1000);
      updateCountdown();
    }
  });
  