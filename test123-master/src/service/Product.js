

import db, { Category } from "../models/index";
import { Op } from "sequelize";
import fs from 'fs'

export const readProduct = () => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Product.findAndCountAll(
            {
                // order: [['id', 'DESC']],
                attributes:
                {
                    exclude:
                        ['categoryId']
                },
                include: [
                    {
                        model: Category,
                        attributes:
                        {
                            exclude:
                                ['createdAt', 'updatedAt']
                        },
                    },

                ],
            }
        )
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'that bai' : 'thanh cong',
            response
        })
    } catch (error) {
        reject(error)
    }
});


export const createProduct = (data) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Product.create(data)
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'that bai' : 'thanh cong',
            response
        })
    } catch (error) {
        reject(error)
    }
});


export const updateProduct = (data, id) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Product.update(data, {
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

export const deleteProduct = (id) => new Promise(async (resolve, reject) => {
    try {
        const findProduct = await db.Product.findOne({
            where: { id: id }
        })
        fs.unlinkSync(`public/uploads/${findProduct.dataValues.image}`, (err) => {
            if (err) throw err;
        })
        const response = await db.Product.destroy({
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