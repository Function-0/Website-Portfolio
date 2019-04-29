/*
 * Date: 4/30/2019
 * Filename: mac-project-external.js
 *
 * Copyright (c) 2019 Ibrahim Jomaa
 */

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
  
  // Skip hero image.
  for (var i = 1; i < cards.length; i++) {
    observer.observe(cards[i]);
  }
}

function handleMediaIntersect(entries) {
  entries.forEach(function(media) {
    var mediaLocation = media["target"];

    if (media.isIntersecting && $(mediaLocation).css("opacity") === "0") {
      $(mediaLocation).animate({opacity: 1});
    } else if (!media.isIntersecting) {
      $(mediaLocation).css({opacity: 0});
    }
  });
}

function createMediaObserver() {
  var observer;
  var medias = $(".media");

  var observer = new IntersectionObserver(handleMediaIntersect);
  
  for (var i = 0; i < medias.length; i++) {
    observer.observe(medias[i]);
  }
}

function handleContentIntersect(entries) {
  const horizontalMotion = "100px";

  entries.forEach(function(content) {
    var contentLocation = content["target"];

    if (content.isIntersecting && $(contentLocation).css("left") === ("-" + horizontalMotion)) {
      $(contentLocation).animate({left: "+=" + horizontalMotion});
    } else if (!content.isIntersecting) {
      $(contentLocation).css({left: "-" + horizontalMotion});
    }
  });
}

function createContentObserver() {
  var observer;
  var contents = $("#summary p");

  var observer = new IntersectionObserver(handleContentIntersect);
  
  for (var i = 0; i < contents.length; i++) {
    observer.observe(contents[i]);
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
}

function setupPage() {
  addEventListeners();
  createContentObserver();
  createMediaObserver();
  createCardObserver();
}

$(window).on("load", setupPage);