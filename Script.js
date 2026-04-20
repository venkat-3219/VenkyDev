// When the user scrolls the page, execute myFunction 
window.onscroll = function () { myFunction() };

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";

  // Dynamic Navbar Background
  if (winScroll > 80) {
    document.getElementById("navbar").classList.add("scrolled");
  } else {
    document.getElementById("navbar").classList.remove("scrolled");
  }
}

// Nav-Bar start

const sidebar = document.getElementById('sidebar');
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');

menuBtn.addEventListener('click', () => {
  // Toggle mobile sidebar
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('active');
  } else {
    navbar.classList.toggle('active');
  }
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');
});

// Nav-bar End

// Theme Toggle Logic
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("themeIcon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.body.classList.add(currentTheme);
  if (currentTheme === "dark-theme") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark-theme";
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }

    localStorage.setItem("theme", theme);
  });
}

// Scroll Button start

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// Scroll Button End 

// About Section Start

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(e, tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  e.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");

  // Tab Indicator Animation
  const indicator = document.querySelector('.tab-indicator');
  if (indicator) {
    indicator.style.left = e.currentTarget.offsetLeft + 'px';
    indicator.style.width = e.currentTarget.offsetWidth + 'px';
  }
}

// Initialize the pill position once DOM loads
window.addEventListener('load', () => {
  const activeLink = document.querySelector('.tab-links.active-link');
  const indicator = document.querySelector('.tab-indicator');
  if (activeLink && indicator) {
    indicator.style.left = activeLink.offsetLeft + 'px';
    indicator.style.width = activeLink.offsetWidth + 'px';
  }
});

// About section End

// Education Section Start

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1200,
    once: true
  });

  VanillaTilt.init(document.querySelectorAll(".edu-card, .cert-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2
  });

  // Init 3D HUD Effect for Profile
  const profileHud = document.querySelector(".profile-hud-container");
  if (profileHud) {
    VanillaTilt.init(profileHud, {
      max: 10,          // Subtle tilt
      speed: 400,       // Fast responsive tilt
      perspective: 1000,// Deep perspective for Z-translation pop
      glare: false      // Off for images to keep it clean
    });
  }
});

//Education Section ENd

// Contact Section Start

