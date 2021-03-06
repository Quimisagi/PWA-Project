const {pool} = require('../controllers/index.controller.js');

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM Users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const login = async (req, res) => {
    const {email, password} = req.body;
    var name = '';
    const response = await pool.query('SELECT * FROM Users WHERE email = $1 AND password = $2', [email, password]);
    if(response.rows.length === 0){
        return res.json({
            message: 'Email o contraseña incorrecta',
            body: {
                user: {email, password, name}
            }
        })
    }
    else {
        name = response.rows[0].name;
        return res.json({
            message: 'Ok',
            body:{
                user: {email, password, name}
            }
        })
    }
}

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email, password, phone, identification, position} = req.body;
    
    const response = await pool.query('INSERT INTO Users (name, email, password, phone, identification, position) VALUES ($1, $2, $3, $4, $5, $6)', [name, email, password, phone, identification, position]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email, phone, identification, position}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { email, phone, position} = req.body;

    const response =await pool.query('UPDATE Users SET email = $1, phone = $2, position = $3 WHERE id = $4', [
        email,
        phone,
        position,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM Users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
}