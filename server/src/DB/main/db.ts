import mongoose from 'mongoose';



class DB {
  private static _connection;
  // private _MONGO_URI: string = process.env.DBURL;
  private _MONGO_URI: string = 'mongodb://localhost:27017/shelter';


  constructor() {
    if (typeof DB._connection === 'undefined') {
      mongoose.set('useCreateIndex', true);
      DB._connection = this._getDB();
    }
  }


  model(name, schema) {
    return DB._connection.model(name, schema);
  }


  private _getDB() {
    (<any>mongoose).Promise = Promise;
    return mongoose.createConnection(this._MONGO_URI, { useNewUrlParser: true });
  }
}


export const dbService = new DB();