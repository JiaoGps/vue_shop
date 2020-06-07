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
        <div class="banner">
          <img src="@/assets/img/banner.jpg" />
        </div>

        <!-- 活动区域 -->
        <div class="promotion">
          <div class="text">优惠专区</div>
          <div class="list">
            <div class="column" v-for="(row,index) in Promotion" :key="index">
              <div class="top">
                <div class="title">{{row.title}}</div>
                <div class="countdown" v-if="row.countdown">
                  <div>{{row.countdown.h}}</div>:
                  <div>{{row.countdown.m}}</div>:
                  <div>{{row.countdown.s}}</div>
                </div>
              </div>
              <div class="left">
                <div class="ad">{{row.ad}}</div>
                <div class="info">点击进入</div>
              </div>
              <div class="right">
                <img :src="row.img" />
              </div>
            </div>
          </div>
        </div>

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
      isLoading: false,
      // 活动专区
      Promotion: []
    };
  },
  createdL() {
    this.Timer();
  },
  methods: {
    onRefresh() {
      console.log("更新成功");
    },
    onChange(index) {
      this.current = index;
    },
    toCategory(row) {
      console.log(row);
    },
    Timer() {
      setInterval(() => {
        if (this.Promotion.length > 0) {
          for (let i = 0; i < this.Promotion.length; i++) {
            let row = this.Promotion[i];
            if (row.countdown) {
              if (
                !(
                  row.countdown.h == 0 &&
                  row.countdown.m == 0 &&
                  row.countdown.s == 0
                )
              ) {
                if (row.countdown.s > 0) {
                  row.countdown.s--;
                  row.countdown.s =
                    row.countdown.s < 10
                      ? "0" + row.countdown.s
                      : row.countdown.s;
                } else if (row.countdown.m > 0) {
                  row.countdown.m--;
                  row.countdown.m =
                    row.countdown.m < 10
                      ? "0" + row.countdown.m
                      : row.countdown.m;
                  row.countdown.s = 59;
                } else if (row.countdown.h > 0) {
                  row.countdown.h--;
                  row.countdown.h =
                    row.countdown.h < 10
                      ? "0" + row.countdown.h
                      : row.countdown.h;
                  row.countdown.s = 59;
                  row.countdown.m = 59;
                }
                this.Promotion[i].countdown = row.countdown;
              }
            }
          }
        }
      }, 1000);
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

  .category-list {
    position: relative;
    width: 92%;
    margin: 0 4%;
    padding: 0 0 30px 0;
    border-bottom: solid 2px #f6f6f6;
    display: flex;
    justify-content: space-between; //向两边对齐
    flex-wrap: wrap; //可以换行
    .category {
      width: 25%;
      margin-top: 50px;
      display: flex; //浮动
      flex-wrap: wrap; //可以换行
      .img {
        width: 100%;
        display: flex;
        justify-content: center; //居中
        img {
          width: 9vw;
          height: 9vw;
        }
      }
      .text {
        margin-top: 16px;
        width: 100%;
        display: flex;
        justify-content: center; //居中
        font-size: 24px;
        color: #3c3c3c;
      }
    }
  }

  .banner {
    width: 92%;
    margin: 40px 4%;
    img {
      width: 100%;
      height: 20vw;
      border-radius: 10vw;
      box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.3);
    }
  }

  .promotion {
    width: 92%;
    margin: 0 4%;
    .text {
      width: 100%;
      height: 60px;
      font-size: 34px;
      font-weight: 600;
      margin-top: -10px;
    }
    .left {
    }
  }
}
</style>