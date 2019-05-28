import { treeDataTranslate } from '@/utils/treeDataTranslate'
import comments from '@/views/data/comments.js'

const globalState = {
  state: {
    globalReplyId: '',
    commentsList: [],
    comments: comments, //原始数据
  },

  mutations: {

    GLOBAL_REPLY_ID: (state, data) => {
      state.globalReplyId = data;
    },
    CHANGECOMMENTSLIST: (state, data) => {
      state.commentsList = data;
    },
    // ADDCOMMENT: (state, data) => {

    //   state.commentsList = data;
    // },
  },

  actions: {

    // 回复框
    globalReplyId({
      commit
    }, data) {
      commit('GLOBAL_REPLY_ID', data)
    },


    // 因为没有接口，用vuex做全局调用，方便处理
    // 因为没有接口，用vuex做全局调用，方便处理
    // 因为没有接口，用vuex做全局调用，方便处理
    
    // 初始化数据
    initCommentsList({
      commit
    }, data) {
      // 本地存数据
      if( !window.localStorage.comments ) {
        window.localStorage.comments = JSON.stringify( comments )
      }

      //用户名
      if( !window.localStorage.userName ) {
        window.localStorage.userName = "springTech"
      }

      let commentsList =  treeDataTranslate(JSON.parse( window.localStorage.comments )) //本地数据) //将评论转为树数组      

      commit("CHANGECOMMENTSLIST", commentsList)

    },  
    
    //新增评论或者回复
    addComment({ commit }, data) {

      console.log(data)

      let commentParams =   {
        id: Math.random().toString(36).substr(2), //评论ID
        parentId: data.parentId, //评论父级ID，null时评论为一级评论
        newsId: "4287c6df-d3dd-6428-43b4-051cb3890d6e", //评论所属文章
    
        userName: window.localStorage.userName, //评论用户
        content: data.content, //评论内容
        createTime: Math.round(new Date() / 1000), //评论时间（时间戳）
      }

      let comments = JSON.parse( window.localStorage.comments )
      comments.unshift(commentParams)

      window.localStorage.comments = JSON.stringify( comments ) //存新数据

      let commentsList =  treeDataTranslate( JSON.parse( window.localStorage.comments ) ) //本地数据) //将评论转为树数组      


      console.log(commentsList)

      commit("CHANGECOMMENTSLIST", commentsList)  //更新页面数据  


    }

  }
}

export default globalState