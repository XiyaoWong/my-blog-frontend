<template>
  <div id="nav">
    <img
      src="http://q1.qlogo.cn/g?b=qq&nk=286183317&s=640"
      alt="avatar"
      class="avatar"
    />
    <div class="links">
      <router-link to="/">Home</router-link> |
      <router-link to="/detail/27">Friends</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#nav {
  padding: 15px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #f9906f;
}

.avatar {
  margin-bottom: -5px;
  display: inline-block;
  width: 36px;
  border-radius: 18px;
  border: 0.5px solid grey;
}
</style>
