<template>
  <div>
    <div class="bodyBg">
      <canvas ref="bg"></canvas>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ctx: '',
      el: '',
      starArr: []
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
        starLen: randomNum(1, 6) * 35, // 流星长度
        starOpcity: 0, // 流星透明度
        color: colorArr[randomNum(0, colorArr.length - 1)], // 流星颜色
        speed: randomNum(2, 15),
        step:  randomNum(50, 300)
      }
      return starObj
    }
    
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.bodyBg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #871c21 url(../assets/img/body_bg.jpg) repeat;
  z-index: -1;
}
</style>
