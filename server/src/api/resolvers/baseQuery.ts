export abstract class BaseQuery {
  constructor(sql, params) {
    this.validate(sql, params);
  }

  abstract query(sql, params);

  validate(sql, params) {
    this.query(sql, params);
  }
}