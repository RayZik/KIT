import mongoose, { Schema } from 'mongoose';

class DBClass {
  private static connection;
  // private _MONGO_URI: string = process.env.DBURL;
  private _MONGO_URI: string = 'mongodb://localhost:27017/shelter';

  constructor() {
    if (DBClass.connection === undefined) {
      mongoose.set('useCreateIndex', true);
      DBClass.connection = this._getDB();
    }

    DBClass.connection.once('open', function() {
      console.log('Connection to database successful');
    });
  }

  private _getDB() {
    (<any>mongoose).Promise = Promise;
    return mongoose.createConnection(this._MONGO_URI, {
      useNewUrlParser: true
    });
  }

  model(name: string, schema: Schema) {
    return DBClass.connection.model(name, schema);
  }
}

export const DB = new DBClass();
