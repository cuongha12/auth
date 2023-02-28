import { createUser, deleteUser, loginUser, logoutUser, readUser, refreshToken, updateUser } from "../service/User";
import jwt from 'jsonwebtoken';

const userController = {
    read: async (req, res) => {
        const response = await readUser();
        return res.status(200).json(response)
    },
    create: async (req, res) => {
        const response = await createUser(req.body);
        return res.status(200).json(response)
    },
    update: async (req, res) => {
        const id = req.params.id;
        const response = await updateUser(req.body, id);
        return res.status(200).json(response)
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const response = await deleteUser(id);
        return res.status(200).json(response)
    },
    login: async (req, res) => {
        const response = await loginUser(req.body);
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        })
        return res.status(200).json(response)
    },
    logout: async (req, res) => {
        const response = await logoutUser(req, res);
        return res.status(200).json(response)
    },

    refresh: async (req, res) => {
        const response = await refreshToken(req, res);
        return res.status(200).json(response)
    },
}

export default userController