<template>
  <div>
    <!-- 页面背景画布 -->
    <div class="bodyBg">
      <canvas ref="bg"></canvas>
    </div>
    <!-- logo -->
    <div class="logo display-flex">
      <img class="logo-img" src="../assets/img/sunshine.png" alt="">
      <img class="logo-text" src="../assets/img/logo_text.png" alt="">
    </div>
    <nav>
     <div class="nav-bg display-flex">
        <div class="circle-big">
          <div class="circle-small"></div>
          <div class="shade-bg"></div>
          <a-carousel class="default-carousel" effect="fade" autoplay>
            <div>
              <img src="../assets/img/a.jpg" alt="">
            </div>
            <div><img src="../assets/img/b.jpg" alt=""></div>
            <div><img src="../assets/img/c.jpg" alt=""></div>
            <div><img src="../assets/img/d.png" alt=""></div>
            <div><img src="../assets/img/e.png" alt=""></div>
          </a-carousel>
        </div>
        <div class="pip-center">
          <span></span>
        </div>
        <div class="nav-rect-wrap">
          <div class="nav-rect-big"></div>
          <div class="nav-rect"></div>
          <div class="nav-rect-bg"></div>
          <div class="nav" ref="nav">
            <span @click="navClick(1)" :class="{active: navIndex == 1}"><i></i><b>首页</b></span>
            <span @click="navClick(2)"  :class="{active: navIndex == 2}"><i></i><b>日常</b></span>
            <span @click="navClick(3)"  :class="{active: navIndex == 3}"><i></i><b>随记</b></span>
            <span @click="navClick(4)"  :class="{active: navIndex == 4}"><i></i><b>关于</b></span>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ctx: '',
      el: '',
      starArr: [],
      navIndex: 1
    }
  },
  mounted () {
    this.initCanvas(10)
  },
  methods: {
    initCanvas () {
      this.el = this.$refs.bg
      this.ctx = this.el.getContext('2d')
      this.ctx.canvas.width = document.documentElement.clientWidth
      this.ctx.canvas.height = document.documentElement.clientHeight
      // this.ctx.beginPath(); //重新开始新路径
      // this.ctx.moveTo(0, 0);
      // this.ctx.lineTo(100, 100);
      // this.ctx.lineTo(100, 200);
      // this.ctx.closePath(); //闭合路径（可以连接首尾）
      // this.ctx.stroke(); //记得最后调用stroke才能画线
      // console.log(new this.Star(this.ctx.canvas.width, this.ctx.canvas.height))
      this.newStar(20)
      requestAnimationFrame(this.drawCanvas)
      // const el = this.$refs.nav
      // el.onmousemove = (e) => {
      //   const loc = this.windowToEl(el, e.x, e.y)
      //   console.log(loc)
      //   const singleW = Math.round(743 / 4)
      //   const num = Math.floor(loc.x / singleW)
      //   document.getElementById('borderShine').style.width = 242 + num * singleW + singleW + 'px'
      // }
      // el.onmouseleave = (e) => {
      //   document.getElementById('borderShine').style.width = 0
      // }
    },
    drawCanvas () {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.lineCap = 'round'
      this.starArr.forEach((star, index) => {
        this.drawStar(star)
        this.starArr[index] = this.updataStar(star)
      })
      requestAnimationFrame(this.drawCanvas)
    },
    drawStar (star) {
      const ctx = this.ctx
      ctx.beginPath()
      let grad = ctx.createLinearGradient(star.xNum, star.yNum, star.endX, star.endY)
      grad.addColorStop(0, `rgba(${star.color},${star.starOpcity / 10})`)
      grad.addColorStop(1, `rgba(${star.color},0.1)`)
      ctx.strokeStyle = grad
      ctx.moveTo(star.xNum, star.yNum)
      ctx.lineTo(star.endX,  star.endY)
      // if (star.step <= 5) {
      //   ctx.globalAlpha = star.step / 5
      // } else {
      //   ctx.globalAlpha = 1
      // }
      ctx.stroke()

      // 更细数据
    },
    updataStar (item) {
      // if (item.step <= 0) {
      //   let newStar = new this.Star(this.ctx.canvas.width, this.ctx.canvas.height)
      //   return this.initStarEnd(newStar)
      // } else if (item.step <= 10) {
      //   item.starOpcity -= 1
      // } else if (item.starOpcity < 10) {
      //   item.starOpcity++
      // }
      const xMax = this.ctx.canvas.width + item.starLen
      const xMin = 0 - item.starLen
      const yMax = this.ctx.canvas.height + item.starLen
      const yMin = 0 - item.starLen
      if (item.xNum < xMin || item.xNum > xMax || item.yNum < yMin || item.yNum > yMax) {
        let newStar = new this.Star(this.ctx.canvas.width, this.ctx.canvas.height)
        return this.initStarEnd(newStar)
      } else if (item.starOpcity < 10) {
        item.starOpcity++
      }
      // 转弯
      // const t = this.randomNum(1, 20)
      // if (t < 5) {
      //   item.dir = t
      // }
      item.step -= 1
      switch (item.dir) {
        case 1: // 上
          item.yNum -= item.speed
          item['endY'] = item.yNum + item.starLen
          break;
        case 2: // 下
          item.yNum += item.speed
          item['endY'] = item.yNum - item.starLen
          break;
        case 3: // 左
          item.xNum -= item.speed
          item['endX'] = item.xNum + item.starLen
          break;
        case 4: // 右
          item.xNum += item.speed
          item['endX'] = item.xNum - item.starLen
          break;
        default:
          break;
      }
      return item
    },
    initStarEnd (item) {
      switch (item.dir) {
        case 1: // 上
          item['endX'] = item.xNum
          item['endY'] = item.yNum + item.starLen
          break;
        case 2: // 下
          item['endX'] = item.xNum
          item['endY'] = item.yNum - item.starLen
          break;
        case 3: // 左
          item['endX'] = item.xNum + item.starLen
          item['endY'] = item.yNum
          break;
        case 4: // 左
          item['endX'] = item.xNum - item.starLen
          item['endY'] = item.yNum
          break;
        default:
          break;
      }
      return item
    },
    newStar (starNum) {
      for(let i = 0; i < starNum; i++) {
        this.starArr.push(new this.Star(this.ctx.canvas.width, this.ctx.canvas.height))
      }
      this.starArr.map(item => {
        return this.initStarEnd(item)
      })
    },
    randomNum (min, max) {
      const ch = max - min + 1
      return Math.floor(Math.random() * ch + min) 
    },
    Star (width, height) {
      const randomNum = function (min, max) {
        const ch = max - min + 1
        return Math.floor(Math.random() * ch + min) 
      }
      const randomColor = function () {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        return r + ',' + g + ',' + b
      }
      let colorArr = ['254,0,0', '255,153,29', '246,254,9', '164,228,8', '1,226,255', '30,132,255', '253,34,216', '122,29,221', '0,255,0', '0,139,0', '255,255,0', '255,106,106', '250,128,114', '139,10,80', '255,0,255', '	0,178,238']
      let starObj = {
        dir: randomNum(1, 4), // 1上 2下 3左 4右
        xNum: randomNum(0, Math.floor(width / 50)) * 50 - 1, // 横坐标轴坐标
        yNum: randomNum(0, Math.floor(height / 35)) * 35 - 1, // 横坐标轴坐标
        starLen: randomNum(1, 4) * 35, // 流星长度
        starOpcity: 0, // 流星透明度
        color: colorArr[randomNum(0, colorArr.length - 1)], // 流星颜色
        speed: randomNum(1, 20),
        step:  randomNum(50, 300)
      }
      return starObj
    },
    windowToEl (el, x, y) {
      console.log(el)
      const bbox = el.getBoundingClientRect()
      return {
        x: x - bbox.left,
        y: y - bbox.top
      }
    },
    navClick (index) {
      this.navIndex = index
    }
  }
}
</script>

