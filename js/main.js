(function($) {

	"use strict";

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
	});

})(jQuery);

var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false
})





  /*----------------------
---- RoW testimonial slider js -----
------------------------*/
let efi_testimonial_carousel = document.querySelector(".efi_testimonial_carousel");

let efi_testimonial_carouselInner = document.querySelector(
  ".efi_testimonial_carousel-inner"
);

let prev = document.querySelector(".efi_testimonial_carousel-controls .prev");

let next = document.querySelector(".efi_testimonial_carousel-controls .next");

let slides = document.querySelectorAll(
  ".efi_testimonial_carousel-inner .efi_testimonial_carousel-item"
);

let totalSlides = slides.length;

let step = 100 / totalSlides;

let activeSlide = 0;

let activeIndicator = 0;

let direction = -1;

let jump = 1;

let interval = 5000; /*5000*/

let time;

//Init efi_testimonial_carousel
efi_testimonial_carouselInner.style.minWidth = totalSlides * 100 + "%";
loadIndicators();
loop(true);

//efi_testimonial_carousel events

next.addEventListener("click", () => {
  slideToNext();
});

prev.addEventListener("click", () => {
  slideToPrev();
});

efi_testimonial_carouselInner.addEventListener("transitionend", () => {
  if (direction === -1) {
    if (jump > 1) {
      for (let i = 0; i < jump; i++) {
        activeSlide++;
        efi_testimonial_carouselInner.append(
          efi_testimonial_carouselInner.firstElementChild
        );
      }
    } else {
      activeSlide++;
      efi_testimonial_carouselInner.append(
        efi_testimonial_carouselInner.firstElementChild
      );
    }
  } else if (direction === 1) {
    if (jump > 1) {
      for (let i = 0; i < jump; i++) {
        activeSlide--;
        efi_testimonial_carouselInner.prepend(
          efi_testimonial_carouselInner.lastElementChild
        );
      }
    } else {
      activeSlide--;
      efi_testimonial_carouselInner.prepend(
        efi_testimonial_carouselInner.lastElementChild
      );
    }
  }

  efi_testimonial_carouselInner.style.transition = "none";
  efi_testimonial_carouselInner.style.transform = "translateX(0%)";
  setTimeout(() => {
    jump = 1;
    efi_testimonial_carouselInner.style.transition = "all ease .5s";
  });
  updateIndicators();
});

document
  .querySelectorAll(".efi_testimonial_carousel-indicators span")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      let slideTo = parseInt(e.target.dataset.slideTo);
      let indicators = document.querySelectorAll(
        ".efi_testimonial_carousel-indicators span"
      );

      indicators.forEach((item, index) => {
        if (item.classList.contains("active")) {
          activeIndicator = index;
        }
      });
      if (slideTo - activeIndicator > 1) {
        jump = slideTo - activeIndicator;
        step = jump * step;
        slideToNext();
      } else if (slideTo - activeIndicator === 1) {
        slideToNext();
      } else if (slideTo - activeIndicator < 0) {
        if (Math.abs(slideTo - activeIndicator) > 1) {
          jump = Math.abs(slideTo - activeIndicator);
          step = jump * step;
          slideToPrev();
        }
        slideToPrev();
      }
      step = 100 / totalSlides;
    });
  });

efi_testimonial_carousel.addEventListener("mouseover", () => {
  loop(false);
});

efi_testimonial_carousel.addEventListener("mouseout", () => {
  loop(true);
});

//efi_testimonial_carousel functions

function loadIndicators() {
  slides.forEach((slide, index) => {
    if (index === 0) {
      document.querySelector(
        ".efi_testimonial_carousel-indicators"
      ).innerHTML += `<span data-slide-to="${index}" class="active"></span>`;
    } else {
      document.querySelector(
        ".efi_testimonial_carousel-indicators"
      ).innerHTML += `<span data-slide-to="${index}"></span>`;
    }
  });
}

function updateIndicators() {
  if (activeSlide > totalSlides - 1) {
    activeSlide = 0;
  } else if (activeSlide < 0) {
    activeSlide = totalSlides - 1;
  }
  document
    .querySelector(".efi_testimonial_carousel-indicators span.active")
    .classList.remove("active");
  document
    .querySelectorAll(".efi_testimonial_carousel-indicators span")
    [activeSlide].classList.add("active");
}

function slideToNext() {
  if (direction === 1) {
    direction = -1;
    efi_testimonial_carouselInner.prepend(
      efi_testimonial_carouselInner.lastElementChild
    );
  }

  efi_testimonial_carousel.style.justifyContent = "flex-start";
  efi_testimonial_carouselInner.style.transform = `translateX(-${step}%)`;
}

function slideToPrev() {
  if (direction === -1) {
    direction = 1;
    efi_testimonial_carouselInner.append(
      efi_testimonial_carouselInner.firstElementChild
    );
  }
  efi_testimonial_carousel.style.justifyContent = "flex-end";
  efi_testimonial_carouselInner.style.transform = `translateX(${step}%)`;
  loop(false);
}

function loop(status) {
  if (status === true) {
    time = setInterval(() => {
      slideToNext();
    }, interval);
  } else {
    clearInterval(time);
  }
}
// pov loader add. before full load js pov none.
document.addEventListener("DOMContentLoaded", function () {
  efi_testimonial_carousel.style.display = "flex";
});

/*-----------------------
--- End Row js testimonial ----
------------------------*/