var isElement = require("./utils/is-element.js");

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Swiper from "swiper";

Swiper.use([Navigation, Pagination, Autoplay]);

var siteSettings = {
  imagePath: "/wp-content/themes/thebeuschers/images/",
  breakpoints: {
    xs: 0,
    s: 641,
    m: 1025,
    l: 1321,
    xl: 1921,
  },
};

window.addEventListener("load", function () {
  activateImages();
  activateCarousels();
});

function activateCarousels() {
  let currentCarousels = [];
  let carousels = document.querySelectorAll(".carousel .swiper");
  carousels.forEach((carousel, idx) => {
    currentCarousels[idx] = new Swiper(carousel, {
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}

function activateImages() {
  var backgroundImages = document.querySelectorAll("[data-bg]");
  var backgroundObjects = document.querySelectorAll("[data-bg-object]");
  for (i in backgroundObjects) {
    if (isElement(backgroundObjects[i])) {
      thisElement = backgroundObjects[i];
      var imageObj = JSON.parse(thisElement.getAttribute("data-bg-object"));
      thisElement.style.backgroundImage = imageObj.sizes
        ? "url('" + imageObj.sizes.large + "')"
        : "url('" + imageObj.url + "')";
    }
  }
  for (i in backgroundImages) {
    if (isElement(backgroundImages[i])) {
      thisElement = backgroundImages[i];
      if (thisElement.getAttribute("data-bg").indexOf("http") > -1) {
        thisElement.style.backgroundImage = "url('" + thisElement.getAttribute("data-bg") + "')";
      } else {
        thisElement.style.backgroundImage =
          "url('" + siteSettings.imagePath + thisElement.getAttribute("data-bg") + "')";
      }
    }
  }
}
