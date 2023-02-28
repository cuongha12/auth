import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.json('loi header')
    }
    if (token) {
        const accessToken = token.split(' ')[1]
        jwt.verify(accessToken, process.env.PORT, (err, user) => {
            if (err) return res.json('loi')
            if (!user) return res.json('user')
            req.user = user
            next()
        })
    } else {
        res.json("You are not authorized")
    }

}

export default verifyToken