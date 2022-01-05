const express = require("express")
const app = express()
const port = 5000
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")


//6 importer les route du dossier routes
const authRoutes = require("./routes/auth")

//15 importer ma route admin
const adminRoutes = require("./routes/admin")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

//obliger de mettre sa pour pouvoir lire mon body
app.use(express.json())

//3 Configurer la session (resave: true) veut dire qu'a chaque requète qu'on fais on update la session pour qu'elle soit toujours a jour
// saveUnitilized veut dire qu'on ne le fais pas la première fois vu que resave est a true
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

//afficher l'image dans le dossier public
app.use(express.static('public'));

//4 dire a mon app qu'elle utilisera passport.initialize pour initialiser passport
// et on va connecté la session passport a la session d'express 
app.use(passport.initialize())
app.use(passport.session())

//7 mon application utilise sur le préfixe auth les routes qu'on a importer au dessus (//6) . (/login) est en vérité (/auth/login)
app.use("/auth", authRoutes)

//16 mon application utilise sur le préfixe admin...
app.use("admin", adminRoutes)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})