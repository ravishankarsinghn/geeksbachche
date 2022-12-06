"use strict";

const header = document.querySelector(".header");
const sectionMain = document.querySelector("#section-main");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

const headerHeight = header.getBoundingClientRect().height;

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"><button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Sticky header

const stickyHeaderFunc = function () {
  const stickyHeader = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) header.classList.add("sticky");
    else header.classList.remove("sticky");
  };

  const headerObserver = new IntersectionObserver(stickyHeader, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  });
  headerObserver.observe(sectionMain);
};
stickyHeaderFunc();
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// scrolling to section
const scrollSection = function () {
  navLinks.addEventListener("click", function (e) {
    if (!e.target.classList.contains("nav__link--btn")) {
      e.preventDefault();
    }
    if (e.target.classList.contains("nav__link")) {
      // matching strategy
      const id = e.target.getAttribute("href");
      document
        .querySelector(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
};
scrollSection();

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Menu fade animation
const menuFade = function () {
  // Function
  const handleHover = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      const logo = link.closest(".nav").querySelector("#logo");
      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  };

  nav.addEventListener("mouseover", function (e) {
    handleHover(e, 0.5);
  });

  nav.addEventListener("mouseout", function (e) {
    handleHover(e, 1.0);
  });
};
menuFade();

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
