<template>
  <div class="comment-box">
    <div class="commtent-message-box" v-for="(item, index) in commentsList" :key="index">
      <recursion-comment :data="item"></recursion-comment>
    </div>
  </div>
</template>

<script>

import recursionComment from './recursionComment'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['commentsList']) //公共状态数据
  },    
  
  created() {
  },
  methods: {

  },
}
</script>

<style lang="stylus" scoped>

</style>