const scriptURL = 'https://script.google.com/macros/s/AKfycbz1B4XxEOS-4Rctt6sMmvA6bJ4PNEVdiWIY6kvxc1lBtTMEll3b4GiKuepRs44ORA9m/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Added mode: 'no-cors' to bypass strict Google Apps Script CORS restrictions
  fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
    .then(response => {
      msg.innerHTML = "Thank You. Message Sent Successfully!";
      msg.style.color = "var(--theme-c)";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch(error => {
      console.error('Error!', error.message);
      msg.innerHTML = "Error sending message. Please try again.";
      msg.style.color = "red";
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
});

// Contact Section Ends

// Typed.js Start
var typed = new Typed(".auto-type", {
  strings: ["UG'2026 (ECE)", "Tech Enthusiast", "Certified Cloud Engineer"],
  typeSpeed: 60,
  backSpeed: 60,
  loop: true
});
// Typed.js End

// Header Background Animation with Vanta.js
if (document.getElementById("header")) {
  if (window.innerWidth <= 768) {
    /* Cleaner Vanta Rings for Mobile */
    VANTA.RINGS({
      el: "#header",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x4ac2c8, /* Theme cyan */
      backgroundColor: 0x0,
      backgroundAlpha: 0.0 /* Overlay on phone.jpg */
    });
  } else {
    /* WebGL Glitch / Chromatic Aberration for Desktop */
    initWebGLGlitch();
  }
}


// Certifications Carousel Logic
const track = document.getElementById("certiTrack");
const prevBtn = document.getElementById("certiPrev");
const nextBtn = document.getElementById("certiNext");

if (track && prevBtn && nextBtn) {
  let index = 0;
  const cards = track.querySelectorAll(".cert-card");
  const totalCards = cards.length;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    // Assuming each card takes up 100% / cardsPerView
    const cardRect = cards[0].getBoundingClientRect();
    const gap = parseFloat(window.getComputedStyle(track).gap) || 40;
    const moveAmount = cardRect.width + gap;

    track.style.transform = `translateX(-${index * moveAmount}px)`;

    // Update button states
    prevBtn.style.opacity = index === 0 ? '0.5' : '1';
    prevBtn.style.cursor = index === 0 ? 'not-allowed' : 'pointer';

    let maxIndex = Math.max(0, totalCards - cardsPerView);
    nextBtn.style.opacity = index >= maxIndex ? '0.5' : '1';
    nextBtn.style.cursor = index >= maxIndex ? 'not-allowed' : 'pointer';
  }

  nextBtn.addEventListener('click', () => {
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    if (index < maxIndex) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  window.addEventListener('resize', () => {
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    if (index > maxIndex) {
      index = maxIndex;
    }
    updateSlider();
  });

  let startX = 0;
  let endX = 0;
  let threshold = 50;

  track.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    endX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    if (startX - endX > threshold) {
      // Swipe left (next)
      if (index < maxIndex) {
        index++;
        updateSlider();
      }
    }
    if (endX - startX > threshold) {
      // Swipe right (prev)
      if (index > 0) {
        index--;
        updateSlider();
      }
    }
  }

  // Initialize
  setTimeout(updateSlider, 100);
}

// Projects Carousel Logic
const projTrack = document.getElementById("projTrack");
const projPrevBtn = document.getElementById("projPrev");
const projNextBtn = document.getElementById("projNext");

if (projTrack && projPrevBtn && projNextBtn) {
  let projIndex = 0;
  const projCards = projTrack.querySelectorAll(".proj");
  const totalProjCards = projCards.length;

  function getProjCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateProjSlider() {
    const cardsPerView = getProjCardsPerView();
    if (projCards.length === 0) return;
    const cardRect = projCards[0].getBoundingClientRect();
    const gap = parseFloat(window.getComputedStyle(projTrack).gap) || 40;
    const moveAmount = cardRect.width + gap;

    projTrack.style.transform = `translateX(-${projIndex * moveAmount}px)`;

    // Update button states
    projPrevBtn.style.opacity = projIndex === 0 ? '0.5' : '1';
    projPrevBtn.style.cursor = projIndex === 0 ? 'not-allowed' : 'pointer';

    let maxIndex = Math.max(0, totalProjCards - cardsPerView);
    projNextBtn.style.opacity = projIndex >= maxIndex ? '0.5' : '1';
    projNextBtn.style.cursor = projIndex >= maxIndex ? 'not-allowed' : 'pointer';
  }

  projNextBtn.addEventListener('click', () => {
    let cardsPerView = getProjCardsPerView();
    let maxIndex = Math.max(0, totalProjCards - cardsPerView);
    if (projIndex < maxIndex) {
      projIndex++;
      updateProjSlider();
    }
  });

  projPrevBtn.addEventListener('click', () => {
    if (projIndex > 0) {
      projIndex--;
      updateProjSlider();
    }
  });

  window.addEventListener('resize', () => {
    let cardsPerView = getProjCardsPerView();
    let maxIndex = Math.max(0, totalProjCards - cardsPerView);
    if (projIndex > maxIndex) {
      projIndex = maxIndex;
    }
    updateProjSlider();
  });

  let projStartX = 0;
  let projEndX = 0;
  let projThreshold = 50;

  projTrack.addEventListener('touchstart', e => {
    projStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  projTrack.addEventListener('touchend', e => {
    projEndX = e.changedTouches[0].screenX;
    handleProjSwipe();
  }, { passive: true });

  function handleProjSwipe() {
    let cardsPerView = getProjCardsPerView();
    let maxIndex = Math.max(0, totalProjCards - cardsPerView);
    if (projStartX - projEndX > projThreshold) {
      // Swipe left (next)
      if (projIndex < maxIndex) {
        projIndex++;
        updateProjSlider();
      }
    }
    if (projEndX - projStartX > projThreshold) {
      // Swipe right (prev)
      if (projIndex > 0) {
        projIndex--;
        updateProjSlider();
      }
    }
  }

  // Initialize
  setTimeout(updateProjSlider, 100);
}

// WebGL Glitch Effect logic
function initWebGLGlitch() {
  const container = document.getElementById('webgl-glitch-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(2, 2);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D tDiffuse;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uResolution;
    uniform vec2 uImageRes;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv;
      
      // Calculate object-fit cover UVs
      vec2 ratio = vec2(
        min((uResolution.x / uResolution.y) / (uImageRes.x / uImageRes.y), 1.0),
        min((uResolution.y / uResolution.x) / (uImageRes.y / uImageRes.x), 1.0)
      );
      vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      // Distance to mouse (normalized)
      float dist = distance(p, uMouse);
      
      // Glitch intensity based on mouse distance and hover state
      float intensity = smoothstep(0.4, 0.0, dist) * uHover;
      
      // Chromatic Aberration shift
      float rOffset = intensity * 0.04 * sin(uTime * 10.0);
      float gOffset = intensity * 0.02 * cos(uTime * 15.0);
      float bOffset = intensity * 0.03 * sin(uTime * 20.0);
      
      vec2 rUv = uv + vec2(rOffset, 0.0);
      vec2 gUv = uv + vec2(gOffset, rOffset);
      vec2 bUv = uv + vec2(0.0, bOffset);
      
      vec4 cr = texture2D(tDiffuse, clamp(rUv, 0.0, 1.0));
      vec4 cg = texture2D(tDiffuse, clamp(gUv, 0.0, 1.0));
      vec4 cb = texture2D(tDiffuse, clamp(bUv, 0.0, 1.0));
      
      gl_FragColor = vec4(cr.r, cg.g, cb.b, 1.0);
    }
  `;

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('Assets/Images/header.jpg', function(texture) {
    texture.minFilter = THREE.LinearFilter;
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tDiffuse: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0.0 },
        uHover: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uImageRes: { value: new THREE.Vector2(texture.image.width, texture.image.height) }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let mouse = new THREE.Vector2(0.5, 0.5);
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetHover = 0.0;
    
    document.getElementById('header').addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      // WebGL coordinate system y is flipped
      targetMouse.y = 1.0 - ((e.clientY - rect.top) / rect.height);
      targetHover = 1.0;
    });

    document.getElementById('header').addEventListener('mouseleave', () => {
      targetHover = 0.0;
    });

    window.addEventListener('resize', () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      
      // Smooth dampening for mouse movement
      mouse.lerp(targetMouse, 0.05);
      material.uniforms.uMouse.value.copy(mouse);
      
      // Smooth dampening for hover intensity
      material.uniforms.uHover.value += (targetHover - material.uniforms.uHover.value) * 0.1;
      
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      renderer.render(scene, camera);
    }
    
    animate();
  });
}
