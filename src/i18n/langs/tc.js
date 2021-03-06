import twLocale from 'element-ui/lib/locale/lang/zh-TW' //引入element语言包
const tc = {
  message: {
    'text': 'Good good study, Day day up',
  },
  header: {
    tabsHomeOne: '首頁',
    tabsHomeTwo: '產品中心',
    tabsHomeThree: '我的詢價',
    tabsHomeFour: '我的訂單',
    tabsHomeFive: '關於我們',
    logoNmae: '攝超商城',
    login: '登錄',
    register: '註冊',
    basicSet: '個人設置',
    Logout: '退出登錄',
    message: '消息'
  },
  home: {
    serviceDynamics: '服務動態',
    recommendCommodities: '推薦商品',
    placeholder: '標題查詢',
    more: '查看更多',
    recommend: '推薦',
  },
  product: {
    placeholder: '標題查詢',
    brandCategory: '品牌分類',
    productCategory: '產品分類',
    all: '全部',
    stock: '庫存',
    monthlySales: '月銷量',
    goBuy: '前往搶購'
  },
  productDetail: {
    crumb: '產品中心',
    supplyDetails: '供應詳情',
    stock: '庫存',
    monthlySales: '月銷量',
    color: '顏色',
    number: '數量',
    addCart: '加入購物車',
    buyNow: '立即購買',
    addBargainingList: '添加至議價單',
    prompt: '若以上價格、存量不滿足妳的需求，可聯系客服，我們將為妳協商解決',
    onlineService: '在線客服',
    productDesciption: '商品介紹',
    specifications: '規格參數'
  },
  bargain: {
    stepOne: '編輯議價單',
    stepTwo: '收貨地址',
    stepThree: '完成',
    title: '我要議價',
    businessInformation: '商家信息',
    unitPriceNegotiation: '單價議價',
    number: '數量',
    intentionalPrice: '意向價格',
    originalPrice: '原價',
    currentTotalPrice: '現總價',
    originalTotalPrice: '原總價',
    delete: '刪除',
    generateBargainList: '生成議價單',
    colorCategory: '顏色分類'
  },
  bargainSuccess: {
    submitCompleted: '提交完成',
    tipOne: '您的議價單已提交成功，您可在',
    tipTwo: '個人中心',
    tipThree: '我的詢價',
    tipFour: '中查詢歷史詢價記錄，我們將盡快回復的詢價，請留意平臺客服的詢價結果通知。',
    onlineService: '如有其他疑問，可聯系在線客服',
  },
  cartAddress: {

    receivingAddress: '收貨地址',
    selectShippingAddress: '選擇收貨地址',
    plaeseSelectShippingAddress: '請選擇收貨地址',
    setAsDefault: '設為默認',
    consignee: '收貨人',
    phoneCode: '电话区号',
    placeholdephoneCode: '请选择电话区号',
    cellphoneNumber: '手機號碼',
    area: '所在地區',
    address: '詳細地址',
    addShippingAddress: '新增收貨地址',
    placeholderPeople: '請輸入收貨人',
    placeholderMobile: '請輸入手機號碼',
    placeholderAddress: '請輸入詳細地址',
    setAsDefaultAddress: '設為默認地址',
    confirmSave: '確認保存',
    confirm: '確定',
  },
  enquire: {
    bargain: '去議價',
    submit: '待提交',
    myInquirySheet: '我的詢價單',
    bargainingNumber: '議價編號',
    createdTime: '創建時間',
    all: '全部',
    pendingReview: '待審核',
    agreed: '已同意',
    auditNotPassed: '審核不通過',
    completed: '已完成',
    cancelled: '已取消',
    placeholderOlder: '請輸入議價單號',
    color: '顏色',
    details: '查看詳情',
    completedprice: '按批復價成交',
  },
  enquireDetail: {
    myInquirySheet: '我的詢價單',
    bargainingNumber: '議價編號',
    createdTime: '創建時間',
    titleA: '平臺將在42小時內對您的訂單進行審核，請耐心等待',
    titlePo: '廠商已同意您的價格，請您點擊',
    titlePs: '去結算',
    titlepth: '完成交易',
    titleFo: '廠商已駁回您的意向價格，您可以點擊',
    titleFs: '重新議價',
    titleFt: '完成協商',
    titleC: '妳已經取消了該議價單',
    titleE: '該議價單已經完成',
    product: '產品',
    parameter: '參數',
    quantity: '數量',
    intentionPrice: '意向單價',
    finalprice: '最終單價',
    totalprice: '意向總價',
    approvalprice: '最終批復價',
    giveup: '放棄議價',
    thinkagain: '我再想想',
    Regeneratebargaining: '重新生成議價單',
    all: '全部',
    pendingReview: '待審核',
    agreed: '已同意',
    auditNotPassed: '審核不通過',
    completed: '已完成',
    cancelled: '已取消',
    placeholderOlder: '請輸入議價單號',
    color: '顏色',
    completedprice: '按批復價成交',
  },
  cart: {
    stepOne: '購物車',
    stepTwo: '收貨地址',
    stepThree: '提交訂單',
    selectall: '全選',
    description: '描述',
    unitprice: '單價',
    quantity: '數量',
    totalprice: '總價',
    delete: '删除',
    color: '顏色',
    bill: '賬單',
    totalpayment: '總支付',
    remark: '給買家留言',
    placeholderremark: '選填',
    continueshopping: '繼續購物',
    settlement: '結算',
  },
  cartSuucess: {
    bankno: '戶口號碼',
    bankAccount: '戶口名稱',
    bankAddress: '收款銀行地址',
    bankCode: '銀行代號',
    bankName: '收款銀行',
    companyAddress: '公司地址',
    swiftCode: 'SWIFT代号',
    submitcompleted: '提交完成',
    tipOne: '您的訂單已提交成功，您可在',
    tipTwo: '個人中心',
    tipThree: '我的訂單',
    tipFour: '中查詢歷史訂單記錄，',
    tipFive: '訂單已生成，請您到指定銀行卡打款,賬戶如下',
    tipseven: '如有其他疑問，可聯系在線客服',
    tipeight: '我的訂單',
  },
  order: {
    placeholderOlder: '請輸入議價單號',
    product: '商品',
    parameter: '屬性',
    unitprice: '單價',
    quantity: '數量',
    realpayment: '實付款',
    express: '快遞單號',
    transaction: '交易狀態',
    createdTime: '下單時間',
    orderNumber: '訂單編號',
    color: '顏色',
    receiving: '收貨地址',
    all: '全部',
    Pendingpayment: '待支付',
    Alreadypaid: '已支付',
    Alreadyshipped: '已發貨',
    completed: '已收貨',
    cancelled: '已取消',
    online: '如果訂單已經支付過，請立即聯系客服。',
    Numbering: '編號',
    transactionoperation: '交易操作',
    orderdetails: '訂單詳情',
    Confirmreceipt: '確認收貨',
    cancelorder: '取消訂單',
    ContactService: '聯系客服',
    noData: '暫無數據',
    Paymenttime: '付款時間',
    Current: '當前訂單狀態',
    nopay: '如果還抹符款訂單',
    back: '返回首頁',
    procurement: '採購中',
    logic: [{
        label: '採購中'
      }, {
        label: '貨物到達廣州倉'
      },
      {
        label: '貨物已從廣州倉發出'
      },
      {
        label: '貨物到達香港倉'
      },
      {
        label: '貨物已從香港倉發出'
      }
    ]
  },
  footer: {
    fd: [{
        label: '關於我們',
        path: 'aboutc'
      },
      {
        label: '聯系我們',
        path: 'contactUs'
      },
      {
        label: '購物流程',
        path: 'shopping'
      },
      {
        label: '常見問題',
        path: 'problem'
      },
      {
        label: '服務協議',
        path: 'cooperation'
      },
      {
        label: '友情鏈接',
        path: 'friendshipLink'
      },
      {
        label: '隱私政策',
        path: 'privacy'
      },
      {
        label: '開票信息',
        path: 'invoice'
      },
    ],
    about: '關於我們',
    contact: '聯系我們',
    process: '購物流程',
    problem: '常見問題',
    Service: '服務協議',
    Links: '友情鏈接',
    Policy: '隱私政策',
    Billing: '開票信息',
    zipCode: '郵政編碼',
    wechatNumber: '微信號碼',
    officePhone: '辦公電話',
    address: '聯系地址'
  },
  login: {
    welcome: '歡迎登錄',
    back: '返回首頁',
    Userlogin: '用戶登錄',
    placeholderUsername: '請輸入郵箱或用戶名',
    placeholderPassword: '請輸入密碼',
    LoginStatus: '保持登錄狀態',
    forget: '忘記密碼',
    login: '登錄',
    noAccount: '未有賬號？去注冊'
  },
  forget: {
    resetPassword: '重置密碼',
    email: '郵箱',
    emalcode: '發送郵箱驗證碼',
    code: '驗證碼',
    newPassword: '新密碼'
  },
  register: {
    detailOne: '注冊賬號',
    detailTwo: '郵箱認證成功後可作為平台賬號登錄',
    username: '用戶名：',
    password: '登錄密碼：',
    email: '郵箱：',
    emalcode: '發送郵箱驗證碼',
    code: '驗證碼：',
    companyName: '公司名稱：',
    companyPhone: '公司電話：',
    type: '用戶類型：',
    typeO: '找貨',
    typeT: '發布貨源',
    checked: '我同意《超攝商城網站服務條款》',
    myAccount: '創建我的賬號',
    validateCode: '郵箱驗證碼不能為空',
    validateCompanyPhone: '公司電話不能為空',
    validateCompanyName: '公司名稱不能為空',
    validateEmailo: '郵箱不能為空',
    validateEmailt: '郵箱格式不正確',
    validatePasswordreg: '密碼格式至少8-16個字符，至少1個大寫字母，1個小寫字母和1個數字，其他可以是任意字符',
    validatePassword: '密碼不能為空',
    validateUsername: '用戶名不能為空',
    protocol: '請在用戶協議上打勾'
  },
  basicSet: {
    Province: '国家：',
    placeholderProvince: '请输入国家',
    placeholderCity: '请输入城市',
    City: '城市：',
    sample: '示例',
    country: '国家',
    placeholderCountry: '请选择国家',
    Personalsettings: '個人設置',
    data: [{
      label: '資料設置',
      id: "1-1",
      children: [{
        label: '基本信息',
        id: '1-1'
      }]
    }, {
      label: '安全設置',
      id: "2-1",
      children: [{
        label: '修改密碼',
        id: '2-1'
      }]
    }, {
      label: '我的地址',
      id: "3-1",
      children: [{
        label: '我的收貨地址',
        id: '3-1'
      }]
    }, {
      label: '身份驗證',
      id: "4-1",
      children: [{
        label: '身份實名認證',
        id: '4-1'
      }]
    }],
    basicInfo: '基本信息',
    location: '所在地:',
    Detailedaddress: '詳細地址:',
    placeholderaddress: '請輸入詳細地址',
    telephone: '電話號碼:',
    placeholdertelephone: '請輸入電話號碼',
    email: '電子郵箱:',
    picHead: '頭像照片',
    save: '保存信息',
    provinces: '請完善省市區',
    uploadavatar: '請上傳頭像',
    upload: '上傳',
    delete: '刪除',
    changePassword: '修改密碼',
    password: '舊密碼：',
    newPassword: '新密碼：',
    comPassword: '再次確認密碼：',
    Confirmchange: '確認修改密碼',
    placeholderold: '請輸入舊密碼',
    placeholdernew: '請輸入新密碼',
    placeholdercom: '請再次確認密碼',
    validateoldPassword: '舊密碼不能為空',
    validatenewPassword: '新密碼不能為空',
    validatecomPassword: '確認密碼不能為空',
    Inconsistent: '兩次密碼輸入不一致',
    validatePasswordreg: '密碼格式至少8-16個字符，至少1個大寫字母，1個小寫字母和1個數字，其他可以是任意字符',
    Myaddress: '我的收貨地址',
    Addaddress: '新增收貨地址',
    edit: '編輯',
    back: '返回',
    Realname: '實名身份認證',
    actualname: '真實姓名:',
    placeholdername: '請輸入真實姓名',
    idcardNo: '身份證號:',
    placeholderidcardNo: '請輸入身份證號',
    idcardPic: '上傳证件照片',
    upIdcard: '請上傳身份證',
    placeholderidcardNoreg: '身份證號格式不正確',
    placeholderId: '请选择证件类型',
    DocumentType: '证件类型'
  },
  ...twLocale
}

export default tc;
