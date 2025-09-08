// IndexedDB utility for storing and retrieving student images
const DB_NAME = "StudentImagesDB";
const STORE_NAME = "images";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveStudentImageToDB(key, blob) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(blob, key);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getStudentImageFromDB(key) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  return new Promise((resolve) => {
    const request = tx.objectStore(STORE_NAME).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(undefined);
  });
}
