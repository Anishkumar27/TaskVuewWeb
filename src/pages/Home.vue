<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyTaskSite</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/posts" class="nav-link" href="#"
              >Posts</router-link
            >
          </li>
        </ul>
        <span class="navbar-text"> Logged User: <b>{{storeVar.name}}</b> </span>
        <span class="m-2">
          <button @click.prevent="logout" class="btn btn-sm btn-danger">
            Logout
          </button>
        </span>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
<script setup>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();
const storeVar = computed(() => store.state.account);

onBeforeMount(() => {
  store.dispatch("account/getProfile", { id: sessionStorage.getItem("userId") });
});

const logout = () => {
  store.dispatch("account/logout");
};
</script>
