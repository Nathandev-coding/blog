export function openModal(id,content) {
  const modal = document.getElementById(id);
  const modalContent = document.getElementById(content);

  if (!modal) return;

  modal.classList.remove("hidden");

  // petit délai pour déclencher l'animation
  setTimeout(() => {
    modalContent.classList.remove("opacity-0", "scale-95");
    modal.classList.add("opacity-100", "scale-100");
  }, 200);

  // optionnel: bloquer scroll background
  document.body.classList.add("overflow-hidden");
}

export function closeModal(id,content) {
  const modal = document.getElementById(id);
  const modalContent = document.getElementById(content);
  if (!modal) return;

  // animation de sortie
   modalContent.classList.remove("opacity-100", "scale-100");
   modalContent.classList.add("opacity-0", "scale-95");

  // attendre la fin de l'animation avant de cacher
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 200);

  document.body.classList.remove("overflow-hidden");
}