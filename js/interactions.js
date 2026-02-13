/* ====================================
   INTERACTIONS.JS - BUTTON & MICRO-INTERACTIONS
   ==================================== */

/* ====================================
   BUTTON CLICK HANDLERS
   ==================================== */
const btnYes = document.getElementById("btnYes");
const btnAlways = document.getElementById("btnAlways");
const chapter8 = document.getElementById("chapter-8");
const chapter9 = document.getElementById("chapter-9");

// Function to handle button click
function handleValentineResponse() {
  // Add ripple effect
  this.classList.add("clicked");

  // Scale animation on click
  gsap.to(this, {
    scale: 0.95,
    duration: 0.1,
    ease: "back.out",
    yoyo: true,
    repeat: 1,
  });

  // Haptic feedback (if supported)
  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 30]);
  }

  // Smooth scroll to Chapter 9
  setTimeout(() => {
    // Fade out Chapter 8
    gsap.to(chapter8, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        chapter8.style.pointerEvents = "none";
        chapter8.style.visibility = "hidden";
      },
    });

    // Reset and fade in Chapter 9
    chapter9.style.opacity = "1";
    chapter9.style.pointerEvents = "auto";
    chapter9.style.visibility = "visible";

    gsap.to(chapter9, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "power2.inOut",
    });

    // Smooth scroll to Chapter 9
    lenis.scrollTo(chapter9, {
      offset: 0,
      duration: 2.5,
      easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    });

    // Trigger confetti/hearts explosion
    createHeartExplosion();
  }, 300);
}

// Attach click handlers
btnYes.addEventListener("click", handleValentineResponse);
btnAlways.addEventListener("click", handleValentineResponse);

/* ====================================
   HEART EXPLOSION EFFECT
   ==================================== */
function createHeartExplosion() {
  const colors = ["#FFB6C1", "#FF69B4", "#E89BA7", "#D4828F"];
  const heartCount = 30;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💗";
    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.userSelect = "none";

    document.body.appendChild(heart);

    // Random direction
    const angle = (Math.PI * 2 * i) / heartCount;
    const velocity = Math.random() * 300 + 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    // Animate heart
    gsap.to(heart, {
      x: tx,
      y: ty,
      opacity: 0,
      rotation: Math.random() * 360,
      duration: Math.random() * 2 + 1,
      ease: "power2.out",
      onComplete: () => heart.remove(),
    });
  }
}

/* ====================================
   BUTTON HOVER EFFECTS
   ==================================== */
const allButtons = document.querySelectorAll(".valentine-button");

allButtons.forEach((button) => {
  // Mouse move parallax effect
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });

  // Hover glow effect
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      boxShadow:
        "0 0 30px rgba(232, 155, 167, 0.6), 0 8px 25px rgba(232, 155, 167, 0.4)",
      duration: 0.3,
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      boxShadow: "0 4px 15px rgba(232, 155, 167, 0.3)",
      duration: 0.3,
    });
  });
});

/* ====================================
   CUSTOM CURSOR (OPTIONAL)
   ==================================== */
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.15s ease;
  display: none;
`;

document.body.appendChild(cursor);

// Show custom cursor on desktop only
if (window.innerWidth > 768) {
  cursor.style.display = "block";

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  // Enlarge cursor on interactive elements
  const interactiveElements = document.querySelectorAll(
    "button, a, .photo-container",
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: "rgba(232, 155, 167, 0.2)",
        duration: 0.3,
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
    });
  });
}

/* ====================================
   PHOTO HOVER EFFECT
   ==================================== */
const photoImg = document.getElementById("photo");

if (photoImg && window.innerWidth > 768) {
  photoImg.addEventListener("mouseenter", () => {
    gsap.to(photoImg, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  photoImg.addEventListener("mouseleave", () => {
    gsap.to(photoImg, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
}

/* ====================================
   EASTER EGG - KONAMI CODE
   ==================================== */
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg: Extra heart explosion
    createHeartExplosion();
    createHeartExplosion();
    console.log("💕💕💕 Love multiplied! 💕💕💕");
  }
});

/* ====================================
   PREVENT RIGHT CLICK ON PHOTO (OPTIONAL)
   ==================================== */
if (photoImg) {
  photoImg.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    // Show a cute message
    const message = document.createElement("div");
    message.textContent = "💕 This moment is just for us";
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem 2rem;
      border-radius: 10px;
      font-family: var(--font-clean);
      color: var(--text-accent);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 9999;
    `;

    document.body.appendChild(message);

    gsap.fromTo(
      message,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to(message, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            delay: 1.5,
            onComplete: () => message.remove(),
          });
        },
      },
    );
  });
}
