/*
 * Date: 4/30/2019
 * Filename: index-external.js
 *
 * Copyright (c) 2019 Ibrahim Jomaa
 */

function animateSkillProgressBar(bar) {
  var skillLevel = $(bar).attr("data-level");
  $(bar).animate({width: skillLevel});
}

function handleCellIntersect(entries) {
  entries.forEach(function(cell) {
    var cellLocation = cell["target"];
    var progressBar = $(cellLocation).find(".progress-bar");

    if (cell.isIntersecting && ($(cellLocation).css("opacity") === "0")) {
      $(cellLocation).animate({opacity: 1});
      animateSkillProgressBar(progressBar);
    } else if (!cell.isIntersecting) {
      progressBar.css({width: "0%"});
      $(cellLocation).css({opacity: 0});
    }
  });
}

function createCellObserver() {
  var observer;
  var cells = $("tr");

  observer = new IntersectionObserver(handleCellIntersect);
  
  for (var i = 0; i < cells.length; i++) {
    observer.observe(cells[i]);
  }
}

function handleCardIntersect(entries) {
  const horizontalMotion = "100px";

  entries.forEach(function(card) {
    var cardLocation = card["target"];

    if (card.isIntersecting && $(cardLocation).css("left") === ("-" + horizontalMotion)) {
      $(cardLocation).animate({left: "+=" + horizontalMotion});
    } else if (!card.isIntersecting) {
      $(cardLocation).css({left: "-" + horizontalMotion});
    }
  });
}

function createCardObserver() {
  var observer;
  var cards = $(".card");

  var observer = new IntersectionObserver(handleCardIntersect);
  
  for (var i = 0; i < cards.length; i++) {
    observer.observe(cards[i]);
  }
}

function scrollToElement(event) {
  event.preventDefault();
  const Y_OFFSET = 10;
  const DELAY = 1000;

  var scrollLocation = $(event.target).attr("href");
  var y = $(scrollLocation).position().top;
  y += Y_OFFSET;

  $("html").animate({scrollTop: y}, DELAY);
}

function activateSkillProgressBars() {
  var progressBars = $(".progress-bar");

  for (var i = 0; i < progressBars.length; i++) {
    const Y_OFFSET = 30;

    var bar = progressBars[i];
    var barOffsetY = $(bar).offset().top;
    var tableOffsetY = $("table").offset().top;

    var isOnScreen = (
      (
        (window.scrollY + window.innerHeight) >= tableOffsetY) && 
      ( 
        (window.scrollY - Y_OFFSET < barOffsetY) && 
        ((window.scrollY + window.innerHeight + 30) > barOffsetY)
      )
    );

    if (isOnScreen) {
      animateSkillProgressBar(bar);
    }
  }
}

function updateScrollIndicator() {
  const Y_OFFSET = 10;

  var footer = $("footer");
  var documentHeight = footer.offset().top + footer.height();
  var documentOffset = $("header").height();

  var documentProgress = window.scrollY + window.innerHeight + documentOffset;
  if (window.scrollY <= 10) {
    documentProgress = Y_OFFSET;
  }

  var level = 100 * (documentProgress / documentHeight);
  $("#scroll-indicator").find(".progress-bar").css({width: level + "%"});
}

function addEventListeners() {
  $(window).on("scroll", updateScrollIndicator);

  $("#home-option").on("click", scrollToElement);

  $("#web-dev-option-1").on("click", scrollToElement);
  $("#portfolio-website").on("click", scrollToElement);
  $("#web-dev-option-2").on("click", scrollToElement);

  $("#about-option").on("click", scrollToElement);

  $("#skills-option").on("click", scrollToElement);
}

function setupPage() {
  addEventListeners();

  // Deals with special case when you refresh page while viewing skill progress bars.
  activateSkillProgressBars();
  
  createCardObserver();
  createCellObserver();
}

$(window).on("load", setupPage);