<template>
  <div ref="scroll">
    <div class="home">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 头部搜素 -->
        <header>
          <!-- van-row  Layout 布局-->
          <!-- van-search   Search 搜索-->

          <van-row type="flex" justify="space-around" align="center">
            <van-icon name="scan" />
            <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
            <van-icon name="chat-o" />
          </van-row>
        </header>
        <!-- 轮播 -->
        <div class="swipe">
          <van-swipe class="goods-swipe" :autoplay="3000" @change="onChange">
            <van-swipe-item v-for="item in swiperList" :key="item.id">
              <img :src="item.img" />
            </van-swipe-item>
            <div class="indicator" slot="indicator">
              <div
                class="dots"
                v-for="(item,index) in swiperList"
                :key="index"
                :class="[current >= index ? 'on' : '']"
              ></div>
            </div>
          </van-swipe>
        </div>

        <!-- 分类列表 -->
        <div class="category-list">
          <div
            class="category"
            v-for="(row,index) in categoryList"
            :key="index"
            @click="toCategory(row)"
          >
            <div class="img">
              <img :src="row.img" alt />
            </div>
            <div class="text">{{ row.name }}</div>
          </div>
        </div>

        <!-- 广告 -->
        <div class="banner"></div>

        <!-- 活动区域 -->
        <div class="promotion"></div>

        <!-- 商品列表 -->
        <div class="goods-list"></div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      current: 0,
      // 轮播图片
      swiperList: [
        { id: 1, src: "url1", img: require("@/assets/img/1.jpg") },
        { id: 2, src: "url2", img: require("@/assets/img/2.jpg") },
        { id: 3, src: "url3", img: require("@/assets/img/3.jpg") }
      ],
      // 分类菜单
      categoryList: [
        { id: 1, name: "办公", img: require("@/assets/img/category/1.png") },
        { id: 2, name: "家电", img: require("@/assets/img/category/2.png") },
        { id: 3, name: "服饰", img: require("@/assets/img/category/3.png") },
        { id: 4, name: "日用", img: require("@/assets/img/category/4.png") },
        { id: 5, name: "蔬果", img: require("@/assets/img/category/5.png") },
        { id: 6, name: "运动", img: require("@/assets/img/category/6.png") },
        { id: 7, name: "书籍", img: require("@/assets/img/category/7.png") },
        { id: 8, name: "文具", img: require("@/assets/img/category/8.png") }
      ],
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      console.log("更新成功");
    },
    onChange(index) {
      this.current = index;
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  header {
    padding: 0 20px;
    .van-search__content {
      border-radius: 17px;
    }
    .van-search {
      flex: 1;
    }
    .van-icon {
      font-size: 20px;
    }
  }

  .swipe {
    position: relative;
    width: 100%;
    .van-swipe {
      height: 100%;
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background-color: rgba(255, 255, 255, 0.4);
      width: 150px;
      height: 5px;
      border-radius: 3px;
      overflow: hidden;
      display: flex;
      .dots {
        width: 0;
        background-color: rgb(235, 90, 6, 1);
        transition: all 0.3s ease-out;
        &.on {
          width: (100%/3);
        }
      }
    }
    &::after {
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
      content: "";
      z-index: 1;
      height: 20px;
      width: 100%;
      border-radius: 0 0 50% 50%;
      // background: linear-gradient(to right, red, yellow, red);
      background: linear-gradient(
          135deg,
          rgb(238, 5, 5),
          #f90,
          #3c9,
          #09f,
          rgb(240, 6, 162)
        )
        left center/400% 400%;
      animation: move 10s infinite;
    }
    @keyframes move {
      0%,
      100% {
        background-position-x: left;
      }
      50% {
        background-position-x: right;
      }
    }
  }

  .category-list{
    position: relative;
    
  }



}
</style>