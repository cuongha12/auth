import jwt from 'jsonwebtoken';
import db from "../models";
import bcrypt from 'bcrypt'

let refresh = []

const generateAccessToken = (user) => {
    return jwt.sign({ user }, process.env.PORT, { expiresIn: '15s' })
}
const generateRefreshToken = (user) => {
    return jwt.sign({ user }, process.env.PORT, { expiresIn: '365d' })
}


export const readUser = () => new Promise(async (resolve, reject) => {
    try {

        const response = await db.User.findAndCountAll()
        return resolve({
            mess: response[1] ? 'that bai' : 'thanh cong',
            data: response
        })
    } catch (error) {
        reject(error)
    }
});


export const createUser = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email: data.email },
            defaults: {
                ...data, password: bcrypt.hashSync(data.password, 10)
            }
        })
        return resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Register success' : 'Email is used',
            response
        })
    } catch (error) {
        reject(error)
    }
});



export const loginUser = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email: data.email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(data.password, response.password)
        if (!isChecked) {
            return resolve({
                err: isChecked ? 1 : 0,
                mess: isChecked === null || isChecked === undefined ? "Email chưa được đăng kí" : "",
            })
        }
        delete response.password
        const token = isChecked ? generateAccessToken(response) : null
        const refreshToken = isChecked ? generateRefreshToken(response) : null
        refresh.push(refreshToken)

        return resolve({
            err: response ? 1 : 0,
            mess: token ? 'Login success' : response ? "Password is wrong" : "Email đã được đăng ký",
            accessToken: token ? `${token}` : token,
            refreshToken: refreshToken ? `${refreshToken}` : refreshToken,
            data: token ? response : ''
        })
    } catch (error) {
        return reject(error)
    }
});


export const logoutUser = (req, res) => new Promise(async (resolve, reject) => {
    try {
        refresh = refresh.filter((e) => e !== req.cookies.refreshToken)
        res.clearCookie("refreshToken")
        return resolve({
            mess: 'Logout success',
        })
    } catch (error) {
        reject(error)
    }
});


export const updateUser = (data, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(data, {
            where: { id: id },
        })
        return resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Register success' : 'Email is used',
            response
        })
    } catch (error) {
        reject(error)
    }
});


export const deleteUser = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.destroy({ where: { id: id } })
        return resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Register success' : 'Email is used',
            response
        })
    } catch (error) {
        reject(error)
    }
});



export const refreshToken = (req, res) => new Promise(async (resolve, reject) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json("loi")
    if (!refresh.includes(refreshToken)) return res.status(403).json("refresh loi")
    jwt.verify(refreshToken, process.env.PORT, (err, user) => {
        if (err) return res.status(401).json(err)
        refresh.filter((e) => e !== refreshToken)
        const newAccessToken = generateAccessToken(user.user)
        const newRefreshToken = generateRefreshToken(user.user)
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            saneSite: "strict",
        })
        return resolve({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    })
});





