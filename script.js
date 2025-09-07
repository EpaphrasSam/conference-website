(function () {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  function initCountdown() {
    const conferenceDate = new Date("October 9, 2025 09:00:00").getTime();
    const abstractDeadline = new Date("September 10, 2025 23:59:59").getTime();
    const registrationDeadline = new Date(
      "September 20, 2025 23:59:59"
    ).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      let targetDate = conferenceDate;
      let countdownLabel = "Conference starts in:";

      if (now < abstractDeadline) {
        targetDate = abstractDeadline;
        countdownLabel = "Abstract deadline in:";
      } else if (now < registrationDeadline) {
        targetDate = registrationDeadline;
        countdownLabel = "Registration closes in:";
      }

      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElements = document.querySelectorAll(".countdown-timer");
        countdownElements.forEach((element) => {
          element.innerHTML = `
            <div class="text-center">
              <p class="text-sm text-yellow-400 font-bold mb-3">${countdownLabel}</p>
              <div class="flex gap-3 justify-center">
                <div class="text-center bg-white/10 rounded-lg p-2 min-w-[50px]">
                  <div class="text-lg md:text-xl font-bold text-white">${days}</div>
                  <div class="text-xs text-white/80 font-medium">Days</div>
                </div>
                <div class="text-center bg-white/10 rounded-lg p-2 min-w-[50px]">
                  <div class="text-lg md:text-xl font-bold text-white">${hours}</div>
                  <div class="text-xs text-white/80 font-medium">Hours</div>
                </div>
                <div class="text-center bg-white/10 rounded-lg p-2 min-w-[50px]">
                  <div class="text-lg md:text-xl font-bold text-white">${minutes}</div>
                  <div class="text-xs text-white/80 font-medium">Min</div>
                </div>
                <div class="text-center bg-white/10 rounded-lg p-2 min-w-[50px]">
                  <div class="text-lg md:text-xl font-bold text-white">${seconds}</div>
                  <div class="text-xs text-white/80 font-medium">Sec</div>
                </div>
              </div>
            </div>
          `;
        });
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, observerOptions);
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof initCountdown === "function") {
      try {
        initCountdown();
      } catch {}
    }
    initCountdown();

    document
      .querySelectorAll('a[href^="https://forms.gle"]')
      .forEach((link) => {
        link.addEventListener("click", function () {
          this.innerHTML +=
            ' <span class="inline-block animate-spin">⏳</span>';
        });
      });
    const heroFirst = document.querySelector("#hero .fade-in");
    if (heroFirst) setTimeout(() => heroFirst.classList.add("visible"), 100);
  });
})();
