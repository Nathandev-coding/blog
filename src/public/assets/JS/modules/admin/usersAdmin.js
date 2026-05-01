import { openModal,closeModal } from "../../utils/modal.js";
import { generateId, defaultPassword ,showToast} from "../../utils/utils.js";


export function initProduit(){
    document.getElementById('btnAdd').addEventListener("click", () =>{
        openModal("userModal","modalContent");
    })

   document.getElementById('btnClose').addEventListener("click", ()  =>{
    closeModal('userModal','modalContent')
   });

   displayUsers();
   deleteUser();


}

export async function displayUsers(){

    const tableUsers = document.getElementById('tableUsers');
    const res = await fetch('http://localhost:3000/api/users');
    const users = await res.json();

    tableUsers.innerHTML = "";

    users.forEach(u => {
        const row = document.createElement('tr');
        row.classList.add('group')
        row.innerHTML = `
                   <td class="px-8 py-5">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                  👤
                </div>
                <div>
                  <p class="text-sm font-bold text-white">${u.name}</p>
                  <p class="text-[10px] text-blue-100/30 font-bold">${u.email}</p>
                </div>
              </div>
            </td>

            <td class="px-8 py-5">
              <span class="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-black uppercase">
                ${u.role}
              </span>
            </td>

            <td class="px-8 py-5 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onclick="deleteUser('${u.id}')"  class="p-2 bg-blue-900/30 rounded-lg text-blue-400">✏️</button>
                <button class="p-2 bg-red-500/10 rounded-lg text-red-400">🗑️</button>
                <button onclick="window.location.href = '/a/userDetail?id=${u.id}'" class="p-2 bg-red-500/10 rounded-lg text-red-400">🗑️</button>
              </div>
            </td>
        `
        tableUsers.appendChild(row);
    });
}

window.deleteUser = async function(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
      showToast(data.message || "Utilisateur supprimé avec succès");
      displayUsers();
    } else {
      showToast(data.message || "Erreur lors de la suppression", "error");
    }

  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    showToast("Erreur réseau", "error");
  }
}
const form = document.getElementById("userForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("submitBtn");

    const donnee = {
        id: generateId(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        role: document.getElementById("role").value,
        password: defaultPassword()
    };

    try {
        btn.disabled = true;
        btn.innerText = "Chargement...";

        const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donnee)
        });

        // 🔥 IMPORTANT: vérifier si réponse vide
        let data = null;
        try {
            data = await res.json();
        } catch (e) {
            console.warn("Réponse non JSON");
        }

        console.log("RESPONSE:", res);
        console.log("DATA:", data);

        if (res.ok) {
            showToast("Utilisateur ajouté avec succès");
            displayUsers();
            form.reset();

            // 🔥 assure fermeture correcte
            setTimeout(() => {
                closeModal("userModal","modalContent");
            }, 300);

        } else {
            showToast(data?.message || "Erreur lors de l'insertion", "error");
        }

    } catch (error) {
        console.error("Erreur réseau:", error);
        showToast("Serveur inaccessible", "error");

    } finally {
        btn.disabled = false;
        btn.innerText = "CRÉER LE COMPTE";
    }
});




initProduit();