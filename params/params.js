const oracledb = require("oracledb");
oracledb.autoCommit = true;
let returnResult;

//Determine what OS Node is running in
if (process.platform == "linux") {
    //Needed for the .bashrc file on the linux box:
    //export LD_LIBRARY_PATH=/opt/oracle/instantclient_21_5:$LD_LIBRARY_PATH
    console.log("Detected a Linux environment.");
  }
  else if (process.platform == "win32") {
    oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_3' });
    console.log("Detected a Windows environment.");
  }
  else {
    console.log("This is not a Windows or Linux environment.");
  }

  //Authenticate with the Oracle ADW
  let connection;
  dbAuthenticate();

//=====================================================================================================================================================

async function runQueryDbSelect(dbQuery, dbBinds) {

    let result;

    try {
       //Run the query
       result = await connection.execute(dbQuery, dbBinds, {resultSet: true});

       returnResult = (await result.resultSet.getRows());

       return returnResult;
 
      } catch (err) {
        console.error(err);
        } 
    }

  //=====================================================================================================================================================

async function dbAuthenticate() {

      //Login environment variables
      const DATABASECONNECTION = process.env.DATABASECONNECTION;
      const DATABASEUSER = process.env.DATABASEUSER;
      const DATABASEPASS = process.env.DATABASEPASS;

      //Make the connection
      connection = await oracledb.getConnection({ user: DATABASEUSER, password: DATABASEPASS, connectionString: DATABASECONNECTION });
};

  //=====================================================================================================================================================

  module.exports = {
    runQueryDbSelect,
    dbAuthenticate,
    returnResult
 }