<script setup>
import EditDialog from "./EditDialog.vue";
import { store } from "./store.js";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  connectFirestoreEmulator,
} from "firebase/firestore";
import ToolBar from "./toolBar.vue";
import CardContainer from "./CardContainer.vue";
import AddDialog from "./addDialog.vue";

const db = getFirestore(getApp());
connectFirestoreEmulator(db, "127.0.0.1", 8080);
console.log(store.getUDate())
const q = query(collection(db, store.getUDate()));
const unsub = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    store.isLoading = true;
    const docData = change.doc.data();
    if (change.doc.metadata.hasPendingWrites) {
      console.log("Local change detected, skipping");
      return;
    }

    if (change.type === "added") {
      store.data.push(docData);
      store.isLoading = false;
      if (docData.error) {
        store.isLoading = true;
        console.log("this is an unsupported link, triggering background: ");
        chrome.runtime.sendMessage({
          action: "importFromDash",
          data: docData,
        });
      }
    }
    if (change.type === "modified") {
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
    store.isLoading = false;
  });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "HTMLFromContent") {
    // setTimeout(loopInfo(1, false), 1500)
    // browser.tabs.remove(sender.tab.id);
    store.sendHTML({
      id: store.findObjectIdByUrl(message.url),
      url: message.url,
      html: message.html,
    });
  }
});
const chosenCategory = ref("qualcomm");
</script>
<template>
  <ToolBar />
  <div class="flex flex-row items-center justify-start gap-4 my-4 mx-8">
    <span class="font-bold text-xl">Categories:</span>

    <v-btn-toggle
      rounded="xl"
      color="primary"
      v-model="chosenCategory"
      mandatory
    >
      <v-btn v-for="x in store.compoundCategories" :value="x.value">{{
        x.title
      }}</v-btn>
    </v-btn-toggle>
  </div>

  <EditDialog />
  <AddDialog />
  <CardContainer :category="chosenCategory" />
</template>
