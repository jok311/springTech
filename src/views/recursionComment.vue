<template>
  <div class="recursion-comment-box" v-if="data" :style="{paddingLeft: `${data._level ? data._level*15 : 15}px !important`}">
    <!-- 递归渲染无限极评论 -->
    <div class="message-box">
      <div class="message">
        <i class="el-icon-thumb"></i>
        <span class="user-name-box" style="color: #406599;">{{ data.userName }}</span>
          &nbsp;
        <span class="create-time-box">{{ data.createTime }}</span>
        <!-- <i :class="isShowContent ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"  @click=" isShowContent = !isShowContent"></i> -->
        <i :class="isShowContent ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"  @click=" isShowContent = !isShowContent"></i>
      </div>
      <div class="showBox" v-if="isShowContent">
        <div  class="comment-content-box" style="padding-bottom: 16px;">{{ data.content }}</div>

        <div  style="border-bottom: 1px solid #f2f2f2;padding-bottom: 16px; color: #406599;" class="reply-box"><div class="reply-btn">回复</div></div>
        
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

export default {
  data() {
    return {
      isShowContent: true
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return null
      }
    }
  },

}
</script>

<style lang="stylus" scoped>
.recursion-comment-box
  padding 16px 0
  // border-bottom 1px solid #f2f2f2
</style>
