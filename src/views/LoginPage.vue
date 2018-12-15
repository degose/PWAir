<template>
  <div>
    <form>
      <label for="email">email</label>
      <input type="text" v-model="email">
      <label for="password">password</label>
      <input type="password" v-model="password">
      <button @click.prevent="login">login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      // https://firebase.google.com/docs/auth/web/password-auth?hl=ko
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log("res", res);
          this.$router.push("/main/airCondition");
        })
        .catch(err => {
          console.log("------------err--------------", err);
        });
    }
  }
};
</script>

<style>
</style>