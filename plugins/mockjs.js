import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock(/test/, {
  'list|10-20': [{
    'id|+1': 1,
    'img': '@image',
    'time': '@date',
    'title': '@ctitle',
    'dec': '@cparagraph'
  }]
})