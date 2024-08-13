import pg from "pg";
import { databaseConfig } from "../config/database.config.js";



const pool  =  new pg.Pool({
    user: databaseConfig.user,
    password: databaseConfig.password,
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.database,
});


export async function writePostSql(query,...params) {
    const client = await pool.connect();
    try {
        const {rows} = await client.query(query,params?.length ? params : [])
        return rows
    } catch (error) {
        console.log("databasada xatolik keldi: ", error)
    } finally {
        client.release()
    }
}