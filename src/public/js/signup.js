/**
 * BURAK RESTAURANT SIGNUP INTERACTIVITY
 * Live image preview, password matching verification, file format checks
 */

$(function () {
  console.log("Burak Signup Controller Initialized");

  const imageInput = $("#input-file");
  const previewImg = $("#signup-avatar-preview");
  const fileNameDisplay = $("#avatar-file-name");

  // Live Avatar Preview
  imageInput.on("change", function () {
    const file = this.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      window.showToast(
        "Invalid Format",
        "Please select a JPG, PNG, or WEBP image file.",
        "error"
      );
      this.value = "";
      return;
    }

    if (fileNameDisplay.length) {
      fileNameDisplay.text(file.name);
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.attr("src", e.target.result);
      window.showToast("Avatar Loaded", "Restaurant preview image updated.", "info");
    };
    reader.readAsDataURL(file);
  });

  // Client-Side Validation on Submit
  $("#signup-form").on("submit", function (e) {
    const password = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();

    if (password !== confirmPassword) {
      e.preventDefault();
      window.showToast(
        "Password Mismatch",
        "The passwords entered do not match. Please re-check.",
        "error"
      );
      $(".confirm-password").focus();
      return false;
    }

    if (!imageInput[0].files || imageInput[0].files.length === 0) {
      e.preventDefault();
      window.showToast(
        "Photo Required",
        "Please select a restaurant profile image before submitting.",
        "warning"
      );
      return false;
    }

    return true;
  });
});
