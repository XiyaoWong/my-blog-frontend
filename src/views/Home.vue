<template>
  <div class="home">
    <router-link to="add" title="写一点啥呢？">✍️</router-link>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <router-link :to="'/detail/' + post.id">
          <span class="title">
            <span style="color: grey; font-size: 14px;"
              >{{ index + 1 }}&nbsp;&nbsp;</span
            >
            <span>{{ post.title }}</span>
          </span>
        </router-link>
        <span v-if="post.is_show == -1">🤐</span>
        <span class="date" :title="post.update_at | updatedTimeFormat">
          {{ post.create_at | createdTimeFormat }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { unix } from "moment";
export default {
  name: "Home",
  data() {
    return {
      posts: [{ title: "loading" }],
    };
  },
  filters: {
    createdTimeFormat(v) {
      return unix(v).format("L");
    },
    updatedTimeFormat(v) {
      return "上次修改: " + unix(v).fromNow();
    },
  },
  created() {
    this.axios.get("/posts").then((response) => {
      this.posts = response.data.data.reverse();
    });
  },
  components: {},
};
</script>
<style scoped>
a {
  color: #2c3e50;
}
a:hover {
  color: #000000;
}
.date {
  font-size: 14px;
  float: right;
  margin-right: 3px;
  color: grey;
}
ul,
li {
  margin-top: 6px;
  list-style: none;
}
</style>
