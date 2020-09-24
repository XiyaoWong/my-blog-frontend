<template>
  <div id="footer">
    <span v-text="sentence"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sentence: ":)",
    };
  },
  mounted() {
    // this.axios.get("https://hitoapi.cc/sp").then((response) => {
    //   this.sentence = response.data.text;
    // });
  },
};
</script>

<style>
#footer {
  text-align: center;
  font-size: 12px;
  font-style: italic;
  color: #a1afc9;
}
</style>
