import { createProduct, deleteProduct, readProduct, updateProduct } from "../service/Product";
import fs from 'fs'



const productController = {
    read: async (req, res) => {
        const response = await readProduct();
        return res.status(200).json(response)
    },
    create: async (req, res) => {
        if (req.file === undefined || req.file === null) {
            const response = await createProduct(req.body);
            return res.status(200).json(response)
        } else {
            return res.status(200).json('thanh cong')
        }
    },
    update: async (req, res) => {
        fs.unlinkSync(`public/uploads/${req.body.uploads}`, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        })
        delete req.body.uploads
        const id = req.params.id;
        const response = await updateProduct(req.body, id);
        return res.status(200).json(response)
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const response = await deleteProduct(id);
        return res.status(200).json(response)
    },
}

export default productController
