/* ====================================
   MAIN.JS - SCROLL ANIMATIONS & GSAP
   ==================================== */

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
lenis.on("scroll", ScrollTrigger.update);

// Sync GSAP ticker with Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* ====================================
   SCROLL PROGRESS BAR
   ==================================== */
const scrollHint = document.getElementById("scrollHint");

window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + "%";

  // Hide scroll hint after scrolling
  if (scrollTop > 100) {
    scrollHint.style.opacity = "0";
  } else {
    scrollHint.style.opacity = "1";
  }
});

/* ====================================
   BACKGROUND COLOR TRANSITIONS
   ==================================== */
const body = document.body;

// Add smooth transition to body
body.style.transition = "background 1.5s ease";

// Chapter 2 - Slight warmth
ScrollTrigger.create({
  trigger: "#chapter-2",
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    body.style.background =
      "linear-gradient(to bottom, #fff7f9 0%, #ffe8ed 100%)";
  },
  onLeaveBack: () => {
    body.style.background =
      "linear-gradient(to bottom, #fff7f9 0%, #ffe8ed 50%, #ffd4df 100%)";
  },
});

// Chapter 4 - Warmer
ScrollTrigger.create({
  trigger: "#chapter-4",
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    body.style.background =
      "linear-gradient(to bottom, #ffe8ed 0%, #ffd4df 100%)";
  },
  onLeaveBack: () => {
    body.style.background =
      "linear-gradient(to bottom, #fff7f9 0%, #ffe8ed 100%)";
  },
});

// Chapter 6 - More warmth
ScrollTrigger.create({
  trigger: "#chapter-6",
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    body.style.background =
      "linear-gradient(to bottom, #ffd4df 0%, #ffc5cf 100%)";
  },
  onLeaveBack: () => {
    body.style.background =
      "linear-gradient(to bottom, #ffe8ed 0%, #ffd4df 100%)";
  },
});

// Chapter 8 - Warmest (peak emotion)
ScrollTrigger.create({
  trigger: "#chapter-8",
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    body.style.background =
      "linear-gradient(to bottom, #ffc5cf 0%, #ffb4c3 100%)";
  },
  onLeaveBack: () => {
    body.style.background =
      "linear-gradient(to bottom, #ffd4df 0%, #ffc5cf 100%)";
  },
});

/* ====================================
   CHAPTER 2 - SCALE & BREATHE EFFECT
   ==================================== */
const chapter2Lines = gsap.utils.toArray("#chapter-2 .scale-breathe");

chapter2Lines.forEach((line, index) => {
  gsap.fromTo(
    line,
    {
      opacity: 0,
      scale: 0.9,
      y: 50,
      filter: "blur(8px)",
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0)",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      delay: index * 0.12,
    },
  );
});

/* ====================================
   CHAPTER 3 - PHOTO PARALLAX & REVEAL
   ==================================== */
const photoContainer = document.getElementById("photoContainer");
const photo = document.getElementById("photo");

// Photo reveal animation
gsap.fromTo(
  photoContainer,
  {
    opacity: 0,
    scale: 0.85,
    y: 80,
    filter: "blur(10px)",
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0)",
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#chapter-3",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  },
);

// Photo parallax effect (slower scroll)
gsap.to(photo, {
  y: 60,
  ease: "none",
  scrollTrigger: {
    trigger: "#chapter-3",
    start: "top bottom",
    end: "bottom 20%",
    scrub: 2,
  },
});

// Caption fade in
gsap.fromTo(
  ".photo-caption",
  { opacity: 0, y: 20, filter: "blur(5px)" },
  {
    opacity: 0.8,
    y: 0,
    filter: "blur(0)",
    duration: 1,
    scrollTrigger: {
      trigger: photoContainer,
      start: "top 65%",
      toggleActions: "play none none none",
    },
  },
);

/* ====================================
   CHAPTER 4 - SLIDE FROM LEFT
   ==================================== */
const chapter4Lines = gsap.utils.toArray("#chapter-4 .slide-left");

chapter4Lines.forEach((line, index) => {
  gsap.fromTo(
    line,
    {
      opacity: 0,
      x: -80,
      filter: "blur(6px)",
    },
    {
      opacity: 1,
      x: 0,
      filter: "blur(0)",
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      delay: index * 0.12,
    },
  );
});

/* ====================================
   CHAPTER 5 - VIGNETTE EFFECT
   ==================================== */
const chapter5 = document.getElementById("chapter-5");

