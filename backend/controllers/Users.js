
const getUsers = async(req,res) => {
    res.status(200).json({
        msg: 'Users'
    })
} 

module.exports = {
    getUsers
}