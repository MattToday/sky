<template>
  <div>
    <div class="bodyBg">
      <canvas  id="star" ref="star"></canvas>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      starArr: [],
      config: {
        num: 10,
        rectW: 50,
        rectH: 35,
        minStarLen: 1,
        maxStarLen: 2,
        minStep: 5,
        maxStep: 10
      }
    }
  },
  mounted () {
    this.initCanvas()
    this.initData()
  },
  methods: {
    initCanvas () {
      this.el = this.$refs.star
      this.ctx = this.el.getContext('2d')
      this.ctx.canvas.width = document.documentElement.clientWidth
      this.ctx.canvas.height = document.documentElement.clientHeight
    },
    initData () {
      for (let k = 0; k < this.config.num; k++) {
         this.starArr.push([this.createStartPoint()])
      }
      requestAnimationFrame(this.beginStar)
    },
    beginStar () {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      // console.log(this.starArr)
      for (let i = 0; i < this.starArr.length; i++) {
        const star = this.starArr[i]
        const oldStar = this.drawLine(star)
        if (oldStar) {
          this.starArr[i] = oldStar
        } else {
          this.starArr[i] = [this.createStartPoint()]
        }
      }
      requestAnimationFrame(this.beginStar)
    },
    drawLine (star) {
      const lastStar = star[star.length - 1]
      const ctx = this.ctx
      if (lastStar.step > 0) {
        if (star.length >  lastStar.len) {
          star.shift()
        }
        const newPoint = this.createStartPoint(lastStar)
        star.push(newPoint)
        for (let i = 0; i < star.length - 1; i++) {
          const point = star[i]
          const nexPoint = star[i + 1]
          ctx.beginPath()
          ctx.strokeStyle = 'blue'
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(nexPoint.x, nexPoint.y)
          ctx.stroke()
        }
        return star
      } else {
        return false
      }
    },
    createStartPoint (star) {
      if (star) {
        // 判断是否可以转向
        if (star.x % this.config.rectW === 0 && star.y % this.config.rectH === 0 && this.isDirection()) {
          star.dir = this.direction(star)
        }
        return this.addStep(star)
      } else {
        return {
          x: this.randomNum(0, Math.floor( this.ctx.canvas.width / 50)) * 50 - 1,
          y: this.randomNum(0, Math.floor( this.ctx.canvas.height / 35)) * 35 - 1,
          dir: this.randomNum(1, 4), // 1上 2下 3左 4右
          // len: this.randomNum(this.config.minStarLen * this.config.rectW, this.config.maxStarLen * this.config.rectW),
          len: 50,
          step: this.randomNum(this.config.minStep * this.config.rectW, this.config.maxStep * this.config.rectW),
          speed: this.randomNum(1, 10)
        }
      }
    },
    isDirection () {
      if (this.randomNum(1, 4) > 0) {
        return true
      } else {
        return false
      }
    },
    direction (star) {
      if (star.dir === 1 || star.dir === 2) {
        return this.randomNum(3, 4)
      } else {
        return this.randomNum(1, 2)
      }
      
    },
    addStep (star) {
      let copyStar = {...star}
      switch (copyStar.dir) {
        case 1: // 上
          copyStar.y += copyStar.speed
          break;
        case 2: // 下
          copyStar.y -= copyStar.speed
          break;
        case 3: // 左
         copyStar.x -= copyStar.speed
          break;
        case 4: // 右
          copyStar.x += copyStar.speed
          break;
        default:
          break;
      }
      copyStar.step--
      return copyStar
    },
    randomNum (min, max) {
      const ch = max - min + 1
      return Math.floor(Math.random() * ch + min) 
    },
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
</style>