/**
 * BURAK RESTAURANT - GLOBAL INTERACTION ENGINE
 * Toast notifications, admin profile popover, navigation active states, robust logout
 */

// Global Toast System
window.showToast = function (title, message, type = "info", duration = 3500) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const iconMap = {
    success: "fa-solid fa-circle-check",
    error: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info",
    warning: "fa-solid fa-bell",
  };

  const toast = document.createElement("div");
  toast.className = `burak-toast toast-${type}`;
  toast.innerHTML = `
    <div class="burak-toast-icon">
      <i class="${iconMap[type] || iconMap.info}"></i>
    </div>
    <div class="burak-toast-content">
      <div class="burak-toast-title">${title}</div>
      <div class="burak-toast-msg">${message}</div>
    </div>
    <button type="button" class="close text-muted ml-2" style="font-size: 1rem; opacity: 0.6;" onclick="this.parentElement.remove()">
      &times;
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
};

// Robust, Direct Logout Handler
window.handleLogout = function (e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (confirm("Are you sure you want to end your current session and sign out?")) {
    window.location.href = "/admin/logout";
  }
  return false;
};

// Global page load initializations
document.addEventListener("DOMContentLoaded", function () {
  console.log("Burak Haute Gastronomy UI Loaded");

  // Highlight active link in navbar based on current pathname
  const currentPath = window.location.pathname;
  document.querySelectorAll(".burak-nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      (href !== "/admin" && href !== "/admin/" && currentPath.startsWith(href))
    ) {
      link.classList.add("active");
    }
  });

  // Admin Profile Section Popover Dropdown Toggle
  $(document).on("click", "#admin-profile-trigger", function (e) {
    e.stopPropagation();
    const trigger = $(this);
    const popover = $("#admin-profile-popover");
    const isVisible = popover.is(":visible");

    if (isVisible) {
      popover.fadeOut(150);
      trigger.removeClass("active");
      trigger.attr("aria-expanded", "false");
    } else {
      popover.fadeIn(200);
      trigger.addClass("active");
      trigger.attr("aria-expanded", "true");
    }
  });

  // Close Admin Popover when clicking outside or pressing Escape
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#admin-profile-popover, #admin-profile-trigger").length) {
      $("#admin-profile-popover").fadeOut(150);
      $("#admin-profile-trigger").removeClass("active").attr("aria-expanded", "false");
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#admin-profile-popover").fadeOut(150);
      $("#admin-profile-trigger").removeClass("active").attr("aria-expanded", "false");
    }
  });
});
