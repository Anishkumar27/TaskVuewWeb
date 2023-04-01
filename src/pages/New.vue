<template>
  <div class="container d-flex align-items-center justify-content-center">
    <form class="card p-3 m-2 w-50" @submit.prevent="onSubmit()">
      <div
        :class="'alert alert-' + storeVar.msgType"
        role="alert"
        v-if="storeVar.message"
      >
        {{ storeVar.message }}
      </div>
      <h3 class="text-center font-weight-bold">
        {{ obj.editMode ? "Update" : "Create" }} Post!
      </h3>
      <div class="mb-3 form-control-sm">
        <label for="postInputTitle" class="form-label">Title</label>
        <input
          type="text"
          v-model="storeVar.title"
          class="form-control"
          aria-describedby="TitleHelp"
          id="postInputTitle"
        />
        <div
          id="TitleHelp"
          class="form-text text-danger"
          v-if="obj.submit && titleValid"
        >
          {{ titleValid }}
        </div>
      </div>
      <div class="mb-3 form-control-sm">
        <label for="postInputContent" class="form-label">Content</label>
        <textarea
          type="text"
          v-model="storeVar.content"
          class="form-control"
          aria-describedby="ContentHelp"
          id="postInputContent"
        ></textarea>
        <div
          id="ContentHelp"
          class="form-text text-danger"
          v-if="obj.submit && contentValid"
        >
          {{ contentValid }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ obj.editMode ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const storeVar = computed(() => store.state.Post);

const obj = reactive({
  authorId: sessionStorage.getItem("userId"),
  postId: null,
  editMode: false,
  submit: false,
});

onBeforeMount(() => {
  if (route.query.id) {
    obj.editMode = true;
    obj.postId = route.query.id;
    store.dispatch("Post/getPost", { id: route.query.id });
  } else {
    obj.editMode = false;
  }
});

const onSubmit = () => {
  if (titleValid.value || contentValid.value) {
    obj.submit = true;
    return;
  }
  if (obj.editMode) {
    store.dispatch("Post/update", {
      id: +obj.postId,
      title: storeVar.value.title,
      author_id: +obj.authorId,
      content: storeVar.value.content,
    });
  } else {
    store.dispatch("Post/create", {
      title: storeVar.value.title,
      author_id: +obj.authorId,
      content: storeVar.value.content,
    });
  }
};

const titleValid = computed(() => {
  if (!storeVar.value.title) {
    return "Title required!";
  }
});

const contentValid = computed(() => {
  if (!storeVar.value.content) {
    return "Content required!";
  }
});
</script>

<style></style>
