export function generateId() {
  return "USER" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export function defaultPassword() {
  return "1234";
}

export function showToast(message, type = "success") {
  let container = document.getElementById("toastContainer");

  // créer container si absent
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className =
      "fixed top-6 right-6 z-[9999] flex flex-col gap-3";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");

  // config styles + icons Font Awesome
  let bg = "";
  let icon = "";

  switch (type) {
    case "success":
      bg = "bg-green-500/90 border-green-400";
      icon = "fa-circle-check";
      break;

    case "error":
      bg = "bg-red-500/90 border-red-400";
      icon = "fa-circle-xmark";
      break;

    case "info":
      bg = "bg-blue-500/90 border-blue-400";
      icon = "fa-circle-info";
      break;

    default:
      bg = "bg-gray-500/90 border-gray-400";
      icon = "fa-bell";
  }

  toast.className = `
    ${bg}
    text-white border
    px-4 py-3 rounded-2xl shadow-2xl
    backdrop-blur-md
    flex items-center gap-3
    min-w-[260px]
    transform translate-x-[120%]
    transition-all duration-500 ease-out
  `;

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-lg"></i>
    <span class="text-sm font-bold tracking-wide">${message}</span>
  `;

  container.appendChild(toast);

  // entrée
  requestAnimationFrame(() => {
    toast.classList.remove("translate-x-[120%]");
    toast.classList.add("translate-x-0");
  });

  // sortie automatique
  setTimeout(() => {
    toast.classList.add("translate-x-[120%]");

    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
}

export function getInitials(name) {
    const names = name.trim().split(" ");
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

