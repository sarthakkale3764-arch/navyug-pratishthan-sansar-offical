
/* =====================================
   नवयुग प्रतिष्ठान सणसर
   Premium JavaScript - Part 1A
===================================== */

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// Close Menu on Link Click

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

    });

});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/* =====================================
   Scroll Animation
===================================== */

const sections = document.querySelectorAll("section");

const revealSection = () => {

    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < trigger) {

            section.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealSection);
window.addEventListener("load", revealSection);

/* =====================================
   Active Navigation
===================================== */

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/* =====================================
   Sticky Header + Scroll To Top
===================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (header) {

        if (window.scrollY > 50) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

});

// Scroll To Top Button

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "scroll-top";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* =====================================
   Page Loaded
===================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
/* =====================================
   Gallery Lightbox - Part 2A
===================================== */

const galleryItems = document.querySelectorAll(".gallery-item img");

const lightbox = document.createElement("div");
lightbox.className = "gallery-lightbox";

lightbox.innerHTML = `
    <span class="gallery-close">&times;</span>
    <img src="" alt="Gallery Image">
    <div class="gallery-caption">
        <h3>नवयुग प्रतिष्ठान सणसर</h3>
        <p>छायाचित्र संग्रह</p>
    </div>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".gallery-close");

galleryItems.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});
/* =====================================
   Gallery Lightbox Controls - Part 2B
===================================== */

// Close Button

closeButton.addEventListener("click", () => {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

});

// Click Outside Image

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});

// ESC Key Support

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});
/* =====================================
   Gallery Animation & Touch Support
===================================== */

// Fade Animation

lightboxImage.addEventListener("load", () => {

    lightboxImage.style.opacity = "0";

    setTimeout(() => {

        lightboxImage.style.transition = "opacity .35s ease";

        lightboxImage.style.opacity = "1";

    }, 50);

});

// Disable Image Drag

galleryItems.forEach(image => {

    image.setAttribute("draggable", "false");

});

// Touch Support

let touchStartX = 0;

lightbox.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].clientX;

});

lightbox.addEventListener("touchend", (e) => {

    const touchEndX = e.changedTouches[0].clientX;

    if (Math.abs(touchStartX - touchEndX) > 120) {

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});

// Prevent Background Scroll on Mobile

lightbox.addEventListener("touchmove", (e) => {

    e.preventDefault();

}, { passive: false });
/* =====================================
   Counter Animation
===================================== */

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = Math.max(1, Math.floor(target / 100));

        const updateCounter = () => {

            if (count < target) {

                count += speed;

                if (count > target) count = target;

                counter.innerText = count;

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const statsSection = document.querySelector(".stats");

    if (!statsSection || counterStarted) return;

    const top = statsSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        counterStarted = true;

        startCounter();

    }

});

/* =====================================
   Counter Animation - Part 3B
===================================== */

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = Number(counter.getAttribute("data-target"));

    let count = 0;

    const speed = Math.max(10, Math.floor(target / 100));

    const update = () => {

        count += speed;

        if (count >= target) {

            counter.innerText = target.toLocaleString("en-IN");

        } else {

            counter.innerText = count.toLocaleString("en-IN");

            requestAnimationFrame(update);

        }

    };

    update();

};

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});
/* =====================================
   Scroll Reveal Animation - Part 3C
===================================== */

const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .history-content, .history-image, .committee-card, .gallery-item, .timeline-item, .finance-card, .notice-card, .contact-card, .footer-content"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all .8s ease";

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";

    revealObserver.observe(item);

});

/* =====================================
   Console Message
===================================== */

console.log(
    "🚩 Navyug Pratishthan Sansar Website Loaded Successfully!"
);
/* =====================================
   Loading Screen & Page Effects
===================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }

});

/* =====================================
   Button Ripple Effect
===================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + "px";

        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";

        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* =====================================
   Current Year in Footer
===================================== */

const year = document.querySelector(".current-year");

if (year) {

    year.textContent = new Date().getFullYear();

}
/* =====================================
   Contact Form Validation
===================================== */

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector("textarea");

        if (
            name.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            alert("कृपया आवश्यक माहिती भरा.");

            return;

        }

        alert("आपला संदेश यशस्वीरित्या पाठवला गेला.");

        this.reset();

    });

}

/* =====================================
   Admin Login Button
===================================== */

const adminButton = document.querySelector(".admin-login");

if (adminButton) {

    adminButton.addEventListener("click", function (e) {

        e.preventDefault();

        const password = prompt("प्रशासक संकेतशब्द प्रविष्ट करा");

        if (password === "admin123") {

            alert("प्रशासक प्रवेश यशस्वी.");

            window.location.href = "admin.html";

        } else {

            alert("चुकीचा संकेतशब्द.");

        }

    });

}
/* =====================================
   Final Website Initialization
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚩 नवयुग प्रतिष्ठान सणसर");

    console.log("✅ HTML Loaded");
    console.log("✅ CSS Loaded");
    console.log("✅ JavaScript Loaded");

});

/* =====================================
   Disable Right Click
===================================== */

document.addEventListener("contextmenu", function(e){

    e.preventDefault();

});

/* =====================================
   Disable F12 & Developer Shortcuts
===================================== */

document.addEventListener("keydown", function(e){

    if(
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "U")
    ){

        e.preventDefault();

    }

});

/* =====================================
   Image Lazy Loading
===================================== */

document.querySelectorAll("img").forEach(img=>{

    img.loading="lazy";

});

/* =====================================
   Finished
===================================== */

console.log("🎉 Website Ready Successfully");
