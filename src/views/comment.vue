<template>
  <div class="comment-box">
    <div class="commtent-message-box" v-for="(item, index) in commentsList" :key="index">
      <recursion-comment :data="item"></recursion-comment>
    </div>
  </div>
</template>

<script>

import { treeDataTranslate } from '@/utils/treeDataTranslate'
import comments from '@/views/data/comments.js'
import recursionComment from './recursionComment'

let commentsList =  treeDataTranslate(comments) //将评论转为树数组

console.log(commentsList)


export default {
  data() {
    return {
      commentsList, 
    }
  },
  // components: { recursionComment },
}
</script>

<style lang="stylus" scoped>

</style>

