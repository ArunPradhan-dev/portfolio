
document.addEventListener("DOMContentLoaded", function () {

  // ================= AOS =================
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true
  });
  // ================= Spotlight Hero =================
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      hero.style.setProperty("--x", x + "px");
      hero.style.setProperty("--y", y + "px");
    });
  }


  window.addEventListener("load", AOS.refresh);

  // ================= Navbar =================
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {

    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      toggle.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });

        nav.classList.remove("active");
        toggle.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("active");
        toggle.classList.remove("active");
      }
    });
  }



  // ================= Project Modal =================
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const close = document.querySelector(".close");

  if (modal && modalImg && close) {

    document.querySelectorAll(".project-card img").forEach(img => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.classList.add("show");
        modalImg.src = img.src;
      });
    });

    close.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.remove("show");
      }
    });
  }

  // ================= Scroll Spy =================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "home";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
  // ================= Typing Animation =================
  const typingElement = document.getElementById("typing");

  if (typingElement) {

    const words = [
      "Software Developer",
      "Full Stack Developer",
      "Computer Vision Developer",
      "AI Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (!deleting) {
        typingElement.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
          deleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 50 : 100);
    }

    type();
  }
  // ================= 3D Tilt Hero =================
  const heroText = document.querySelector(".hero h1");

  if (hero && heroText) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroText.style.transform =
        `rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroText.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }
  // ================= Timeline Animation =================
  const timeline = document.querySelector(".timeline");
  const progress = document.querySelector(".timeline-progress");
  const items = document.querySelectorAll(".timeline-item");

  if (timeline && progress) {

    window.addEventListener("scroll", () => {

      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animation only when timeline visible
      if (rect.top < windowHeight && rect.bottom > 0) {

        const visible = windowHeight - rect.top;
        const progressHeight = Math.min(visible, rect.height);

        progress.style.height = progressHeight + "px";

        // Activate glowing dots
        items.forEach(item => {
          const itemRect = item.getBoundingClientRect();

          if (itemRect.top < windowHeight * 0.75) {
            item.classList.add("active");
          }
        });
      }
    });
  }
  // ================= Multilingual Welcome =================
  const texts = [
    "নমস্কার",
    "Welcome",
    "स्वागत है",
    "Hola",
    "Bonjour"
  ];

  const welcome = document.getElementById("welcomeText");
  const preloader = document.getElementById("preloader");

  if (welcome && preloader) {

    let i = 0;

    function changeText() {
      welcome.style.opacity = 0;

      setTimeout(() => {
        welcome.textContent = texts[i];
        welcome.style.opacity = 1;
        i++;

        if (i < texts.length) {
          setTimeout(changeText, 350);   // 🔥 faster change
        } else {
          setTimeout(() => {
            preloader.style.opacity = 0;
            preloader.style.visibility = "hidden";
          }, 400);   // faster exit
        }
      }, 150);   // faster fade switch
    }

    changeText();
  }
  document.getElementById("year").textContent =
    new Date().getFullYear();

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    document.getElementById("scroll-progress").style.width = progress + "%";
  });

  document.querySelectorAll(".project-link").forEach(link => {
    link.addEventListener("click", (e) => e.stopPropagation());
  });
  //email sent
  emailjs.init("GQqmjlxTijXjGSGBA");

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const btn = document.getElementById("sendBtn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      console.log("Submitting...");

      // Loading state
      btn.innerText = "Sending...";
      btn.disabled = true;

      status.style.opacity = "1"; // reset visibility

      emailjs.sendForm("service_ffy1x7j", "template_c4d9xoq", this)
        .then(function () {

          //  Success UI
          status.innerText = " Message sent successfully!";
          status.style.color = "lightgreen";

          form.reset();

          // Restore button AFTER success
          btn.innerText = "Send Message";
          btn.disabled = false;

          // Fade + clear message
          setTimeout(() => {
            status.style.opacity = "0";
          }, 2500);

          setTimeout(() => {
            status.innerText = "";
          }, 3000);

        }, function (error) {

          //  Error UI
          status.innerText = "Failed to send message";
          status.style.color = "red";

          console.log(error);

          // Restore button AFTER error
          btn.innerText = "Send Message";
          btn.disabled = false;

          // Fade + clear message
          setTimeout(() => {
            status.style.opacity = "0";
          }, 2500);

          setTimeout(() => {
            status.innerText = "";
          }, 3000);
        });
    });
  }

  const skillLevels = {
  html: "90%",
  css: "85%",
  js: "75%",
  python: "80%",
  flask: "70%",
  git: "75%",
  mysql: "70%",
  java: "75%",
  oop: "80%",
  dbms: "75%",
  os: "70%",
  cn: "65%"
};

const skills = document.querySelectorAll(".progress");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.8;

  skills.forEach(skill => {
    const top = skill.getBoundingClientRect().top;

    if (top < trigger) {
      for (let key in skillLevels) {
        if (skill.classList.contains(key)) {
          skill.style.width = skillLevels[key];
        }
      }
    }
  });
});

});

