<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <form class="card p-3" @submit.prevent="onSubmit()">
      <h3 class="text-center font-weight-bold">Register</h3>
      <div class="mb-3 form-control-sm">
        <label for="registerInputName" class="form-label">Name</label>
        <input
          type="text"
          v-model="obj.name"
          class="form-control"
          aria-describedby="nameHelp"
          id="registerInputName"
        />
        <div
          id="nameHelp"
          class="form-text text-danger"
          v-if="obj.submit && nameValid"
        >
          {{ nameValid }}
        </div>
      </div>
      <div class="mb-3 form-control-sm">
        <label for="registerInputEmail" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="registerInputEmail"
          aria-describedby="emailHelp"
          v-model="obj.email"
        />
        <div
          id="emailHelp"
          class="form-text text-danger"
          v-if="obj.submit && emailValid"
        >
          {{ emailValid }}
        </div>
      </div>
      <div class="mb-3 form-control-sm">
        <label for="registerInputPassword" class="form-label">Password</label>
        <input
          type="password"
          v-model="obj.password"
          class="form-control"
          aria-describedby="passwordHelp"
          id="registerInputPassword"
        />
        <div
          id="passwordHelp"
          class="form-text text-danger"
          v-if="obj.submit && passwordValid"
        >
          {{ passwordValid }}
        </div>
      </div>
      <div
        :class="'alert alert-' + storeVar.msgType"
        role="alert"
        v-if="storeVar.message"
      >
        {{ storeVar.message }}
      </div>
      <button type="submit" class="btn btn-primary">Register Now</button>
      <div class="pt-2">
        <p @click.prevent="loginPage">
          Already registered?
          <span class="text-primary">Login Now</span>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const storeVar = computed(() => store.state.account);

const emailRegex =
  /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

const obj = reactive({
  name: null,
  email: null,
  password: null,
  submit: false,
});

const onSubmit = () => {
  if (nameValid.value || emailValid.value || passwordValid.value) {
    obj.submit = true;
    return;
  }
  store.dispatch("account/register", {
    name: obj.name,
    email: obj.email,
    password: obj.password,
  });
};

const loginPage = () => {
  router.push({ path: "/auth/login" });
};

const nameValid = computed(() => {
  if (!obj.name) {
    return "Name required!";
  }
});

const emailValid = computed(() => {
  if (emailRegex.test(obj.email) && obj.email !== "") {
    return null;
  } else {
    return "Invalid email.";
  }
});

const passwordValid = computed(() => {
  if (!obj.password) {
    return "Password required!";
  }
});
</script>

<style>
p {
  cursor: pointer;
}
</style>
