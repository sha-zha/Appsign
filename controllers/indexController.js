
let controller = {}

controller.logout = async (req, res) => {
    req.session = null
    res.redirect('/')
}

module.exports = controller;