import * as mongoose from 'mongoose';



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


  model(name, schema): mongoose.Model<any> {
    return DB._connection.model(name, schema);
  }


  private _getDB() {
    (<any>mongoose).Promise = Promise;
    return mongoose.createConnection(this._MONGO_URI, { useNewUrlParser: true });
  }


  /**
   * Функция проверки существования пользователя
   * 
   * @param models - модели для доступа к базе
   * @param param - параметры запроса
   */
  public static checkUser(models, param) {
    // return models.users.findOne({ telegramId: param['telegramId'] })
    //   .then(user => {
    //     if (user === null) {
    //       let new_user = new models.users({
    //         telegramId: param['telegramId'],
    //         firstName: param['firstName'],
    //         lastName: param['lastName'],
    //         login: param['telegramId'],
    //         password: param['telegramId'] + 'sadasd',
    //         words: []
    //       });

    //       return new_user.save().then(defUser => {
    //         return defUser;
    //       }).catch(err => {
    //         console.log("err", err)
    //       });
    //     }
    //     return user;

    //   })
  }
}


export const dbService = new DB();