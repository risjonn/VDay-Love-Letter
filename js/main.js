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
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* ====================================
   SCROLL PROGRESS BAR
   ==================================== */
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

/* ====================================
   BACKGROUND COLOR TRANSITIONS
   ==================================== */
const body = document.body;

ScrollTrigger.create({
  trigger: '#chapter-4',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => body.classList.add('bg-warm'),
  onLeaveBack: () => body.classList.remove('bg-warm'),
});

ScrollTrigger.create({
  trigger: '#chapter-8',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => body.classList.add('bg-warmest'),
  onLeaveBack: () => body.classList.remove('bg-warmest'),
});

/* ====================================
   CHAPTER 2 - SCALE & BREATHE EFFECT
   ==================================== */
const chapter2Lines = gsap.utils.toArray('#chapter-2 .scale-breathe');

chapter2Lines.forEach((line, index) => {
  gsap.fromTo(line,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
      }
    }
  );
});

/* ====================================
   CHAPTER 3 - PHOTO PARALLAX & REVEAL
   ==================================== */
const photoContainer = document.getElementById('photoContainer');
const photo = document.getElementById('photo');

// Photo reveal animation
gsap.fromTo(photoContainer,
  {
    opacity: 0,
    scale: 0.95,
  },
  {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#chapter-3',
      start: 'top 70%',
      end: 'top 30%',
    }
  }
);

// Photo parallax effect (slower scroll)
gsap.to(photo, {
  y: 100,
  ease: 'none',
  scrollTrigger: {
    trigger: '#chapter-3',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});

// Caption fade in
gsap.fromTo('.photo-caption',
  { opacity: 0, y: 10 },
  {
    opacity: 0.7,
    y: 0,
    duration: 0.8,
    delay: 0.5,
    scrollTrigger: {
      trigger: photoContainer,
      start: 'top 60%',
    }
  }
);

/* ====================================
   CHAPTER 4 - SLIDE FROM LEFT
   ==================================== */
const chapter4Lines = gsap.utils.toArray('#chapter-4 .slide-left');

chapter4Lines.forEach((line, index) => {
  gsap.fromTo(line,
    {
      opacity: 0,
      x: -40,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
      }
    }
  );
});

/* ====================================
   CHAPTER 5 - VIGNETTE EFFECT
   ==================================== */
const chapter5 = document.getElementById('chapter-5');

ScrollTrigger.create({
  trigger: '#chapter-5',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => chapter5.classList.add('active'),
  onLeave: () => chapter5.classList.remove('active'),
  onEnterBack: () => chapter5.classList.add('active'),
  onLeaveBack: () => chapter5.classList.remove('active'),
});

// Fade in lines with typewriter-style sequencing
const chapter5Lines = gsap.utils.toArray('#chapter-5 .fade-in');

chapter5Lines.forEach((line, index) => {
  gsap.fromTo(line,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 75%',
      }
    }
  );
});

/* ====================================
   CHAPTER 6 - BOLD BOUNCE
   ==================================== */
const chapter6Lines = gsap.utils.toArray('#chapter-6 .bounce-in');

chapter6Lines.forEach((line, index) => {
  gsap.fromTo(line,
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: line,
        start: 'top 75%',
      }
    }
  );
});

/* ====================================
   CHAPTER 7 - THE PAUSE (AMBIENT)
   ==================================== */
const chapter7Text = document.querySelector('#chapter-7 .glow-pulse');

gsap.fromTo(chapter7Text,
  {
    opacity: 0,
    scale: 0.95,
  },
  {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#chapter-7',
      start: 'top 60%',
    }
  }
);

/* ====================================
   CHAPTER 8 - THE QUESTION
   ==================================== */
const questionText = document.querySelector('#chapter-8 .cinematic-reveal');
const buttonContainer = document.getElementById('buttonContainer');

// Question text with glow
gsap.fromTo(questionText,
  {
    opacity: 0,
    scale: 0.9,
  },
  {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
    scrollTrigger: {
      trigger: '#chapter-8',
      start: 'top 60%',
    }
  }
);

// Buttons appear after question
gsap.fromTo(buttonContainer,
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#chapter-8',
      start: 'top 60%',
    }
  }
);

/* ====================================
   CHAPTER 9 - SOFT ENDING LINES
   ==================================== */
const chapter9Lines = gsap.utils.toArray('#chapter-9 .gentle-float');

chapter9Lines.forEach((line, index) => {
  gsap.fromTo(line,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 80%',
      }
    }
  );
});

/* ====================================
   FLOATING PARTICLES ACTIVATION
   ==================================== */
const particles = document.getElementById('particles');

// Show particles in warmer chapters
ScrollTrigger.create({
  trigger: '#chapter-6',
  start: 'top center',
  end: 'bottom top',
  onEnter: () => {
    gsap.to(particles, { opacity: 1, duration: 2 });
  },
  onLeaveBack: () => {
    gsap.to(particles, { opacity: 0, duration: 2 });
  },
});

/* ====================================
   CONSOLE MESSAGE
   ==================================== */
console.log('💕 Made with love');