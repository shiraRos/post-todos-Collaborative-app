import mysql from 'mysql2'

const pool = mysql.createPool(
    {
        host:"127.0.0.1",
        password:"shira@123456",
        user:'root',
        database:'db'
    }
).promise();


export default pool;