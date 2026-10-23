/**
 * BURAK USERS & PATRONS DIRECTORY INTERACTIVITY
 * Segmented status filters, dynamic count updates, query param sync, and async editing
 */

/**
  $(function () {
  $(".member-status").on("change", function (e) {
    const id = e.target.id;
    console.log("id:", id);

    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus:", memberStatus);

    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        console.log("response:", response);
        const result = response.data;
        console.log("result:", result);

        if (result.data) {
          console.log("User updated!");
          $(".member-status").blur();
        } else alert("User update failed!");
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed!");
      });
  });
});

*/

$(function () {
  console.log("Burak Users Controller Initialized");

  // Read initial status filter from URL or data attribute
  const urlParams = new URLSearchParams(window.location.search);
  const initialStatus = (
    urlParams.get("status") ||
    $(".users-container").data("initial-status") ||
    "ALL"
  ).toUpperCase();

  let activeStatusFilter = initialStatus;
  let searchQuery = "";

  // Dynamic Count Recalculation Engine
  function recalculateCounts() {
    let total = 0;
    let active = 0;
    let block = 0;
    let del = 0;

    $(".user-table-row").each(function () {
      total++;
      const s = ($(this).attr("data-status") || "").toUpperCase();
      if (s === "ACTIVE") active++;
      else if (s === "BLOCK") block++;
      else if (s === "DELETE") del++;
    });

    function setValWithAnimation(selector, val) {
      const el = $(selector);
      if (el.text() !== val.toString()) {
        el.text(val).addClass("count-updated");
        setTimeout(() => el.removeClass("count-updated"), 400);
      }
    }

    setValWithAnimation("#stat-count-total, #badge-count-all, #header-total-badge", total);
    setValWithAnimation("#stat-count-active, #badge-count-active", active);
    setValWithAnimation("#stat-count-block, #badge-count-block", block);
    setValWithAnimation("#stat-count-delete, #badge-count-delete", del);
  }

  // Filter application
  function applyUserFilters() {
    let visibleCount = 0;
    let totalRows = 0;

    $(".user-table-row").each(function () {
      totalRows++;
      const row = $(this);
      const rowStatus = (row.attr("data-status") || "").toUpperCase();
      const rowNick = (row.data("nick") || "").toString().toLowerCase();
      const rowPhone = (row.data("phone") || "").toString().toLowerCase();

      const matchesStatus =
        activeStatusFilter === "ALL" || rowStatus === activeStatusFilter;
      const matchesSearch =
        !searchQuery ||
        rowNick.includes(searchQuery.toLowerCase()) ||
        rowPhone.includes(searchQuery.toLowerCase());

      if (matchesStatus && matchesSearch) {
        row.show();
        visibleCount++;
      } else {
        row.hide();
      }
    });

    $("#visible-users-count").text(visibleCount);

    if (visibleCount === 0) {
      $("#users-empty-row").show();
    } else {
      $("#users-empty-row").hide();
    }

    // Show/hide reset link
    if (activeStatusFilter !== "ALL" || searchQuery.length > 0) {
      $("#filter-reset-link").show();
    } else {
      $("#filter-reset-link").hide();
    }
  }

  // Activate Tab Function
  function setActiveTab(status) {
    activeStatusFilter = status.toUpperCase();

    // Update segmented bar tabs
    $(".segmented-tab").removeClass("active");
    $(`.segmented-tab[data-status="${activeStatusFilter}"]`).addClass("active");

    // Update 4-card metric strip selected state
    $(".user-stat-card").removeClass("card-selected");
    $(`.user-stat-card[data-filter="${activeStatusFilter}"]`).addClass("card-selected");

    // Sync URL without reloading
    const currentUrl = new URL(window.location);
    if (activeStatusFilter === "ALL") {
      currentUrl.searchParams.delete("status");
    } else {
      currentUrl.searchParams.set("status", activeStatusFilter);
    }
    window.history.replaceState({}, "", currentUrl);

    applyUserFilters();
  }

  // Segmented Tab Click
  $(".segmented-tab").on("click", function () {
    const status = $(this).data("status");
    setActiveTab(status);
  });

  // Metric Stat Card Click (triggers corresponding filter)
  $(".user-stat-card").on("click", function () {
    const filter = $(this).data("filter");
    if (filter) {
      setActiveTab(filter);
    }
  });

  // Reset link click
  $("#filter-reset-link").on("click", function () {
    $("#user-search").val("");
    searchQuery = "";
    $("#clear-search-btn").hide();
    setActiveTab("ALL");
  });

  // Search Input with Clear Button
  $("#user-search").on("input", function () {
    searchQuery = $(this).val().trim();
    if (searchQuery.length > 0) {
      $("#clear-search-btn").show();
    } else {
      $("#clear-search-btn").hide();
    }
    applyUserFilters();
  });

  $("#clear-search-btn").on("click", function () {
    $("#user-search").val("");
    searchQuery = "";
    $(this).hide();
    applyUserFilters();
  });

  // Asynchronous Member Status Update
  $(".member-status").on("change", async function () {
    const select = $(this);
    const id = select.data("id") || this.id;
    const newStatus = select.val();
    const prevStatus = select.data("prev-status") || newStatus;
    const row = select.closest(".user-table-row");

    // Visual select class updates
    select.removeClass("status-ACTIVE status-BLOCK status-DELETE");
    select.addClass(`status-${newStatus}`);

    try {
      const response = await axios.post("/admin/user/edit", {
        _id: id,
        memberStatus: newStatus,
      });

      if (response.data && response.data.data) {
        select.data("prev-status", newStatus);
        row.attr("data-status", newStatus);

        // Recalculate live counts for all tabs & stat cards
        recalculateCounts();

        // Re-apply filters with subtle transition
        applyUserFilters();

        select.blur();
        window.showToast(
          "Patron Status Updated",
          `User access status is now ${newStatus}.`,
          "success"
        );
      } else {
        throw new Error("Update response error");
      }
    } catch (err) {
      console.error("User status update error:", err);
      select.val(prevStatus);
      select.removeClass("status-ACTIVE status-BLOCK status-DELETE");
      select.addClass(`status-${prevStatus}`);
      row.attr("data-status", prevStatus);
      window.showToast(
        "Update Failed",
        "Could not update patron status. Please verify permissions.",
        "error"
      );
    }
  });

  // Click to Copy Phone Number
  $(".phone-copy-btn").on("click", function () {
    const phone = $(this).data("phone");
    if (!phone) return;

    navigator.clipboard
      .writeText(phone)
      .then(() => {
        window.showToast(
          "Copied to Clipboard",
          `Telephone ${phone} copied.`,
          "info"
        );
      })
      .catch((err) => {
        console.error("Clipboard error:", err);
      });
  });

  // Initialize with initial status
  setActiveTab(activeStatusFilter);
  recalculateCounts();
});
