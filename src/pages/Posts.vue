<template>
  <div class="container">
    <div
      class="d-flex align-items-center p-3 my-3 text-white-50 bg-secondary rounded box-shadow d-flex justify-content-between"
    >
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Posts</h6>
        <small>List of posts</small>
      </div>
      <button class="btn btn-info" @click.prevent="createPostPage">Add</button>
    </div>
    <div class="my-3 p-3 bg-white rounded box-shadow">
      <h6 class="border-bottom border-gray pb-2 mb-0">Posts</h6>
      <div
        class="media text-muted pt-3"
        v-for="(item, index) in storeVar.data"
        :key="index"
      >
        <img
          data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1"
          alt="32x32"
          class="mr-2 rounded"
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1873c2a27dc%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1873c2a27dc%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.045440673828125%22%20y%3D%2217.2%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
          data-holder-rendered="true"
          style="width: 32px; height: 32px"
        />
        <div
          class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
        >
          <div class="d-flex justify-content-between align-items-center w-100">
            <strong class="text-gray-dark">{{ item.title }}</strong>
            <div>
              <button
                class="btn btn-info btn-sm"
                @click.prevent="viewPostPage(item.id)"
              >
                View
              </button>
              &nbsp;
              <button
                class="btn btn-primary btn-sm"
                @click.prevent="editPostPage(item.id)"
              >
                Edit
              </button>
            </div>
          </div>
          <span class="d-block">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const storeVar = computed(() => store.state.Post);

onBeforeMount(() => {
  store.dispatch("Post/getPosts");
});

const createPostPage = () => {
  router.push({ path: "/new" });
};

const viewPostPage = (id) => {
  router.push({ path: "/post", query: { id } });
};

const editPostPage = (id) => {
  router.push({ path: "/new", query: { id } });
};
</script>
