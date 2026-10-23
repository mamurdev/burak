/**
 * BURAK PRODUCTS / MENU MANAGEMENT INTERACTIVITY
 * Instant previews, dynamic portion switcher, robust form validation, async status updates
 */

/** 

$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
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
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });
});

$(".new-product-status").on("change", async function (e) {
  const id = e.target.id;
  const productStatus = $(`#${id}.new-product-status`).val();
  console.log("id:", id);
  console.log("productStatus:", productStatus);

  try {
    const response = await axios.post(`/admin/product/${id}`, {
      productStatus: productStatus,
    });
    console.log("response:", response);
    const result = response.data;
    if (result.data) {
      console.log("Product updated!");
      $(".new-product-status").blur();
    } else alert("Product update failed!");
  } catch (err) {
    console.log(err);
    alert("Product update failed!");
  }
});



function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCollection = $(".product-collection").val();
  const productDesc = $(".product-desc").val();
  const productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please insert all details!");
    return false;
  } else return true;
}

  function previewFileHandler(input, order) {
  const imgClassName = input.className;
  console.log("input:", input);

  const file = $(`.${imgClassName}`).get(0).files[0];
  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg and png!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}

 */

$(function () {
  console.log("Burak Products Controller Initialized");

  // Dynamic switch between Dish Size and Drink Volume
  function handleCollectionChange() {
    const selected = $("#form-product-collection").val();
    if (selected === "DRINK") {
      $("#product-volume-group").slideDown(200);
      $("#form-product-volume").prop("disabled", false);

      $("#product-size-group").slideUp(200);
      $("#form-product-size").prop("disabled", true);
    } else {
      $("#product-volume-group").slideUp(200);
      $("#form-product-volume").prop("disabled", true);

      $("#product-size-group").slideDown(200);
      $("#form-product-size").prop("disabled", false);
    }
  }

  $("#form-product-collection").on("change", handleCollectionChange);
  handleCollectionChange(); // initialize correct states on load

  // Create Dish Form Drawer Toggle
  const createDrawer = $("#dish-create-card");
  const openBtn = $("#process-btn");
  const cancelBtn = $("#cancel-btn");
  const cancelBtnBottom = $("#cancel-btn-bottom");

  openBtn.on("click", function () {
    createDrawer.slideDown(350, function () {
      $("html, body").animate(
        { scrollTop: createDrawer.offset().top - 80 },
        400,
      );
      $("#form-product-name").focus();
    });
    openBtn.fadeOut(200);
  });

  function closeDrawer() {
    createDrawer.slideUp(250);
    openBtn.fadeIn(200);
  }

  cancelBtn.on("click", closeDrawer);
  cancelBtnBottom.on("click", closeDrawer);

  // Auto-open drawer if requested in query param
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("openCreate") === "true") {
    openBtn.trigger("click");
  }

  // Real-time Product Status Asynchronous Update
  $(".new-product-status").on("change", async function () {
    const select = $(this);
    const id = select.data("id") || this.id;
    const newStatus = select.val();
    const prevStatus = select.data("prev-status") || newStatus;

    // Update visual status styling classes
    select.removeClass("status-PROCESS status-PAUSE status-DELETE");
    select.addClass(`status-${newStatus}`);

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: newStatus,
      });

      if (response.data && response.data.data) {
        select.data("prev-status", newStatus);
        select.blur();
        window.showToast(
          "Menu Status Updated",
          `Dish status is now ${newStatus}.`,
          "success",
        );
      } else {
        throw new Error("Update response invalid");
      }
    } catch (err) {
      console.error("Status update error:", err);
      select.val(prevStatus);
      select.removeClass("status-PROCESS status-PAUSE status-DELETE");
      select.addClass(`status-${prevStatus}`);
      window.showToast(
        "Update Failed",
        "Could not update product status. Please try again.",
        "error",
      );
    }
  });

  // Image Upload Slots Live Preview Handlers
  function attachSlotPreview(slotIndex) {
    const slot = $(`#slot-${slotIndex}`);
    const input = $(`#file-input-${slotIndex}`);
    const preview = $(`#preview-${slotIndex}`);

    input.on("change", function () {
      const file = this.files[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        window.showToast(
          "Invalid Format",
          "Please upload only JPG, PNG, or WEBP images.",
          "error",
        );
        this.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        preview.attr("src", e.target.result).show();
        slot.addClass("has-image");
        slot.find(".overlay-text").text("Change Photo");
      };
      reader.readAsDataURL(file);
    });
  }

  for (let i = 1; i <= 5; i++) {
    attachSlotPreview(i);
  }

  // Robust Client-Side Validation on New Product Form Submit
  $("#create-product-form").on("submit", function (e) {
    const name = $("#form-product-name").val().trim();
    const price = $("#form-product-price").val().trim();
    const count = $("#form-product-count").val().trim();
    const desc = $("#form-product-desc").val().trim();
    const coverFile = $("#file-input-1")[0].files[0];

    if (!name) {
      e.preventDefault();
      window.showToast(
        "Title Required",
        "Please provide a name for the dish or salad.",
        "error",
      );
      $("#form-product-name").focus();
      return false;
    }

    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      e.preventDefault();
      window.showToast(
        "Price Required",
        "Please provide a valid price.",
        "error",
      );
      $("#form-product-price").focus();
      return false;
    }

    if (!count || isNaN(Number(count)) || Number(count) < 0) {
      e.preventDefault();
      window.showToast(
        "Stock Required",
        "Please specify the available inventory count.",
        "error",
      );
      $("#form-product-count").focus();
      return false;
    }

    if (!desc) {
      e.preventDefault();
      window.showToast(
        "Description Required",
        "Please describe the ingredients or recipe preparation.",
        "warning",
      );
      $("#form-product-desc").focus();
      return false;
    }

    if (!coverFile) {
      e.preventDefault();
      window.showToast(
        "Photo Required",
        "Please upload at least one dish photo in Cover Slot 1.",
        "warning",
      );
      $("#slot-1").addClass("pulse-error");
      setTimeout(() => $("#slot-1").removeClass("pulse-error"), 1500);
      return false;
    }

    // Ensure disabled states are correctly set before POST
    handleCollectionChange();

    return true;
  });

  // Client-Side Real-Time Filter & Search
  let activeCategory = "ALL";
  let searchQuery = "";

  function applyFilters() {
    let visibleCount = 0;

    $(".product-table-row").each(function () {
      const row = $(this);
      const rowCategory = (row.data("category") || "").toString().toUpperCase();
      const rowName = (row.data("name") || "").toString().toLowerCase();

      let matchesCategory = false;
      if (activeCategory === "ALL") {
        matchesCategory = true;
      } else if (activeCategory === "DESERT" || activeCategory === "DESSERT") {
        matchesCategory = rowCategory === "DESERT" || rowCategory === "DESSERT";
      } else {
        matchesCategory = rowCategory === activeCategory;
      }

      const matchesSearch =
        !searchQuery || rowName.includes(searchQuery.toLowerCase());

      if (matchesCategory && matchesSearch) {
        row.show();
        visibleCount++;
      } else {
        row.hide();
      }
    });

    if (visibleCount === 0) {
      $("#products-empty-row").show();
    } else {
      $("#products-empty-row").hide();
    }
  }

  // Category Tabs Click
  $(".filter-tab").on("click", function () {
    $(".filter-tab").removeClass("active");
    $(this).addClass("active");
    activeCategory = $(this).data("category").toString().toUpperCase();
    applyFilters();
  });

  // Search Input
  $("#menu-search").on("input", function () {
    searchQuery = $(this).val().trim();
    applyFilters();
  });
});
