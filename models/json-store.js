"use strict";

import { JSONFile, Low } from "lowdb";
import lodash from "lodash";

export class JsonStore {
  constructor(file, defaults) {
    return (async () => {
      this.db = new Low(new JSONFile("./models/user-store.json"));
      this.db.data = defaults;
      //this.db.chain = lodash.chain(this.db.data);
      await this.db.read();
      return this; // when done
    })();
  }

  save() {
    this.db.write();
  }

  add(collection, obj) {
    const test = this.db;
    const arr = this.db.data;
    arr[collection].push(obj);
    this.db.write();
  }

  remove(collection, obj) {
    this.db
      .get(collection)
      .remove(obj)
      .value();
  }

  removeAll(collection) {
    this.db
      .get(collection)
      .remove()
      .value();
  }

  findAll(collection) {
    return this.db.get(collection).value();
  }

  findOneBy(collection, filter) {
    const data = this.db.data;
    const results = lodash.find(data.users, filter);
    return results;
  }

  findByIds(collection, ids) {
    return this.db
      .get(collection)
      .keyBy("id")
      .at(ids)
      .value();
  }

  findBy(collection, filter) {
    return this.db
      .get(collection)
      .filter(filter)
      .value();
  }
}

