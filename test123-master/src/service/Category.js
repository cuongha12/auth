

import db, { Category } from "../models/index";
import { Op } from "sequelize";

export const readCategory = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAndCountAll()
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'that bai' : 'thanh cong',
            response
        })
    } catch (error) {
        reject(error)
    }
});

export const createCategory = (data) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Category.create(data)
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'that bai' : 'thanh cong',
            response
        })
    } catch (error) {
        reject(error)
    }
});


export const updateCategory = (data, id) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Category.update(data, {
            where: { id: id }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'that bai' : 'thanh cong',
            response
        })
    } catch (error) {
        reject(error)
    }
});

export const deleteCategory = (id) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Category.destroy({
            where: { id: id }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'that bai' : 'thanh cong',
        })
    } catch (error) {
        reject(error)
    }
})