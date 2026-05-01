const db = require('../config/db.js');

exports.getAll = (cb) => {
    db.query("SELECT * FROM users", cb);
}

exports.getOne = (id)  =>{
    return new Promise((resolve,reject) =>{
        db.query("SELECT  * FROM users WHERE id = ?", [id],(error,res)  =>{
            if(error) return reject(error);
            resolve(res[0]);
        })
    })
} 

exports.create = (data)  =>{
    const sql = "INSERT INTO users (id,name,email,password,role) VALUES (?,?,?,?,?)";
    db.query(sql,[data.id,data.name,data.email,data.password,data.role]);
} 

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
            if (err) return reject(err);

            if (res.affectedRows === 0) {
                return resolve({
                    success: false,
                    message: "Utilisateur introuvable"
                });
            }
            resolve({
                success: true,
                message: "Utilisateur supprimé avec succès"
            });
        });
    });
};

exports.updateImage = (id, image) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET image = ? WHERE id = ?";

    db.query(sql, [image, id], (error, result) => {
      if (error) {
        return reject(error);
      }

      if (result.affectedRows === 0) {
        return reject({
          success: false,
          message: "Utilisateur introuvable"
        });
      }

      resolve({
        success: true,
        message: "Image mise à jour avec succès"
      });
    });
  });
};