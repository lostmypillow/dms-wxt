<script setup>
import { store } from "./store.js";
const props = defineProps(["category"]);
</script>
<template>
  <div class="w-1/5 h-full flex flex-col gap-4 items-center justify-start px-4">
    <h1 class="text-xl font-bold">{{ props.category.toUpperCase() }}:</h1>

    <v-card
      v-for="n in store.getByCategory(props.category)"
      variant="tonal"
      rounded="xl"
      :title="n.title"
      :subtitle="n.date + ' / ' + n.source + ' / ' + n.author"
    >
      <v-card-actions class="justify-between">
        <v-btn
          icon="mdi-arrow-up"
          size="small"
          :disabled="n.priority == 1"
          @click="store.sendEdit('priority', n, 'up')"
          :loading="store.isLoading"
        />

        <span class="text-lg">{{ n.priority }}</span>

        <v-btn
          icon="mdi-arrow-down"
          size="small"
          :disabled="n.priority == store.data.length"
          :loading="store.isLoading"
          @click="store.sendEdit('priority', n, 'down')"
        />
        <v-btn
          @click="store.setCurrentlyEditing(n.id)"
          rounded="xl"
          prepend-icon="mdi-pencil"
          >Edit</v-btn
        >

        <v-btn
          :loading="store.isLoading"
          rounded="xl"
          color="error"
          icon="mdi-delete"
          @click="store.sendDelete(n.id)"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>