<style scope lang='scss'>
$mainColor: #08540f;
$bigShadow: -1px 1px 2px 0 rgba(0, 255, 0, .4), -1px 1px 4px #002000 inset;
$smallShadow: -1px 1px 4px 0 #002000, -1px 1px 2px rgba(0, 255, 0, .4)inset;
.bodyBg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #085610 url(../assets/img/body_bg_3.jpg) repeat;
  z-index: -1;
}

.logo {
  height: 115px;
  width: 1000px;
  padding-left: 200px;
  margin: 0 auto -40px;
  align-items: flex-end;
  flex-flow: row-reverse nowrap;
  .logo-img {
    height: 100px;
  }
  .logo-text{
    height: 40px;
    margin-right: 50px;
    margin-bottom: 10px;
  }
}

nav {
  width: 1000px;
  height: 180px;
  margin: 0 auto;
}

.circle-big {
  background: $mainColor;
  height: 180px;
  width: 180px;
  border-radius: 100%;
  box-shadow: $bigShadow;
  padding: 15px;
  position: relative;
  .circle-small {
    background: $mainColor;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    box-shadow: $smallShadow;
  }
  .shade-bg {
    position: absolute;
    width: 10px;
    height: 15px;
    right: 0;
    top: 50%;
    background: $mainColor;
    transform: translateY(-50%);
  }
}
.nav-bg{
  align-items: center;
}
.pip-center {
  width: 15px;
  height: 15px;
  background: $mainColor;
  overflow: hidden;
  span{
    display: block;
    height: 13px;
    width: 19px;
    margin-left: -2px;
    background: $mainColor;
    box-shadow: 0px 1px 2px 0 #00ff00, 0px 1px 4px #002000 inset;
  }
}
.nav-rect-wrap {
  height: 90px;
  width: 805px;
  // background: $mainColor;
  // background: linear-gradient(225deg, transparent 20px, $mainColor 0);
  position: relative;
  .nav-rect-big{
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    width: 100%;
    height: 100%;
    box-shadow: $bigShadow;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }
  .nav-rect {
    height: 60px;
    width: 775px;
    background: rgba(8, 84, 15, .2);
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    box-shadow: $smallShadow;
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 3;
  }
  .nav-rect-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    border: 15px solid $mainColor;
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.nav {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;
    font-size: 28px;
    color: #0aaa1e;
    z-index: 3;
    position: absolute;
    left: 15px;
    right: 15px;
    top: 0;
  }
  .nav span {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    position: relative;
    cursor: pointer;
  }
  .nav span b{
    display: block;
    height: 100%;
    width: 100%;
    z-index: 2;
    position: relative;
  }
  .nav span.active b{
    color: $mainColor;
    text-shadow: -1px 1px 2px #002000 ;
    
  }
  .nav span.active i{
    width: 100%;
    height: 100%;
    background: rgba(5, 61, 10, .9);
    box-shadow: $bigShadow;
  }
  .nav span i{
    position: absolute;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
  }
  .nav span:hover b {
    color: $mainColor;
    text-shadow: -1px 1px 2px #002000;
  }
  .nav span:hover i{
    width: 100%;
    height: 100%;
    background: rgba(5, 61, 10, .7);
    box-shadow: $bigShadow;
  }
  .default-carousel {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    .slick-track {
      height: 150px;
    }
    .slick-dots {
      opacity: 0;
    }
    .slick-slide {
      & > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        & > div{
          height: 100%;
        }
      }
    }
    .slick-slide img {
      object-fit: cover;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  
</style>
