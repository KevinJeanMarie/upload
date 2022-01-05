//22 suite/ mettre la condition --> (//21) 

const verifyUser = (req,res, next) => {
    if (!req.user) {
        next()
    } else {
        res.status(401).json({ error: "Unauthorized" })
    }
  }

  module.exports = {
      verifyUser
  }

  //23 exporter le middleware et le mettre dans admin.js pour eviter d'avoir retaper la condition si jamais je veux proteger d'autre routes