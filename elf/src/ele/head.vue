<style scoped>
#header{
	background:rgba(7,17,27,.5);
	overflow:hidden;
	position:relative;
	color:#fff;
}
.h_pic{
	vertical-align:top;
	display:inline-block;
}
.content{
	display:inline-block;
	padding-left:10px;
}
.content h2{
	font-size:1.6rem;
	margin-bottom:5px;
}
.brand{
	background:url(../assets/img/brand.png);
	width:30px;
	height:18px;
	margin-right:4px;
}
.reduce{
	background:url(../assets/img/ico_1.png);
	width:12px;
	height:12px;
	background-size:12px 12px;
	/*margin-right:4px;*/
}
.content p{
	margin-top:5px;
}
.count{
	position:absolute;
	right:20px;
	background:rgba(0,0,0,.2);
	padding:2px 5px 2px 10px;
	border-radius:10px;
}
.h_bg{
	position:absolute;
	width:100%;
	height:100%;
	left:0;
	top:0;
	z-index:-1;
	filter:blur(10px);
}
.h_txt{
	width:100%;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	height:30px;
	line-height:30px;
	background:rgba(0,0,0,.2);
	padding:0 20px;
	box-sizing:border-box;
	position:relative;
}
.bulletin{
	background:url(../assets/img/bulletin.png);
	width:22px;
	height:12px;
	margin-right:5px;
}
.h_txt b{
	position:absolute;
	right:7px;
	top:10px;
}
i{
	display:inline-block;
	vertical-align:middle;
}
.detail{
	position:fixed;
	text-align:center;
	top:0;
	bottom:0;
	overflow: auto;
	background:rgba(7,17,27,.8);
	padding:64px 30px 0;
	z-index:4;
}
.detail_list,.bulletin_ms{
	text-align:left;
}
.detail_list,.bulletin_ms,.detail_top b{
	padding:0 12px;
}
.bulletin_ms{
	text-indent:2em;
	padding-bottom:96px;
}
.detail_top{
	display:flex;
	align-items:center;
	margin:10px 0;
}
.detail_top u{/*线条*/
	height:1px;
	flex:1;
	background:#fff3;
}
.detail_top b{
	font-size:1.4rem;
}
.detail_list li{
	margin-bottom:12px;
	height:20px;
	line-height:20px;
}
.icon-close{
	font-size:3.2rem;
	margin-top:-64px;
	display: block; /*块级*/
}
.icon{
  width:16px;
  height:16px;
  margin-right:10px;
}
.decrease{background:url(../assets/img/ico_1.png);}
.discount{background:url(../assets/img/ico_2.png);}
.invoice{background:url(../assets/img/ico_3.png);}
.special{background:url(../assets/img/ico_4.png);}
.guarantee{background:url(../assets/img/ico_5.png);}
.tab{
	display:flex;
	height:40px;
	border-bottom:1px solid #eee;
}
.tab a{
	flex:1;
	text-align:center;
	font-size:1.4rem;
	line-height:40px;
	color:#333;
}
a.lac{color: #f01414;}
</style>
<template>
	<div>
		<header id="header">
			<div style="padding:20px;">
				<img class="h_pic" :src="seller.avatar" with="65" height="65">
				<div class="content">
					<h2>
						<i class="brand"></i>
						{{seller.name}}
					</h2>
					<p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
					<p v-if="seller.supports">
						<i class="reduce"></i>
						{{seller.supports[0].description}}
						<span class="count"@click="showDetail">
							{{seller.supports.length}}个
							<b class="icon-keyboard_arrow_right"></b>
						</span>
					</p>
					<span class="h_bg">
						<img :src="seller.avatar"width="100%"height="100%">
					</span>
				</div>
			</div>
			<p class="h_txt">
				<i class="bulletin"></i>
				<span @click="showDetail">{{seller.bulletin}}</span>
				<b class="icon-keyboard_arrow_right"></b>
			</p>
			<div class="detail" v-if="Show">
      	<div style="min-height:100%;display:inline-block;">
      		<h2>{{seller.name}}</h2>
			      <v-star :size="48" :score="seller.score"></v-star>
			      <p class="detail_top"><u></u><b>优惠信息</b><u></u></p>
			      <ul class="detail_list" v-if="seller.supports">
			        <li v-for="(supportItem,index) in seller.supports" :key="index">
			          <i class="icon" :class="map[supportItem.type]"></i>
			          <span class="text">{{supportItem.description}}</span>
			        </li>
			      </ul>
			      <p class="detail_top"><u></u><b>商家公告</b><u></u></p>
			      <p class="bulletin_ms">{{seller.bulletin}}</p>
      	</div>
    		<i class="icon-close" @click="closeDetail"></i>
	  	</div>
		</header>
		<p class="tab">
			<router-link to="/1">商品</router-link>
			<router-link to="/2">评论</router-link>
			<router-link to="/3">商家</router-link>
		</p>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>
<script>
function urlParse() {
  let urlArr = window.location.search.substr(1).split('&'); // 截取掉?,并以&分开，存入数组
  let obj = {};// console.log(urlArr); // ["id=1234", "name=zpxf"]
  if (urlArr) {
    urlArr.forEach((item) => {
      let arr = item.split('='); // 每一项用=分开存入数组,arr[0]=key,arr[1]=value
      // console.log(arr); // [id,1234] [name,zpxf]
      let key = decodeURIComponent(arr[0]); // 对url解码
      let val = decodeURIComponent(arr[1]);
      obj[key] = val;
    });
  }
  return obj;// console.log(obj); // {id: "1234", name: "zpxf"}
};
import star from './star.vue';
export default {
	components: { // 注册子组件
    'v-star': star
  },
  data() {
    return {
    	Show:false, 
    	seller: {
        id: (() => {
          let queryParam = urlParse();// 后端数据的url地址
          // console.log(queryParam);
          return queryParam.id;
        })()
      }
    };
  },
  
  created() {
  	this.map = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.axios.get('/seller').then((res) => {
    	// console.log(res);
	    this.seller = res.data.data; // 对象合并
	    // return this.seller;
	    // console.log(this.seller);
    });
  },
  methods: {
    showDetail(){
    	this.Show = true;
    },
    closeDetail(){
    	this.Show = false;
    }
  }
}
</script>