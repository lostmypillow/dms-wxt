<script setup>
import EditDialog from "./EditDialog.vue";
import { store } from "./store.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  connectFirestoreEmulator,
} from "firebase/firestore";
import ToolBar from "./toolBar.vue";
import CardContainer from "./CardContainer.vue";

const app = initializeApp({
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
});
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

const q = query(collection(db, store.getUDate()));
const unsub = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const docData = change.doc.data();
    if (change.doc.metadata.hasPendingWrites) {
      console.log("Local change detected, skipping");
      return;
    }

    if (change.type === "added") {
      console.log("New news content: ", docData);
      store.data.push(docData);
      console.log(store.data);
      if (docData.error) {
        console.log("this is an unsupported link, triggering background: ");
        chrome.runtime.sendMessage({
          action: "importFromDash",
          data: docData,
        });
      }
    }
    if (change.type === "modified") {
      console.log("Modified city: ", docData);
      const findIndex = store.data.findIndex(
        (obj) => obj["id"] === docData["id"]
      );
      store.data[findIndex] = docData;
    }
    if (change.type === "removed") {
      const index = store.data.findIndex((item) => item.id === docData.id);
      if (index !== -1) {
        store.data.splice(index, 1);
      }
    }
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "HTMLFromContent") {
    browser.tabs.remove(sender.tab.id);
    store.sendHTML({
      id: store.findObjectIdByUrl(message.url),
      url: message.url,
      html: message.html,
    });
  }
});

</script>
<template>
  <ToolBar />
  <EditDialog />
  <CardContainer />
</template>
