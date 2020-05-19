<template>
  <div class="detail yue">
    <span class="title">
      {{ post.title }}
    </span>
    <span class="date">
      创建于：{{ post.create_at }}，上次修改：{{ post.update_at }}
      <router-link :to="'/update/' + post.id" title="修改">🍂</router-link>
    </span>
    <br />
    <div v-html="post.body"></div>
  </div>
</template>

<script>
function slideTo(targetPageY) {
  var timer = setInterval(function () {
    var currentY =
      document.documentElement.scrollTop || document.body.scrollTop; //当前及滑动中任意时刻位置
    var distance =
      targetPageY > currentY ? targetPageY - currentY : currentY - targetPageY; //剩余距离
    var speed = Math.ceil(distance / 10); //每时刻速度
    if (currentY == targetPageY) {
      clearInterval(timer);
    } else {
      window.scrollTo(
        0,
        targetPageY > currentY ? currentY + speed : currentY - speed
      );
    }
  }, 10);
}

import { highlight, getLanguage } from "highlight.js";
// Actual default values
var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    if (lang && getLanguage(lang)) {
      return (
        '<pre class="hljs"><code>' +
        highlight(lang, str, true).value +
        "</code></pre>"
      );
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

import { unix } from "moment";
export default {
  data() {
    return {
      post: { title: "loading...", body: "loading..." },
    };
  },
  mounted() {
    slideTo(0);
    this.axios.get(`/posts/${this.$route.params.id}`).then((rep) => {
      let post = rep.data.data;
      //渲染markdown
      post.body = md.render(post.body);
      //处理时间
      post.create_at = unix(post.create_at).format("L");
      post.update_at = unix(post.update_at).fromNow();
      this.post = post;
    });
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/github.min.css");

.title {
  font-size: 22px;
  font-weight: bold;
}
.date {
  font-size: 12px;
  color: grey;
  display: block;
}
</style>
