export default function ({$axios, redirect}) {
  /**
   * 请求拦截器
   */
  $axios.onRequest(config => {
    console.log('服务请求：' + config.url)
  })
  /** 
   * 异常拦截器
  */
 $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
 })

}