<template>
  <div id="app">
    <Nav />
    <hr style="margin-top: -8px; margin-bottom: 10px;" />
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer.vue";

export default {
  mounted() {
    const token = window.localStorage.getItem("token");
    if (token) {
      this.axios.post("/checkToken", { token: token }).then((response) => {
        if (response.data.msg != "ok") {
          window.localStorage.removeItem("token");
        }
      });
    }
  },
  components: { Footer, Nav },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Baloo Tamma 2", "Noto Serif SC", Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  max-width: 1000px;
}
.content {
  font-size: 16px;
  text-align: justify;
  margin-bottom: 20px;
}
</style>
