<style scoped>
	.seller{position: fixed;top: 177px;left: 0;right: 0;bottom: 0;overflow: hidden;}
	.content{position:relative;padding:20px;}
	.content p{display:flex;align-items:center;padding-top:5px;}
	.vstar{display:flex;align-items:center;}
	.heart{position:absolute;right:20px;top:20px;text-align:right;}
	.icon-favorite{font-size:2.5rem;color:#ddd;}
	.red{color:#f11;}
	i{display:inline-block;vertical-align:middle;}
	.icon{width:16px;height:16px;margin:0 3px;}
	.decrease{background:url(../../assets/img/ico2.png);}
	.discount{background:url(../../assets/img/ico1.png);}
	.invoice{background:url(../../assets/img/ico-1.png);}
	.special{background:url(../../assets/img/ico3.png);}
	.guarantee{background:url(../../assets/img/ico-2.png);}
	.ship{display:flex;border-top:1px solid #eee;padding:15px;}
	.ship li{flex:1;text-align:center;}
	.ship p{color:#666;}
	.ship span{font-size:2.5rem;}
	.ship_bor{border-left:1px solid #eee;border-right:1px solid #eee;}
	hr{height:16px;background:#f3f5f7;border:1px solid #07111b1a;border-left:0;border-right:0;}
	.notice,.view,.msg{padding:20px;}
	.notice h3,.view h3,.msg h3{font-weight:bold;}
	.notice p{padding:10px 10px 0;color:#f11}
	.notice ul,.msg ul{padding:10px 10px 0;}
	.notice li,.msg li{border-top:1px solid #eee;padding:10px 0;}
	.abeam{overflow:hidden;padding-top:10px;}
	.view ul{display:flex;}
	.view li{margin-right:7px;}
	.view img{display:block;}
</style>
<template>
	<div class="seller" ref="seller">
		<div>
			<div class="content">
				<h2>{{seller.name}}</h2>
				<p>
					<v-star class="vstar" :size="36" :score="seller.score"></v-star>&nbsp;&nbsp;({{seller.ratingCount}})&nbsp;&nbsp;&nbsp;&nbsp;月售{{seller.sellCount}}单
				</p>
				<span class="heart"><i @click="toggleico" class="icon-favorite" :class="{'red':ico}"></i><br>{{this.ico?'已收藏':'收藏'}}</span>
			</div>
			<ul class="ship">
				<li><p>起送价</p><span>{{seller.minPrice}}</span>元</li>
				<li class="ship_bor"><p>商家配送</p><span>{{seller.deliveryPrice}}</span>元</li>
				<li><p>平均配送时间</p><span>{{seller.deliveryTime}}</span>分钟</li>
			</ul>
			<hr>
			<div class="notice">
				<h3>公告与活动</h3>
				<p>{{seller.bulletin}}</p>
				<ul>
					<li v-for="support in seller.supports" :key="support.id">
						<i class="icon" :class="map[support.type]"></i>{{support.description}}
					</li>
				</ul>
			</div>
			<hr>
			<div class="view">
				<h3>商家实景</h3>
				<div class="abeam" ref="picsWrapper">
					<ul ref="piclist">
				  	<li v-for="tu in seller.pics" :key="tu.id"><img :src="tu" width="128" height="100"></li>
			  	</ul>
				</div>
			</div>
			<hr>
			<div class="msg">
				<h3>商家信息</h3>
				<ul>
					<li v-for="info in seller.infos" :key="info.id">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import star from './../star.vue';
	export default{
		components: { // 注册子组件
	    'v-star': star
	  },
		props:{
			seller:Object,
		},
		data(){
			return{
				ico:false,
			}
		},
		created() {
	  	this.map = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	  },
		watch: {
	    'seller'() { // 监控props里面的seller数据变化
	      this.$nextTick(() => {
	        // console.log(this.seller);
	        this._initScroll();
	        this._initPicScroll();
	      })
	    }
	  },
	  mounted() { // DOM已经准备好,只会执行一次，此页面刷新后，就没有this.seller了
	    this.$nextTick(() => {
	      // console.log(this.seller);
	      this._initScroll();
	      this._initPicScroll();
	    })
	  },
	  methods: {
	    _initScroll() {
	      if (!this.scroll) {
	        this.scroll = new BScroll(this.$refs.seller, {
	          click: true
	        })
	      } else {
	        this.scroll.refresh();
	      }
	    },
	    _initPicScroll() {
	      if (this.seller.pics) {
	        let picW = 120;
	        let margin = 6;
	        let w = (picW + margin) * this.seller.pics.length - margin;
	        this.$refs.piclist.style.width = w + "px";
	        this.$nextTick(() => {
	          if (!this.picScroll) {
	            this.picScroll = new BScroll(this.$refs.picsWrapper, {
	              scrollX: true,
	              eventPassthrough: 'vertical',// 滚动方向横向
	              click: true
	            })
	          } else {
	            this.pics.refresh();
	          }
	        })
	      }
	    },
	    toggleico() {
	      this.ico = !this.ico;
	    },
		}
	}
</script>