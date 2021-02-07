const { Pool, Client } = require('pg')

const pool = new Pool()
pool.connect()


const query = async (query, params) => {

    /*var res = (async () => {
        const client = await pool.connect()
        try {
          const res = await client.query(query, params)
        return res;
        } finally {
          // Make sure to release the client before any error handling,
          // just in case the error handling itself throws an error.
          client.release()
        }
      })().catch(err => console.log(err.stack))*/
      return await pool.query(query, params)
}

var checkOrganization = async function (name, pin) {
    try{
        const res =  await query(`SELECT COUNT(*) FROM organizations where nickname = \'${name}\' and pin = \'${pin}\'`);
        if(res.rows[0].count === '1'){
            return true;
        } else {
            return false;
        }
    }catch(err){
        console.log(err)
    } 
}

var organizationExists = async function (name) {
    try{
        const res =  await query(`SELECT COUNT(*) FROM organizations where nickname = \'${name}\'`);
        if(res.rows[0].count === '1'){
            return true;
        } else {
            return false;
        }
    }catch(err){
        console.log(err)
    } 
}

var countOrganizations = async function () {
    try{
        const res =  await query(`SELECT COUNT(*) FROM organizations`);
        return res.rows[0].count;
    }catch(err){
        console.log(err)
    } 
}

var addOrganization = async function (name, pin, nickname) {
    if (await organizationExists(nickname)) {
        return false;
    }
    var id = parseInt(await countOrganizations()) + 1;
    await query(`INSERT INTO organizations VALUES (${id}, \'${name}\', \'${pin}\', \'${nickname}\')`)
    return true;
}

var getOrganizationName = async function (nickname) {
    if (!(await organizationExists(nickname))){
        return undefined;
    }
    const res =  await query(`SELECT name FROM organizations where nickname = \'${nickname}\'`);
    
}

module.exports = {checkOrganization, addOrganization, getOrganizationName};