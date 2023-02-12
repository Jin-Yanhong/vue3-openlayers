<template>
  <nav class="navList">
    <router-link
      class="nav"
      active-class="activeLink"
      v-for="nav in navList"
      :to="nav.path"
      :key="nav.path"
      >{{ nav.text }}
    </router-link>
  </nav>
  <router-view />
</template>
<script lang="ts">
import { reactive } from "vue";

export default {
  setup() {
    const navList = reactive([
      { path: "/", text: "Home" },
      { path: "/about", text: "About" },
    ]);

    return {
      navList,
    };
  },
};
</script>
<style lang="less" scoped>
.navList {
  background: #2d3436;
  a {
    text-decoration: none;
  }
  .nav {
    color: #b2bec3;
    line-height: 40px;
    padding: 0 10px;
    cursor: pointer;
  }
}
</style>
