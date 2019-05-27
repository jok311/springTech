<template>
  <div class="index-box">
    <div class="head-column-box">
      <div class="logo-box">
        <img src="https://news.ycombinator.com/y18.gif" alt="">
      </div>
      <ul>
        <li v-for="(item, index) in headColumnData" :key="index"><a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.name }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

import news from './data/news.js'
import comments from './data/comments.js'

export default {
  data() {
    return {
      headColumnData: [
        {name: 'Hacker News', href: 'https://news.ycombinator.com/news'},
        {name: 'welcome', href: 'https://news.ycombinator.com/newswelcome.html'},
        {name: 'new', href: 'https://news.ycombinator.com/newest'},
        {name: 'threads', href: 'https://news.ycombinator.com/threads?id=jok311'},
      ], //页面头部

    }
  },

  created() {
    console.log(comments)
    console.log(news)
  }
}
</script>

<style lang="stylus" scoped>

$themeColor = #FF6600

.index-box
  max-width 92vw
  margin 0 auto
  background #fff
  min-height 100vh
  .head-column-box
    background $themeColor
    position relative
    padding-left 16px
    display flex
    align-items center
    .logo-box
      border 1px solid #fff
      img
       vertical-align middle
    ul
      display flex
      li
        padding 0px 16px
        margin 8px 0
        line-height 22px
        border-right 1px solid #444
</style>
