
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
