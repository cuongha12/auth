import { createCategory, deleteCategory, readCategory, updateCategory } from "../service/Category";



const categoryController = {
    read: async (req, res) => {
        const response = await readCategory();
        return res.status(200).json(response)
    },
    create: async (req, res) => {
        const response = await createCategory(req.body);
        return res.status(200).json(response)
    },
    update: async (req, res) => {
        const id = req.params.id;
        const response = await updateCategory(req.body, id);
        return res.status(200).json(response)
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const response = await deleteCategory(id);
        return res.status(200).json(response)
    },
}

export default categoryController
