const { Pool } = require('pg')

const config = {
    user: 'erc83',
    password: '2210',
    host: 'localhost',
    database: 'softlife',
    port: 5432
}

const pool = new Pool(config)

async function createUser(paramsArray){
    const qryObject = {
        text: 'INSERT INTO usuarios (email, password) VALUES ($1, $2)', 
        values: paramsArray
    }

    const result = await pool.query(qryObject)
    return result
}

async function getUsers(){
    const result = await pool.query('SELECT * FROM usuarios')
    return result
}

async function login(paramsArray){
    const qryObject = {
        text: 'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
        values: paramsArray
    };
    const result = await pool.query(qryObject)
        return result;
}



module.exports = {
    login,
    getUsers,
    createUser
}