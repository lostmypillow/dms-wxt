<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth/web-extension";

import { initializeApp } from "firebase/app";
const email = ref("");
const password = ref("");
const user = ref(null);
const errorMessage = ref("");

const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      user.value = userCredential.user;
      console.log(user.value);
      errorMessage.value = "";
    })
    .catch((error) => (errorMessage.value = error.message));
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
</script>
<template>
  <div
    class="w-[300px] h-[200px] flex flex-col items-center justify-start p-4 gap-4"
  >
    <h1 class="text-xl font-extrabold">AutoDMS 0.3.0</h1>
    <v-btn
      rounded="xl"
      size="large"
      prepend-icon="mdi-view-dashboard"
      @click="
        browser.tabs.create({
          url: browser.runtime.getURL('/dashboard.html'),
        })
      "
      >Go To Dashboard</v-btn
    >
  </div>
</template>
