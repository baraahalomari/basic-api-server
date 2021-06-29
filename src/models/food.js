'use strict';
const uuid = require('uuid').v4;
class Food {
  constructor() {
    this.db = [];
  }
  read(id) {
    if (id) {
      return this.db.find((record) => record.id === id);
    } else {
      return this.db;
    }
  }

  create(obj) {
    
      const record = {
        id: uuid(),
        data: obj
      }
      this.db.push(record);
    return record;
  }

  update(id,obj){
    for(let i =0; i< this.db.length; i++){
      if(this.db[i].id == id){
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }
  delete(id){
    this.db = this.db.filter((record)=>record.id !== id);
  }

}

module.exports = Food;
