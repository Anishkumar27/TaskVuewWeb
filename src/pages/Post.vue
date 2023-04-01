<template>
  <div class="container d-flex align-items-center justify-content-center mt-5">
    <div class="card text-center w-100">
      <div class="card-header">Post Details</div>
      <div class="card-body">
        <h5 class="card-title">{{ storeVar.title }}</h5>
        <p class="card-text">
          {{ storeVar.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const storeVar = computed(() => store.state.Post);

onBeforeMount(() => {
  if (route.query.id) {
    store.dispatch("Post/getPost", { id: route.query.id });
  }
});
</script>

<style></style>
