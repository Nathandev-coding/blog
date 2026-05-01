const Users = require('../models/usersModels');
const fs = require('fs');
const path = require("path");

exports.getAllUsers = (req,res)  =>{
    Users.getAll((error, resultat)  =>{
        if (error) return res.status(500).json(error);
        res.json(resultat);
    })
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID utilisateur manquant"
    });
  }

  try {
    const user = await Users.getOne(id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("Erreur récupération utilisateur :", error);

    return res.status(500).json({
      message: "Erreur serveur"
    });
  }
};

exports.createUser = (req, res) => {

    console.log("BODY:", req.body);

    if (!req.body) {
        return res.status(400).json({ message: "Aucune donnée reçue" });
    }

    const { id, name, email, password, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    Users.create({ id, name, email, password, role }, (err) => {

        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Erreur base de données" });
        }

        return res.status(201).json({
            message: "Utilisateur ajouté avec succès",
            user: { id, name, email, role }
        });
    });
};



exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "ID utilisateur manquant"
            });
        }

        const result = await Users.delete(id);

        // si utilisateur n'existe pas
        if (!result.success && result.affectedRows === 0) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        return res.status(200).json({
            message: "Utilisateur supprimé avec succès",
            affectedRows: result.affectedRows
        });

    } catch (error) {
        console.error("DELETE ERROR:", error);

        return res.status(500).json({
            message: "Erreur serveur lors de la suppression",
            error: error.message
        });
    }
};

exports.updateUserImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Aucune image envoyée" });
    }

    const image = req.file.filename;
    const imagePath = `../uploads/profile/${req.file.filename}`;

    await Users.updateImage(id, image);

    res.json({
      message: "Image uploadée avec succès",
      image: imagePath
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur upload" });
  }
};