ScrollTrigger.create({
  trigger: "#chapter-5",
  start: "top center",
  end: "bottom center",
  onEnter: () => chapter5.classList.add("active"),
  onLeave: () => chapter5.classList.remove("active"),
  onEnterBack: () => chapter5.classList.add("active"),
  onLeaveBack: () => chapter5.classList.remove("active"),
});

// Fade in lines with typewriter-style sequencing
const chapter5Lines = gsap.utils.toArray("#chapter-5 .fade-in");

chapter5Lines.forEach((line, index) => {
  gsap.fromTo(
    line,
    {
      opacity: 0,
      y: 40,
      filter: "blur(6px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0)",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      delay: index * 0.12,
    },
  );
});

/* ====================================
   CHAPTER 6 - BOLD BOUNCE
   ==================================== */
const chapter6Lines = gsap.utils.toArray("#chapter-6 .bounce-in");

chapter6Lines.forEach((line, index) => {
  gsap.fromTo(
    line,
    {
      opacity: 0,
      scale: 0.75,
      y: 60,
      filter: "blur(7px)",
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0)",
      duration: 1,
      ease: "elastic.out(1, 0.7)",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      delay: index * 0.15,
    },
  );
});

/* ====================================
   CHAPTER 7 - THE PAUSE (AMBIENT)
   ==================================== */
const chapter7Text = document.querySelector("#chapter-7 .glow-pulse");

gsap.fromTo(
  chapter7Text,
  {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#chapter-7",
      start: "top 70%",
      toggleActions: "play none none none",
    },
  },
);

/* ====================================
   CHAPTER 8 - THE QUESTION
   ==================================== */
const questionText = document.querySelector("#chapter-8 .cinematic-reveal");
const buttonContainer = document.getElementById("buttonContainer");

// Question text with glow
gsap.fromTo(
  questionText,
  {
    opacity: 0,
    scale: 0.85,
    y: 60,
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.6)",
    scrollTrigger: {
      trigger: "#chapter-8",
      start: "top 70%",
      toggleActions: "play none none none",
    },
  },
);

// Buttons appear after question
gsap.fromTo(
  buttonContainer,
  {
    opacity: 0,
    y: 40,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#chapter-8",
      start: "top 65%",
      toggleActions: "play none none none",
    },
  },
);

/* ====================================
   CHAPTER 9 - SOFT ENDING LINES
   ==================================== */
const chapter9Lines = gsap.utils.toArray("#chapter-9 .gentle-float");

chapter9Lines.forEach((line, index) => {
  gsap.fromTo(
    line,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    },
  );
});

/* ====================================
   FLOATING PARTICLES ACTIVATION
   ==================================== */
const particles = document.getElementById("particles");

// Fade in particles throughout the scroll
ScrollTrigger.create({
  trigger: "#chapter-2",
  start: "top center",
  onEnter: () => {
    gsap.to(particles, { opacity: 0.3, duration: 1.5 });
    particles.classList.add("active");
  },
});

// Increase intensity at Chapter 6
ScrollTrigger.create({
  trigger: "#chapter-6",
  start: "top center",
  end: "bottom top",
  onEnter: () => {
    gsap.to(particles, { opacity: 0.6, duration: 1.5 });
  },
  onLeaveBack: () => {
    gsap.to(particles, { opacity: 0.3, duration: 1.5 });
  },
});

// Maintain particles through Chapter 8-9
ScrollTrigger.create({
  trigger: "#chapter-8",
  start: "top center",
  onEnter: () => {
    gsap.to(particles, { opacity: 0.5, duration: 1 });
  },
});

/* ====================================
   SMOOTH SECTION TRANSITIONS
   ==================================== */
const chapters = gsap.utils.toArray(".chapter");

chapters.forEach((chapter, index) => {
  // Add reveal animation as each chapter enters viewport
  gsap.from(chapter, {
    opacity: 0.8,
    y: 40,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: chapter,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Add parallax effect to chapters
  gsap.to(chapter, {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: chapter,
      start: "top center",
      end: "bottom center",
      scrub: 1.5,
      markers: false,
    },
  });
});

/* ====================================
   CHAPTER TEXT STAGGER ANIMATION
   ==================================== */
function staggerTextAnimation(selector, triggerElement) {
  const elements = gsap.utils.toArray(selector);

  elements.forEach((el, index) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 30,
        filter: "blur(5px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        delay: index * 0.15,
      },
    );
  });
}

// Apply to specific chapters that need it
staggerTextAnimation("#chapter-1 .chapter-content p", "#chapter-1");

/* ====================================
   CONSOLE MESSAGE
   ==================================== */
console.log("💕 Made with love - Smooth scroll experience initialized");
