<script setup>
import AuthedApp from "./AuthedApp.vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth/web-extension";
import { initializeApp } from "firebase/app";
const email = ref("");
const password = ref("");
const user = ref(null);
const errorMessage = ref("");
const app = initializeApp({
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
});
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user signed in");
    authed.value = true;
  } else {
    console.log("user signed out");
  }
});
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      user.value = userCredential.user;
      console.log(user.value);
      errorMessage.value = "";
      authed.value = true;
    })
    .catch((error) => (errorMessage.value = error.message));
};

const authed = ref(false);
</script>
<template>
  <AuthedApp v-if="authed" />
  <div
    v-else
    class="w-svw h-svh flex flex-col items-center justify-center gap-4"
  >
    <v-card class="w-1/2 p-6" title="Please Sign In">
      <div class="flex w-full items-center justify-between">
      
      </div>

      <div
        v-if="!user"
        class="flex flex-col w-full items-center justify-between"
      >
        <v-text-field
          prepend-icon="mdi-email"
          variant="outlined"
          class="w-full"
          label="Email address"
          placeholder="johndoe@gmail.com"
          type="email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          variant="outlined"
          class="w-full"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
      </div>

      <v-card-actions>
        <v-btn
          @click="login"
          rounded="xl"
          variant="tonal"
          prepend-icon="mdi-login"
        >
          Sign In
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
