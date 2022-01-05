const passport = require("passport")
const passportLocal = require("passport-local")
const fs = require("fs")

const LocalStrategy = passportLocal.Strategy

// const users = require("../users.json")


//1 LocalStrategy est une classe donc on met new
passport.use(new LocalStrategy((username, password, done) => {
    //9 tester un console.log ("je suis dans....")
    // console.log("je suis dans ma strategy local")

    fs.readFile('./users.json',(err,data) => {
        if (err) {
            console.log(err)
        } else {
            const users = JSON.parse(data)

//11 enlever les 2 console.log
    // console.log(username)
    // console.log(password)

    //10 chercher dans la strategy si l'utilisateur a bien le username et le password (qui sont dans les console.log)
    // aller dans le tableau de user aller trouver celui dont le username est egal au username de mes parametre LocalStrategy juste au dessus 
    // et le user dont le password est egal aussi au password que je récupere dans mes parametre LocalStrategy
    const user = users.find(user => user.username === username && user.password === password)
    
    //12 enlever le console log 
    // console.log(user)

    //13 faire une condition (si je trouve pas de user tu me renvoi un false avec la fontion done que passport me fournit)
    //(par défaut passport renverra une erreur 401 unhautorized)
    if(!user) {
        return done(null, false)
    }
//PAS BESOIN DE METTRE DE ELSE CAR LE RETURN NOUS FAIT SORTIR DE LA FONCTION 

    //par contre si je trouve mon user je vais renvoyer mon user (req.user = user)
    return done(null, user)


    }
  })
}))

    //2 Définir le serial et deserialize
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
fs.readFile('./users.json', (err, data) => {
    if (err) {
    console.log(err)
    } else {
    const users = JSON.parse(data)
    const user = users.find(user => user.id === id)

    done(null, user)
    }
})
})

module.exports = passport 