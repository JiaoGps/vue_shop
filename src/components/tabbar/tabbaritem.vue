<template>
  <!-- 已选择的时候吧 color : 变为红色 -->
  <div class="itemWarp" :class="{'is-active':isActive}" @click="changePage">
    <span v-show="!isActive">
      <!-- 子组件 -->
      <slot name="normalImg"></slot>
    </span>

    <!-- 点击是show出已选择的 img -->
    <span v-show="isActive">
      <slot name="activeImg"></slot>
    </span>
    <span>{{data.title}}</span>
  </div>
</template>

<script  type="text/javascript">
export default {
  name: "tabbaritem", 
  //定义父组件要转入的值
  props: {
    //   id: 1, //唯一
    //   path: "/home", //路由地址
    //   title: "首页", //title
    //   icon: "wap-home", //icon
    //   normal: require("@i/tab-home.png"), //不是被选中的图片
    //   active: require("@i/tab-home-current.png") //选中的图片
    data: {
      type: Object
    },
    sel: {
      type: Number
    }
  },
  computed: {
    isActive: function() {
      if (this.sel == this.data.id) {
        return true;
      }
      return false;
    }
  },
  methods: {
    changePage() {
      this.$router.push(this.data.path); //路由守卫
      //1、父组件可以使用 props 把数据传给子组件。
      //2、子组件可以使用 $emit 触发父组件的自定义事件。
      this.$emit("changePage", this.data.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.itemWarp {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
}

.is-active {
  color: #fa436a;
  // border: 1px solid #ddd;
  // border-radius: 0 0 50% 50%;
  // border-top: none;
}

.itemWarp span {
  font-size: 14px;
  line-height: 1;
}
</style>