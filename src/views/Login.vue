<template>
  <div class="login">
    <div>
      <label for="username">用户名：</label>
      <input type="text" name="username" v-model="username" id="username" />
      <label for="password">密码：</label>
      <input type="password" name="password" v-model="password" id="password" />
    </div>
    <button @click="login">LOGIN</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.axios
        .post("/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.data.code == 0) {
            this.$toasted.success("登录成功");
            const token = response.data.data.token;
            if (token) {
              window.localStorage.setItem("token", token);
            }
            this.$router.replace("/");
          }
        });
    },
  },
};
</script>

<style></style>
