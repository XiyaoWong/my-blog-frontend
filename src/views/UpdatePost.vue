<template>
  <div class="update-post">
    <div>
      <label for="title">TITLE</label>
      <input type="text" name="title" placeholder="文章标题" v-model="title" />
      <label for="body">BODY</label>
      <textarea
        name="body"
        placeholder="文章内容"
        cols="30"
        rows="10"
        v-model="body"
      />
      <input type="checkbox" name="is_show" id="is_show" v-model="is_show" />
      <span>是否给别人看？</span>
    </div>
    <button @click="update">更新</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      body: "",
      is_show: false,
    };
  },
  mounted() {
    this.axios.get(`/posts/${this.$route.params.id}`).then((response) => {
      (this.title = response.data.data.title),
        (this.body = response.data.data.body),
        (this.is_show = response.data.data.is_show == 1 ? true : false);
    });
  },
  methods: {
    update() {
      this.axios
        .put(`/posts/${this.$route.params.id}`, {
          title: this.title,
          body: this.body,
          is_show: this.is_show == true ? 1 : -1,
        })
        .then((response) => {
          if (response.data.code == 0) {
            this.$toasted.success("更新成功！");
            this.$router.replace({
              name: "Detail",
              params: { id: response.data.data.id },
            });
          }
        });
    },
  },
};
</script>

<style></style>
