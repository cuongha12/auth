

export const isAdmin = (req, res, next) => {
    const role = req.user
    if (role.response.role === 'user') return res.json({
        mess:"không đủ quyền"
    })
    next()
}