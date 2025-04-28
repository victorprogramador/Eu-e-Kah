document.addEventListener("DOMContentLoaded", () => {
  function calcTimeSince(dateString) {
    const startDate = new Date(dateString);
    const now = new Date();

    // Subtrair 1 dia do "agora" para que o dia inicial seja o dia 0
    now.setDate(now.getDate() - 1);

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} ano(s), ${months} mês(es) e ${days} dia(s)`;
  }

  document.getElementById("counter-known").textContent = calcTimeSince("2024-10-06");
  document.getElementById("counter-friends").textContent = calcTimeSince("2024-10-29");
  document.getElementById("counter-prayer").textContent = calcTimeSince("2025-01-27");
  document.getElementById("counter-dating").textContent = calcTimeSince("2025-02-22");

  // corações flutuantes
  let heartInterval;
  let heartsActive = true;

  function createHearts() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 4) + "s";
    heart.textContent = "❤️";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }

  function startHearts() {
    if (!heartInterval) {
      heartInterval = setInterval(createHearts, 500);
    }
  }

  function stopHearts() {
    clearInterval(heartInterval);
    heartInterval = null;
  }

  document.getElementById("toggle-hearts").addEventListener("click", () => {
    if (heartsActive) {
      stopHearts();
      document.getElementById("toggle-hearts").textContent = "❤️ Retomar corações";
    } else {
      startHearts();
      document.getElementById("toggle-hearts").textContent = "💔 Pausar corações";
    }
    heartsActive = !heartsActive;
  });

  startHearts();
});
