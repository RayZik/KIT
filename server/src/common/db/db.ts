import { createPool, Pool, PoolConfig, format } from 'mysql';



/**
 * Database class 
 */
export class DB {
  /** connection pool */
  public static connectionPool: Pool = DB.getConnectionPool();


  constructor() { }


  public static getConnectionPool(option: PoolConfig = {}) {
    return createPool({
      connectionLimit: 10,
      ...option,
      host: 'localhost',
      user: 'ispsystem',
      password: 'ispsystem',
      database: 'stolbovo',
    });
  }


  public static query(sql: string, params: any[] = []) {
    const sqlFormatted = format(sql, params);
    console.log(sqlFormatted);
    
    return new Promise((resolve, reject) => {
      DB.connectionPool.getConnection((getConnectErr, connection) => {
        connection.query(sqlFormatted, params, (queryError, result, fields) => {
          connection.release();

          if (queryError) { reject(queryError); }

          resolve({ result, fields })
        });
      })
    });
  }
}
