Component({
  properties: {
    sortVisible: {
      type: Boolean,
      value:false,
    }

  },
  data: {
    // 这里是一些组件内部数据
    loading: false,
    searchStr:'',
    searchStatus:false,
    searchResList:[],
    sortActionItems:['按名称降序','按大小降序','按时间降序']
  },
  methods: {
    goSearch(){
      this.setData({searchStatus:true})
    },
    cancelSearch(){
      this.setData({searchStatus:false})
      this.setData({searchResList:[]})
      this.setData({searchStr:''})
      wx.hideLoading()
    },
    search_bindKeyInput(){
      if(this.data.searchStr){
        this.setData({loading:true})
        wx.showLoading({
          title: '加载中',
        })
        this.debounce(this.searchFileFunc.bind(this),300)()
      }
      else{
        this.setData({loading:false})
        this.setData({searchResList:[]})
      }
    },
    searchFileFunc(){
      console.log(222222222,this)
      setTimeout(() => {
        let files = [{name:'123'}]
        // this.setData({searchResList:[{title:'共享',files:files},{title:'个人',files:files}]})
        this.setData({searchResList:[]})
        this.setData({loading:false})
        wx.hideLoading()
      }, 500);
  },
   // 防抖
   debounce(fn, wait) {    
        let self=this 
        return function() {        
            if(self.timerId !== null) clearTimeout(self.timerId);        
            self.timerId = setTimeout(fn, wait);    
        }
    },
    goInfo(event){
      let item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: '/pages/spaceInfo/index?id='+item.id
      })
    },
    showSortAction(){
      let self = this
      wx.showActionSheet({
        itemList: self.data.sortActionItems,
        success (res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          if(res.tapIndex==0){
           self.setData({sortActionItems:['↓ 按名称降序','按大小降序','按时间降序']})
          }
          if(res.tapIndex==1){
            self.setData({sortActionItems:['按名称降序','↓ 按大小降序','按时间降序']})
           }
          if(res.tapIndex==2){
            self.setData({sortActionItems:['按名称降序','按大小降序','↓ 按时间降序']})
          }
        },
        fail (res) {
          console.log(res.errMsg)
        },
        complete(){

        }
      })
    }
  }
})