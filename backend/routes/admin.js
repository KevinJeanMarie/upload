const express = require ("express")
const app = express()
const fs = require("fs")

//20 importer tout les users du json et renvoyer le tableau d'utilisateur avec un res.json(users) en dessous
// const users = require("../users.json")

//23 suite
const { verifyUser } = require("../middlewares/auth")

//24 éxécuter le middleware dans app.get (//14)

//25 je peut effacer la condition car j'ai éxécuter VerifyUser (la condition est déja creer dans le fichier auth.js)

//21 proteger la route --> (//14) (seul un user connecté peut avoir acces aux données)(faire une condition)
// si j'ai un user dans req.user je renvoi res.json(users) sinon je renvoi une erreur 

//14 creer une route pour si mon user est toujours connecté sur la session express et console logé pour voir si req.user est toujours accessible
app.get("/", verifyUser, (req,res) => {
    //18 enlever le console.log
    // console.log(req.user)

    fs.readFile('./users.json', (err,data) => {
        if (err) {
            console.log(err)
        } else {
            const users = JSON.parse(data)
    // if (req.user) {
        res.json(users)
    // } else {
    //     res.status(401).json({error: "Unhauthorized"})
    // }
        }

    })
})

//22 creer un dossier middleware dedans un fichier auth.js et mettre la condition (//21) a l'interieur

module.exports = app 