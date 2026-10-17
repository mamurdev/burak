console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-volume").show();
      $("#product-collection").hide();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(200);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      const result = response.data;
      if (result.data) {
        $(`#${id}.new-product-status`).blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });
});

function previewFileHandler(input, order) {
  const imageSection = $(`#image-section-${order}`);
  const file = input.files[0];
  const fileType = file ? file["type"] : "";
  const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!validImageTypes.includes(fileType)) {
    alert("Please insert only allowed formats: (jpeg, jpg, png)");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        imageSection.attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}

$(function () {
  $(".image-one").on("change", function () {
    previewFileHandler(this, 1);
  });
  $(".image-two").on("change", function () {
    previewFileHandler(this, 2);
  });
  $(".image-three").on("change", function () {
    previewFileHandler(this, 3);
  });
  $(".image-four").on("change", function () {
    previewFileHandler(this, 4);
  });
  $(".image-five").on("change", function () {
    previewFileHandler(this, 5);
  });
});
