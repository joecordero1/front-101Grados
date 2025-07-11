import { formatDistance as formatDistanceLibrary } from "date-fns";
import { es } from "date-fns/locale";
/**
 * utils to parse options string to object
 * @param {string} options
 * @return {object}
 */
export const parseOptions = function (options) {
  if ("string" === typeof options) {
    return JSON.parse(options.replace(/'/g, '"').replace(";", ""));
  }
  return {};
};

/**
 * utils to dectect IE browser
 * @return {bool}
 */
export const isIEBrowser = function () {
  let sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Trident") > -1) {
    return true;
  }

  return false;
};

/**
 * utils to detect safari browser
 * @return {bool}
 */
export const isSafariBrowser = function () {
  let sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Safari") !== -1 && sUsrAg.indexOf("Chrome") === -1)
    return true;
  return false;
};

/**
 * utils to detect Edge browser
 * @return {bool}
 */
export const isEdgeBrowser = function () {
  let sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Edge") > -1) return true;
  return false;
};

/**
 * utils to find index in array
 * @param {array} array
 * @param {callback} cb
 * @returns {number} index
 */
export const findIndex = function (array, cb) {
  for (let i = 0; i < array.length; i++) {
    if (cb(array[i])) {
      return i;
    }
  }
  return -1;
};

/**
 * utils to get the position of the first element of search array in array
 * @param {array} array
 * @param {array} searchArray
 * @param {callback} cb
 * @returns {number} index
 */
export const findArrayIndex = function (array, searchArray, cb) {
  for (let i = 0; i < searchArray.length; i++) {
    if (cb(searchArray[i])) {
      return i;
    }
  }
  return -1;
};

/**
 * utils to remove all XSS  attacks potential
 * @param {String} html
 * @return {Object}
 */
export const parseContent = (html) => {
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  //Removing the <script> tags
  while (SCRIPT_REGEX.test(html)) {
    html = html.replace(SCRIPT_REGEX, "");
  }

  //Removing all events from tags...
  html = html.replace(/ on\w+="[^"]*"/g, "");

  return {
    __html: html,
  };
};

/**
 * Apply sticky header
 */
export const stickyHeaderHandler = function () {
  let top = document.querySelector("main")
    ? document.querySelector("main").offsetTop
    : 300;

  let stickyHeader = document.querySelector(".sticky-header");
  let height = 0;

  if (stickyHeader) {
    // @ts-ignore
    height = stickyHeader.offsetHeight;
  }

  if (window.pageYOffset >= top && window.innerWidth >= 992) {
    if (stickyHeader) {
      stickyHeader.classList.add("fixed");
      if (!document.querySelector(".sticky-wrapper")) {
        let newNode = document.createElement("div");
        newNode.className = "sticky-wrapper";
        stickyHeader.parentNode.insertBefore(newNode, stickyHeader);
        document
          .querySelector(".sticky-wrapper")
          .insertAdjacentElement("beforeend", stickyHeader);
        document
          .querySelector(".sticky-wrapper")
          .setAttribute("style", "height: " + height + "px");
      }

      if (!document.querySelector(".sticky-wrapper").getAttribute("style")) {
        document
          .querySelector(".sticky-wrapper")
          .setAttribute("style", "height: " + height + "px");
      }
    }
  } else {
    if (stickyHeader) {
      stickyHeader.classList.remove("fixed");
    }

    if (document.querySelector(".sticky-wrapper")) {
      document.querySelector(".sticky-wrapper").removeAttribute("style");
    }
  }

  if (
    window.outerWidth >= 992 &&
    document.querySelector("body").classList.contains("right-sidebar-active")
  ) {
    document.querySelector("body").classList.remove("right-sidebar-active");
  }
};

/**
 * Add or remove settings when the window is resized
 */
export const resizeHandler = function (
  width = 992,
  attri = "right-sidebar-active"
) {
  let bodyClasses =
    document.querySelector("body") && document.querySelector("body").classList;
  // @ts-ignore
  bodyClasses = bodyClasses.value
    .split(" ")
    .filter((item) => item !== "home" && item !== "loaded");
  for (let i = 0; i < bodyClasses.length; i++) {
    document.querySelector("body") &&
      document.querySelector("body").classList.remove(bodyClasses[i]);
  }
};

/**
 * Apply sticky footer
 */
export const stickyFooterHandler = function () {
  let stickyFooter = document.querySelector(".sticky-footer.sticky-content");
  if (stickyFooter) {
    stickyFooter.classList.add("fixed");
  }

  // Original code that couses an 'removeChild' error when you do an scroll and logout
  // let stickyFooter = document.querySelector('.sticky-footer');
  // let top = document.querySelector('main')
  //   ? document.querySelector('main').offsetTop
  //   : 300;
  // let height = 0;
  // if (stickyFooter) {
  //   // @ts-ignore
  //   height = stickyFooter.offsetHeight;
  // }
  // if (window.pageYOffset >= top && window.innerWidth < 768) {
  //   if (stickyFooter) {
  //     stickyFooter.classList.add('fixed');
  //     if (!document.querySelector('.sticky-content-wrapper')) {
  //       let newNode = document.createElement('div');
  //       newNode.className = 'sticky-content-wrapper';
  //       stickyFooter.parentNode.insertBefore(newNode, stickyFooter);
  //       document
  //         .querySelector('.sticky-content-wrapper')
  //         .insertAdjacentElement('beforeend', stickyFooter);
  //     }
  //     document
  //       .querySelector('.sticky-content-wrapper')
  //       .setAttribute('style', 'height: ' + height + 'px');
  //   }
  // } else {
  //   if (stickyFooter) {
  //     stickyFooter.classList.remove('fixed');
  //   }
  //   if (document.querySelector('.sticky-content-wrapper')) {
  //     document
  //       .querySelector('.sticky-content-wrapper')
  //       .removeAttribute('style');
  //   }
  // }
  // if (
  //   window.innerWidth > 768 &&
  //   document.querySelector('.sticky-content-wrapper')
  // ) {
  //   // @ts-ignore
  //   document.querySelector('.sticky-content-wrapper').style.height = 'auto';
  // }
};

/**
 * utils to make background parallax
 */
export const parallaxHandler = function () {
  let parallaxItems = document.querySelectorAll(".parallax");

  if (parallaxItems) {
    for (let i = 0; i < parallaxItems.length; i++) {
      // calculate background y Position;
      let parallax = parallaxItems[i],
        yPos,
        parallaxSpeed = 1;

      if (parallax.getAttribute("data-option")) {
        parallaxSpeed = parseInt(
          parseOptions(parallax.getAttribute("data-option")).speed
        );
      }

      yPos =
        // @ts-ignore
        ((parallax.offsetTop - window.pageYOffset) * 50 * parallaxSpeed) /
          // @ts-ignore
          parallax.offsetTop +
        50;

      // @ts-ignore
      parallax.style.backgroundPosition = "50% " + yPos + "%";
    }
  }
};

/**
 * utils to show scrollTop button
 */
export const showScrollTopHandler = function () {
  let scrollTop = document.querySelector(".scroll-top");

  if (window.pageYOffset >= 768) {
    scrollTop?.classList.add("show");
  } else {
    scrollTop?.classList.remove("show");
  }
};

/**
 * utils to scroll to top
 */
export function scrollTopHandler(isCustom = true, speed = 15) {
  let offsetTop = 0;

  if (isCustom && !isEdgeBrowser()) {
    if (document.querySelector(".main .container > .row")) {
      offsetTop =
        document
          .querySelector(".main .container > .row")
          .getBoundingClientRect().top +
        window.pageYOffset -
        // @ts-ignore
        document.querySelector(".sticky-header")?.offsetHeight +
        2;
    }
  } else {
    offsetTop = 0;
  }

  if (isSafariBrowser() || isEdgeBrowser()) {
    let pos = window.pageYOffset;
    let timerId = setInterval(() => {
      if (pos <= offsetTop) clearInterval(timerId);
      window.scrollBy(0, -speed);
      pos -= speed;
    }, 1);
  } else {
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

/**
 * utils to play and pause video
 */
export const videoHandler = (e) => {
  // e.stopPropagation();
  // e.preventDefault();
  // if (e.currentTarget.closest('.post-video')) {
  //   let video = e.currentTarget.closest('.post-video');
  //   if (video.classList.contains('playing')) {
  //     video.classList.remove('playing');
  //     video.classList.add('paused');
  //     video.querySelector('video').pause();
  //   } else {
  //     // TODO:
  //     // video?.classList?.add("playing");
  //     // video.querySelector("video").play();
  //   }
  //   video.querySelector('video').addEventListener('ended', function () {
  //     video.classList.remove('playing');
  //     video.classList.remove('paused');
  //   });
  // }
};

/**
 * utils to get total Price of products in cart.
 */
export const getTotalPrice = (cartItems) => {
  let total = 0;
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * parseInt(cartItems[i].qty, 10);
    }
  }
  return total;
};

/**
 * utils to get number of products in cart
 */
export const getCartCount = (cartItems) => {
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    total += parseInt(cartItems[i].qty, 10);
  }

  return total;
};

/**
 * utils to show number to n places of decimals
 */
export const toDecimal = (price, fixedCount = 2) => {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: fixedCount,
    maximumFractionDigits: fixedCount,
  });
};

export const parseCredentials = (credentials: string): string => {
  const purgedLoginCredential = credentials.substring(
    credentials.indexOf("_") + 1
  );
  return purgedLoginCredential;
};
// function to get just business days like monday between friday
export const getBusinessDatesCount = (startDate: any, endDate: any) => {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

export const formatDistance = (date: string | Date): string => {
  return capitalizeFirstChar(
    formatDistanceLibrary(new Date(date), new Date(), {
      addSuffix: true,
      locale: es,
    })
  );
};

export const capitalizeFirstChar = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeFirstChar = (str: string): string => {
  return str.slice(1);
};

// a function to get the month name in spanish

export const getMonthName = (month: number): string => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[month - 1];
};
