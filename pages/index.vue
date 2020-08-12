<template>
  <div class="container display-flex">
    <div class="pInfo">
      个人信息
    </div>
    <div class="aList">
      <ul class="listUl" ref="listUl">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navEl: '',
      nctx: '',
      articleList: [],
      navIndex: 1
    }
  },
  async asyncData({$axios, err}) {
    
  },
  created() {
    this.getData()
  },
  mounted () {
    // this.initarticle()
  },
  methods: {
    async getData () {
      const data = await this.$axios.get('test')
      this.articleList = data.data.list
      console.log(this.articleList)
    },
    navClick (index) {
      this.navIndex = index
    },
    initarticle () {
      const lis = this.$refs.listUl.children
      for (const li of lis) {
        li.style.transform = `rotate(${this.randomNum(-5, 5)}deg)`
      }
    },
    randomNum (min, max) {
      const ch = max - min + 1
      return Math.floor(Math.random() * ch + min) 
    }
  }
}
</script>

<style lang='scss'>
$mainColor: #08540f;
$bigShadow: -1px 1px 2px 0 rgba(0, 255, 0, .4), -1px 1px 4px #002000 inset;
$smallShadow: -1px 1px 4px 0 #002000, -1px 1px 2px rgba(0, 255, 0, .4)inset;
@mixin bg {
    position: relative;
    border-radius: 4px;
    box-shadow: $bigShadow;
    padding: 15px;
  &::before{
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border: 15px solid $mainColor;
    border-radius: 4px;
  }
  &::after {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    right: 15px;
    bottom: 15px;
    box-shadow: $smallShadow;

  }
}
.container {
  margin: 0 auto 100px;
  width: 1000px;
  min-height: 300px;
  border-radius: 14px;
  justify-content: space-between;
  padding-top: 20px;
}
.pInfo {
  width: 250px;
  min-height: 400px;
  @include bg;
}
.aList {
  width: 735px;
  min-height: 400px;
  @include bg;
}

.listUl {
  position: relative;
  padding-top: 30px;
  z-index: 3;
  li{
    margin-bottom: 50px;
    margin-left: 30px;
    width: 400px;
    height: 200px;
    transform-origin: 0 50%;
    @include bg;
    &::before{
      border-color: rgba(5, 61, 10, 1);
    }
    &:hover{
      &::before {
        border-color: $mainColor;
      }
    }
  }
}
</style>
