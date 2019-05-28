<template>
  <div class="index-box">
    <!-- 顶部栏 -->
    <div class="head-column-box">
      <div class="logo-box">
        <img src="https://news.ycombinator.com/y18.gif" alt="">
      </div>
      <ul>
        <li v-for="(item, index) in headColumnData" :key="index"><a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.name }}</a></li>
      </ul>

      <!-- <div class="person" style="color: #fff;position: absolute; right: 12px;"><i class="el-icon-s-custom"></i> &nbsp;springTech</div> -->
      <div class="person" style="color: #fff;position: absolute; right: 12px;"><span><img style="width: 22px; height: 22px;vertical-align: middle;" src="./images/person.png" alt=""></span> &nbsp;springTech</div>

    </div>

    <div class="head-blank" style="height: 38px;"></div>

    <div class="content-box">
      <!-- 新闻信息 -->
      <div class="news-title-box">
        <i class="el-icon-thumb"></i>
        <a :href="newMessage.link" target="blank">{{ newMessage.enTitle }}</a>
        <a :href="newMessage.siteLink" target="blank">({{ newMessage.site }})</a>
      </div>

      <div class="news-message-box">
        {{ newMessage.points }} points by {{ newMessage.author }} &nbsp;  {{ newMessage.createTime | timeAgo }}
      </div>

      <!-- 输入评论 -->
      <div class="comment-reply-box" :style="{flexDirection: textearaRowS == 2 ? 'row' : 'column'}">
        <el-input
          :rows="textearaRowS"
          type="textarea"
          placeholder="写下您的评论"
          v-model="commentContent"
          show-word-limit
          @focus="inputFocus"
          
        >
        </el-input>

        <!-- 评论按钮，不输入时，rows变小，不占空间，参考今日头条PC -->
        <div class="comment-btn-box" v-show="textearaRowS == 2" @click="inputFocus">评论</div>
        <div class="comment-btn-bottom-box" v-show="textearaRowS == 8"><div class="btn" @click="addComment">评论</div></div>
      </div>

      <div style="background: #f2f2f2;height: 1px;"></div>

      <div class="comment-index-box">
        <comment-box></comment-box>
      </div>
    </div>
  </div>
</template>

<script>


import news from './data/news.js'

import commentBox from './comment'


export default {
  data() {
    return {
      newMessage: news[0], //新闻数据
      headColumnData: [
        {name: 'Hacker News', href: 'https://news.ycombinator.com/news'},
        {name: 'welcome', href: 'https://news.ycombinator.com/newswelcome.html'},
        {name: 'new', href: 'https://news.ycombinator.com/newest'},
        {name: 'threads', href: 'https://news.ycombinator.com/threads?id=jok311'},
      ], //页面头部
      commentContent: '', //评论内容
      textearaRowS: 2,
      

    }
  },

  components: { commentBox },

  methods: {
    inputFocus() {
      this.textearaRowS = 8
    },
    inputBlur() {
      this.textearaRowS = 2
    },

    addComment() {
      if( this.commentContent ) {
        let data = {
          content: this.commentContent,
          parentId: null
        }
        this.$store.dispatch("addComment", data).then( res => {
          this.commentContent = ''
          this.inputBlur()
        })

      }else{
        this.$message({
          message: '评论内容不能为空',
          type: 'warning'
        });        
      }

    }

  },
}
</script>


<style lang="stylus" scoped>
// 使用了stylus css预处理器

$themeColor = #FF6600

.index-box
  max-width 72vw
  min-width 720px
  margin 0 auto
  background #fff
  min-height 100vh
  color #222
  .head-column-box
    position fixed
    width 72vw
    box-sizing border-box
    min-width 720px
    background $themeColor
    // position relative
    padding-left 16px
    display flex
    align-items center
    z-index 2
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
  .content-box
    padding 16px
    .news-title-box
      text-align left
    .comment-reply-box
      width 32vw
      min-width 320px
      margin 24px 0 24px 0
      border 1px solid #3f404c
      display inline-flex
      .comment-btn-box
        width 180px
        height auto
        background #3f404c
        color #fff
        font-size 24px
        display flex
        align-items center
        justify-content center
      .comment-btn-bottom-box
        height 56px
        background #f4f5f6
        position relative
        .btn
          width 150px
          height 56px
          background #3f404c
          display flex
          align-items center
          justify-content center
          position absolute
          right 0
          color #fff
          font-size 24px

</style>

<style lang="stylus">
.comment-reply-box
  textarea
    border none
    font-size 16px
    color #3f404c
    resize none
</style>

