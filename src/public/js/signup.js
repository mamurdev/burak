console.log("Signup Initialized");

/**
 *

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg and png!");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }

  return true; // missing in your screenshot

  const memberImage = $(".member-image").get(0).files[0]?.name ?? null;

  const memberImage = $(".member-image").get(0).files[0].name
    ? $(".member-image").get(0).files[0].name
    : null;
  if (!memberImage) {
    alert("Please insert restaurant image!");
  return false;
  }
}
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
        "error",
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
      window.showToast(
        "Avatar Loaded",
        "Restaurant preview image updated.",
        "info",
      );
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
        "error",
      );
      $(".confirm-password").focus();
      return false;
    }

    if (!imageInput[0].files || imageInput[0].files.length === 0) {
      e.preventDefault();
      window.showToast(
        "Photo Required",
        "Please select a restaurant profile image before submitting.",
        "warning",
      );
      return false;
    }

    return true;
  });
});
