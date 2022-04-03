export const contentTableConfig = {
  title: '商品信息',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
/*
"id": 183,
"name": "吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦",
"oldPrice": "43",
"newPrice": "30",
"desc": "吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦",
"status": 1,
"imgUrl": "http://s11.mogucdn.com/mlcdn/17f85e/180927_5i77e04lhaalbg3dai0j4588lbahh_640x960.jpg_560x999.jpg",
"inventoryCount": 6285,
"saleCount": 2,
"favorCount": 3,
"address": "天津",
"categoryId": 6,
"createAt": "2021-04-30T13:43:16.000Z",
"updateAt": "2021-04-30T13:43:16.000Z"

*/
