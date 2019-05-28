<template>
  <div class="recursion-comment-box" v-if="data" :style="{paddingLeft: `${data._level ? data._level*15 : 15}px !important`}">
    <!-- 递归渲染无限极回复 -->
    <div class="message-box">
      <div class="message">
        <!-- element标签打包有问题  时间有点赶，只能用img代替图标 -->
        <span  @click="srcImg = !srcImg"><img style="width: 18px; height: 18px;vertical-align: middle;" :src="srcImg ?  colorImg: geryImg" alt=""></span>
        <span class="user-name-box" style="color: #406599;">{{ data.userName }}</span>
          &nbsp;
        <span class="create-time-box">{{ data.createTime | timeAgo }}</span>
        <!-- <i :class="isShowContent ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"  @click=" isShowContent = !isShowContent"></i> -->
        <!-- <i :class="isShowContent ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"  @click=" isShowContent = !isShowContent"></i> -->
        <!-- <i :class="isShowContent ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"  @click=" isShowContent = !isShowContent"></i> -->
        
        <span  @click=" isShowContent = !isShowContent"><img style="width: 18px; height: 18px;vertical-align: middle;" :src="isShowContent ?  caretUp: caretDown" alt=""></span>
      </div>
      <div class="showBox" v-if="isShowContent">
        <div  class="comment-content-box" style="padding: 8px 0;">{{ data.content }}</div>

        <div  style="border-bottom: 1px solid #f2f2f2;padding-bottom: 16px; color: #406599;" class="reply-box">
          <div class="reply-btn" style="width: 58px;" @click="changeReplayId">回复</div>
          <!-- 输入回复 -->
          <div v-if="globalReplyId == data.id" class="comment-reply-box" :style="{flexDirection: textearaRowS == 2 ? 'row' : 'column'}">
            <el-input
              :rows="textearaRowS"
              type="textarea"
              placeholder="写下您的回复"
              v-model="commentContent"
              show-word-limit
              @focus="inputFocus"
            >
            </el-input>

            <!-- 回复按钮，不输入时，rows变小，不占空间，参考今日头条PC -->
            <div class="comment-btn-box" v-show="textearaRowS == 2" @click="inputFocus">回复</div>
            <div class="comment-btn-bottom-box" v-show="textearaRowS == 8"><div class="btn" @click="addComment">回复</div></div>
          </div>        
          
        </div>

        <div  v-if="data.children && data.children.length">
          <div class="children-comment-box" v-for="(item, index) in data.children"  :key="index">
            <recursion-comment :data="item"></recursion-comment>
          </div>
        </div>      
      </div>


    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isShowContent: true,
      textearaRowS: 2,

      commentContent: "",

      srcImg: false,
      geryImg: require("./images/greygood.png"),
      colorImg: require("./images/colorgood.png"),

      carImg: false,
      caretUp: require("./images/caret-up.png"),
      caretDown: require("./images/caret-down.png"),

    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return null
      }
    },
  },

  computed: {
    ...mapGetters(['globalReplyId']) //公共状态数据
  },  

  methods: {
    inputFocus() {
      this.textearaRowS = 8
    },
    inputBlur() {
      this.textearaRowS = 2
    },
    changeReplayId() {
      this.$store.dispatch("globalReplyId", this.data.id)
    },

    addComment() {
      if( this.commentContent ) {
        let data = {
          content: this.commentContent,
          parentId: this.data.id
        }
        this.$store.dispatch("addComment", data).then( res => {
          this.commentContent = ''
          this.inputBlur()
          this.$store.dispatch("globalReplyId", "")
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
.recursion-comment-box
  padding 16px 0
  box-sizing border-box
  // border-bottom 1px solid #f2f2f2



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
