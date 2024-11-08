import { Button, Input, List } from "antd";
import { useEffect, useState } from "react";
import { isFunction } from 'lodash';

interface IVendor {
  vendId: string;
  vendName: string;
}

/**
 * 版本变更事务是一种特殊类型的事务，它在数据库版本发生变化时自动开始，并且在这个事务完成之前，你不能手动开启任何其他的事务。
 */
const openDbAsync = (dbName: string, version: number = 1, callback) => {
  return new Promise<IDBDatabase>(function (resolve, reject) {
    const openDBRequest = window.indexedDB.open(dbName, version);
    openDBRequest.onsuccess = function () {
      const db = openDBRequest.result;
      console.log("版本变更事务完成，数据库版本号：", db.version);
      resolve(db);
    };
    openDBRequest.onerror = function (event) {
      reject(event.target);
    };
    openDBRequest.onupgradeneeded = function () {
      /**
       * 在 onupgradeneeded 回调中直接开启事务并修改对象存储中的数据确实是不正确的做法。
       * 在 onupgradeneeded 回调中，我们只能修改数据库的结构，比如创建或删除对象存储和索引，
       * 而不能执行任何其他类型的操作，如添加、更新或删除对象存储中的数据。
       */
      const db = openDBRequest.result;
      if (isFunction(callback)) {
        callback(db);
      }
      console.log("版本变更事务正在进行中...");
    };
  });
};

const initDbAsync = (db: IDBDatabase) => {
  const objectStore = db.createObjectStore("vendors", {
    keyPath: "vendId",
  });
  objectStore.createIndex("vendNameIndex", "vendName", { unique: false });
}

const initDbAsync2 = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains('vendors')) {
    db.createObjectStore('vendors', { keyPath: 'vendId'});
  }
  const transaction = db.transaction(["vendors"], 'readwrite');
  transaction.oncomplete = function() {
    console.log('修改表结构成功');
  }
  transaction.onerror = function() {
    console.log('修改表结构失败');
  }

  const objectStore = db.transaction(["vendors"], 'readwrite').objectStore('vendors');
  const request = objectStore.openCursor();
  request.onsuccess = function() {
    const cursor = request.result;
    if (cursor) {
      cursor.value.vendAddress = null;
      objectStore.put(cursor.value);
      cursor.continue();
    } else {
      console.log("所有数据已更新");
    }
  }
}

const getAllAsync = (db: IDBDatabase) => {
  return new Promise<IVendor[]>(function (resolve, reject) {
    const transaction: IDBTransaction = db.transaction(["vendors"], "readonly");
    transaction.oncomplete = function () {
      resolve(request.result);
    }
    transaction.onerror = function () {
      reject(request.result);
    }
    const objectStore: IDBObjectStore = transaction.objectStore("vendors");
    const request: IDBRequest = objectStore.getAll();
    request.onsuccess = function () {
      console.log("查询成功");
    };
    request.onerror = function () {
      console.error("查询失败");
    };
  });
};

const addVendor = (db: IDBDatabase, vendor: IVendor) => {
  return new Promise<boolean>(function (resolve, reject) {
    const transaction: IDBTransaction = db.transaction(
      ["vendors"],
      "readwrite"
    );

    transaction.oncomplete = function () {
      resolve(true);
    };

    transaction.onerror = function () {
      reject(false);
    };

    const objectStore: IDBObjectStore = transaction.objectStore("vendors");
    const request: IDBRequest = objectStore.add(vendor);
    request.onsuccess = function () {
      console.log("新增成功");
    };
    request.onerror = function () {
      console.error("新增失败");
    };
  });
};

const deleteVendor = (db: IDBDatabase, vendId: string) => {
  return new Promise<boolean>(function (resolve, reject) {
    const transaction: IDBTransaction = db.transaction(
      ["vendors"],
      "readwrite"
    );

    transaction.oncomplete = function () {
      resolve(true);
    };

    transaction.onerror = function () {
      reject(false);
    };

    const objectStore: IDBObjectStore = transaction.objectStore("vendors");
    const request: IDBRequest = objectStore.delete(vendId);
    request.onsuccess = function () {
      console.log("删除成功");
    };
    request.onerror = function () {
      console.error("删除失败");
    };
  });
};

const updateVendor = (db: IDBDatabase, vendor: IVendor) => {
  return new Promise(function (resolve, reject) {
    const transaction = db.transaction(["vendors"], "readwrite");
    transaction.oncomplete = function () {
      resolve(true);
    }
    transaction.onerror = function (event) {
      reject(event.target);
    }
    const objectStore = transaction.objectStore("vendors");
    const request: IDBRequest = objectStore.put(vendor);
    request.onsuccess = function () {
      console.log("更新成功");
    }
    request.onerror = function () {
      console.error("更新失败");
    }
  });
};

function IndexDB() {
  const [myDb, setDb] = useState<IDBDatabase>();
  const [vendName, setVendName] = useState("");
  const [vendors, setVendors] = useState<IVendor[]>([]);

  const handleSearch = async () => {
    if (!myDb) {
      return;
    }
    const list = await getAllAsync(myDb);
    setVendors(list);
  }

  const handleAdd = async () => {
    if (!vendName.trim()) {
      return;
    }
    if (!myDb) {
      return;
    }
    await addVendor(myDb, {
      vendId: new Date().toISOString(),
      vendName,
    });
    const list = await getAllAsync(myDb);
    setVendors(list);
  };

  const handleEdit = async (vendName, vendId) => {
    if (!vendName.trim()) {
      return;
    }
    if (!myDb) {
      return;
    }
    await updateVendor(myDb, { vendId, vendName });
    const list = await getAllAsync(myDb);
    setVendors(list);
  };

  const handleDelete = async (vendId) => {
    if (!vendId.trim()) {
      return;
    }
    if (!myDb) {
      return;
    }
    await deleteVendor(myDb, vendId);
    const list = await getAllAsync(myDb);
    setVendors(list);
  };

  useEffect(() => {
    openDbAsync("appStore", 1, initDbAsync).then((db) => {
      setDb(db);
    });
  }, []);

  useEffect(() => {
    if (myDb) {
      // handleSearch();
    }
  }, [myDb]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between items-center gap-4">
        <Input
          value={vendName}
          onChange={(evt) => setVendName(evt.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <List
        bordered={false}
        header={<span>缓存列表，一共{vendors.length}条</span>}
        dataSource={vendors}
        renderItem={(item) => {
          return (
            <div className="flex justify-between items-center gap-4 mb-4">
              <Input
                value={item.vendName}
                onChange={(evt) => handleEdit(evt.target.value, item.vendId)}
              />
              <Button onClick={() => handleDelete(item.vendId)}>
                Delete
              </Button>
            </div>
          );
        }}
      ></List>
    </div>
  );
}

export default IndexDB;
