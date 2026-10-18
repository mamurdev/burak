/**
 * BURAK COMMAND CENTER / HOME INTERACTIVITY
 */

$(function () {
  console.log("Burak Command Center Controller Initialized");

  // Subtle interactive hover ripples on action cards
  $(".burak-card").on("mouseenter", function () {
    $(this).find(".burak-card-icon").css("transform", "scale(1.08) rotate(-4deg)");
  }).on("mouseleave", function () {
    $(this).find(".burak-card-icon").css("transform", "");
  });
});
