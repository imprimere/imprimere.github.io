var MIN_ID = 0;
var MAX_ID = 8;

$(function() {
  initPopup();
});

$(window).resize(function() {
  initPopup();
});


$("#member-photo li").click(function() {
  var src = $(this).find("img").attr("src").replace("/thumb", "");
  var photoId = $(this).attr("id").match(/\d+/);
  updateNavButton(0, photoId);
  showPopup(src, photoId);
});

$("#popup-shadow, #popup-close").click(function() {
  $("#popup").hide();
});

$("#popup-next").click(function() {
  showNextToPhoto(this, 1);
});

$("#popup-prev").click(function() {
  showNextToPhoto(this, -1);
});

function showNextToPhoto(target, direction) {
  var shownPhotoId = parseInt($("#popup-photo").data("id"));
  if((direction == 1 && shownPhotoId < MAX_ID)
    || (direction == -1 && shownPhotoId > MIN_ID)) {
    var photoId = shownPhotoId + 1 * direction;
    var src = $("#popup-" + photoId).find("img").attr("src").replace("/thumb", "");
    updateNavButton(direction, photoId);
    showPopup(src, photoId);
  }
}

function updateNavButton(direction, photoId) {
  if((direction == 1 || direction == 0) && photoId == MAX_ID) {
    $("#popup-next").hide();
  } else if((direction == -1 || direction == 0) && photoId == MIN_ID) {
    $("#popup-prev").hide();
  } else {
    $("#popup-next, #popup-prev").show();
  }
}

function showPopup(src, id) {
  $("#popup-photo").attr("src", src);
  $("#popup-photo").data("id", id);
  $("#popup").show();
}

function initPopup() {
  var popupWidth = window.innerWidth * 0.8;
  var popupHeight = window.innerHeight * 0.8;

  if(popupWidth * 0.75 > popupHeight) {
    popupWidth = popupHeight * 4 / 3;
  } else {
    popupHeight = popupWidth * 0.75;
  }

  $("#popup-content").css({
    "width": popupWidth + 20,
    "height": popupHeight + 20,
    "marginLeft": -(popupWidth + 20)/2,
    "marginTop": -(popupHeight + 20)/2
  });
}