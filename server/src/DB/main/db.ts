import mongoose, { Schema, model } from 'mongoose';



class DB {
  private static connection;
  // private _MONGO_URI: string = process.env.DBURL;
  private _MONGO_URI: string = 'mongodb://localhost:27017/shelter';


  constructor() {
    if (DB.connection === undefined) {
      mongoose.set('useCreateIndex', true);
      DB.connection = this._getDB();
    }

    DB.connection.once('open', function () {
      console.log('Connection to DB successful');
    });
  }


  model(name: string, schema: Schema) {
    return DB.connection.model(name, schema);
  }


  private _getDB() {
    (<any>mongoose).Promise = Promise;
    return mongoose.createConnection(this._MONGO_URI, { useNewUrlParser: true });
  }
}


export const dbService = new DB();