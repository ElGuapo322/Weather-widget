<template>
  <MainPage/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainPage from './components/MainPage.vue';

export default defineComponent({
  name: 'App',
  components: {
     MainPage
  }
});
</script>

<style lang="scss">
#app {
  font-family: "RobotoRegular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
@font-face { 
    font-family: "RobotoRegular";
    src: url("./assets/fonts/RobotoRegular.ttf");
    font-style: normal;
    font-weight: 400;
}
</style>
