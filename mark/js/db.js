/* db.js - IndexedDB 封装，所有数据本地存储 */
const DB_NAME = 'checkin-db';
const DB_VERSION = 3;

const DB = {
  _db: null,

  open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        const oldV = e.oldVersion || 0;
        // v1: 打卡项目/记录/生理期/设置
        if (oldV < 1) {
          if (!db.objectStoreNames.contains('items')) {
            const s = db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
            s.createIndex('name', 'name', { unique: false });
          }
          if (!db.objectStoreNames.contains('records')) {
            const s = db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
            s.createIndex('itemId', 'itemId', { unique: false });
            s.createIndex('date', 'date', { unique: false });
            s.createIndex('item_date', ['itemId', 'date'], { unique: true });
          }
          if (!db.objectStoreNames.contains('periods')) {
            db.createObjectStore('periods', { keyPath: 'id', autoIncrement: true });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }
        }
        // v2: 用药 + 任务
        if (oldV < 2) {
          if (!db.objectStoreNames.contains('meds')) {
            db.createObjectStore('meds', { keyPath: 'id', autoIncrement: true });
          }
          if (!db.objectStoreNames.contains('medRecords')) {
            const s = db.createObjectStore('medRecords', { keyPath: 'id', autoIncrement: true });
            s.createIndex('medId', 'medId', { unique: false });
            s.createIndex('date', 'date', { unique: false });
            s.createIndex('med_date', ['medId', 'date'], { unique: true });
          }
          if (!db.objectStoreNames.contains('tasks')) {
            db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
          }
        }
        // v3: 图文日志
        if (oldV < 3) {
          if (!db.objectStoreNames.contains('logs')) {
            const s = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
            s.createIndex('date', 'date', { unique: false });
          }
        }
      };
      req.onsuccess = (e) => { DB._db = e.target.result; resolve(DB._db); };
      req.onerror = (e) => reject(e.target.error);
    });
  },

  _tx(store, mode = 'readonly') {
    return DB._db.transaction(store, mode).objectStore(store);
  },

  add(store, obj) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store, 'readwrite').add(obj);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  },

  put(store, obj) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store, 'readwrite').put(obj);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  },

  delete(store, id) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store, 'readwrite').delete(id);
      r.onsuccess = () => resolve();
      r.onerror = () => reject(r.error);
    });
  },

  clear(store) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store, 'readwrite').clear();
      r.onsuccess = () => resolve();
      r.onerror = () => reject(r.error);
    });
  },

  getAll(store) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store).getAll();
      r.onsuccess = () => resolve(r.result || []);
      r.onerror = () => reject(r.error);
    });
  },

  getByIndex(store, indexName, value) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store).index(indexName).get(value);
      r.onsuccess = () => resolve(r.result || null);
      r.onerror = () => reject(r.error);
    });
  },

  getAllByIndex(store, indexName, value) {
    return new Promise((resolve, reject) => {
      const r = DB._tx(store).index(indexName).getAll(value);
      r.onsuccess = () => resolve(r.result || []);
      r.onerror = () => reject(r.error);
    });
  },

  /* ---------- 打卡项目 ---------- */
  async getItems() {
    const all = await DB.getAll('items');
    return all.filter(i => !i.archived);
  },
  getRecord(itemId, date) {
    return DB.getByIndex('records', 'item_date', [itemId, date]);
  },
  getRecordsOfItem(itemId) {
    return DB.getAllByIndex('records', 'itemId', itemId);
  },
  getRecordsOfDate(date) {
    return DB.getAllByIndex('records', 'date', date);
  },
  async upsertRecord(itemId, date, status, note = '') {
    const existing = await DB.getRecord(itemId, date);
    if (existing) {
      existing.status = status;
      existing.note = note;
      existing.ts = Date.now();
      await DB.put('records', existing);
      return existing;
    } else {
      const id = await DB.add('records', { itemId, date, status, note, ts: Date.now() });
      return { id, itemId, date, status, note, ts: Date.now() };
    }
  },

  /* ---------- 用药 ---------- */
  getMedRecord(medId, date) {
    return DB.getByIndex('medRecords', 'med_date', [medId, date]);
  },
  getMedRecordsOfMed(medId) {
    return DB.getAllByIndex('medRecords', 'medId', medId);
  },
  getMedRecordsOfDate(date) {
    return DB.getAllByIndex('medRecords', 'date', date);
  },
  async upsertMedRecord(medId, date, status, note = '') {
    const existing = await DB.getMedRecord(medId, date);
    if (existing) {
      existing.status = status;
      existing.note = note;
      existing.ts = Date.now();
      await DB.put('medRecords', existing);
      return existing;
    } else {
      const id = await DB.add('medRecords', { medId, date, status, note, ts: Date.now() });
      return { id, medId, date, status, note, ts: Date.now() };
    }
  },

  /* ---------- 设置 ---------- */
  async getSetting(key, def = null) {
    const row = await DB._tx('settings').get(key);
    return row ? row.value : def;
  },
  async setSetting(key, value) {
    await DB.put('settings', { key, value });
  },
};
