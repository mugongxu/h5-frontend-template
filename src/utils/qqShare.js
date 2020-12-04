/**
 * 通用的微信分享页面
 */
const qqShare = (shareTitle, shareLink, shareImgUrl, shareDesc, wxshareparamsUrl) => {
  // 加载配置信息
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = script.onreadystatechange = () => {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      window.wx.ready(() => {
        // 朋友圈
        window.wx.onMenuShareTimeline({
          title: shareTitle,
          link: shareLink,
          imgUrl: shareImgUrl,
          trigger: (res) => {
            // 触发操作
          },
          success: (res) => {
            // 成功操作
          },
          cancel: (res) => {
            // 取消操作
          },
          fail: (res) => {
            // 失败操作
          }
        });
        // 朋友
        window.wx.onMenuShareAppMessage({
          title: shareTitle,
          desc: shareDesc,
          link: shareLink,
          imgUrl: shareImgUrl,
          type: 'link',
          dataUrl: '',
          trigger: (res) => {
            // 触发操作
          },
          success: (res) => {
            // 成功操作
          },
          cancel: (res) => {
            // 取消操作
          },
          fail: (res) => {
            // 失败操作
          }
        });
        // QQ
        window.wx.onMenuShareQQ({
          title: shareTitle,
          desc: shareDesc,
          link: shareLink,
          imgUrl: shareImgUrl,
          trigger: (res) => {
            // 触发操作
          },
          success: (res) => {
            // 成功操作
          },
          cancel: (res) => {
            // 取消操作
          },
          fail: (res) => {
            // 失败操作
          }
        });
      });
      window.wx.error(res => {
        console.log(res);
      });
      // 获取公司地址
      window.openCompanyLocation = () => {
        window.wx.openLocation({
          latitude: 39.8912800000, // 纬度，浮点数，范围为90 ~ -90
          longitude: 116.4679000000, // 经度，浮点数，范围为180 ~ -180。
          name: '北京金斧子水星保险代理有限责任公司', // 位置名
          address: '北京市朝阳区广渠路66号院百环大厦1101', // 地址详情说明
          scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      };
      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null;
    }
  };
  script.src = wxshareparamsUrl;
  // 加载数据
  head.appendChild(script);
};

export default qqShare;
