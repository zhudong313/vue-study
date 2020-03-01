<template>
  <div class="app" >
    <app-header></app-header>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
//import '@/assets/css/css.css';
import appHeader from '@/components/AppHeader';
import appMain from '@/components/AppMain';
import appFooter from '@/components/AppFooter';

export default {
  name: 'App',
  data(){//储存数据
    return {

    };
  },
  methods: {//储存方法

  },
  components: {//注册组建
    appHeader,//appHeader: appHeader,
    appFooter,
    appMain,
  },
}
</script>

<style lang="scss">
@import './assets/css/css.css';
</style>
