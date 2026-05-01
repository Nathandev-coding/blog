import { showToast , getInitials} from "../../utils/utils.js";

function getIdUrlParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function displayUserDetails() {
    const id = getIdUrlParam();
    if (!id) {
        showToast("ID utilisateur manquant", "error");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!res.ok) {
            const errorData = await res.json();
            showToast(errorData.message || "Erreur lors de la récupération", "error");
            return;
        }
        const user = await res.json();

        document.getElementById("name").innerText = user.name;
        document.getElementById("email").innerText = user.email;
        document.getElementById("role").innerText = user.role;
        document.getElementById("registrationDate").innerText = new Date(user.created_at).toLocaleDateString();
        const avatar = document.getElementById("avatar")
        avatar.innerText = getInitials(user.name);
        const img = document.getElementById("imageProfile");
        if(user.image){
            img.src = `http://localhost:3000/uploads/${user.image}`;
            img.classList.remove('hidden');
            avatar.classList.add("hidden");
        }

        
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        showToast("Erreur réseau", "error");
    }
}

const updateImageForm = document.getElementById("updateImageForm");

updateImageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("btn");
    const id = getIdUrlParam();

    const formData = new FormData();
    
     // ✅ récupération correcte du fichier
    const fileInput = document.getElementById('images');
    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }

    const file = formData.get("image");

    if (!file || file.size === 0) {
        showToast("Aucun fichier sélectionné", "error");
        return;
    }

    try {
        btn.disabled = true;
        btn.innerText = "Chargement...";

        const res = await fetch(`http://localhost:3000/api/users/${id}/image`, {
            method: "PUT",
            body: formData
        });

        const text = await res.text();
        console.log("SERVER RESPONSE:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            throw new Error("Réponse serveur invalide (pas du JSON)");
        }

        if (res.ok) {
            showToast(data.message || "Image mise à jour avec succès");
            displayUserDetails();
        } else {
            showToast(data.message || "Erreur lors de la mise à jour", "error");
        }

    } catch (error) {
        console.error("Erreur :", error);
        showToast("Erreur lors de la mise à jour", "error");

    } finally {
        btn.disabled = false;
        btn.innerText = "Modifier profil";
    }
});;

window.onload = function() {
    displayUserDetails();
}