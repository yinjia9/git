<style scoped>
	.ratings{position:fixed;top:177px;left:0;right:0;bottom:0;overflow:hidden;}
	.pingf{padding:15px;display:flex;
	}
	.pingf-l{width:42%;text-align:center;border-right:1px solid #eee;}
	.pingf-r{padding-left:10px;}
	.pingf-r p{height:33px;display:flex;align-items: center;}
	.vstar{display:flex;align-items:center;}
	hr{height:16px;background:#f3f5f7;border:1px solid #07111b1a;border-left:0;border-right:0;}
	.rtype{padding:10px;border-bottom:1px solid #eee;}
	.rtype span{display:inline-block;width:60px;height:30px;text-align:center;line-height:30px;margin:0 0 10px 10px;border:1px solid #eee;}
	.blue{background:#8cf;}
	.blue.arte{background:#18f;color:#fff;}
	.gray{background:#ddd;}
	.gray.arte{background:#555;color:#fff}
	.rtype label{display:flex;padding:10px 10px 0;align-items:center;border-top:1px solid #eee;}
	.icon-check_circle{font-size:2rem;color:#999;}
	.icca{color:#0c5;}
	.ritem{padding:10px;display:flex;}
	.ritem img{border-radius:50%;display:block;margin:0 10px;}
	.icon-thumb_up{color:#18f;}
	.icon-thumb_down{color:#aaa}
	.ritem-r{flex:1;}
	.user{position:relative;}
	.datetime{position:absolute;right:10px;}
	.cookbook{margin:0 5px 5px 0;width:60px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap;text-align:center;padding:1px 3px;border:1px solid #eee;display:inline-block;}
</style>
<template>
	<div class="ratings" ref="ratings">
		<div>
			<div class="pingf">
				<div class="pingf-l">
					<h1 style="color:#f90;">{{seller.foodScore}}</h1>
					<h4>综合评分</h4>
					<p>高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="pingf-r">
					<p>服务态度 <v-star class="vstar" :size="36" :score="seller.score"></v-star><span style="color:#f90;">{{seller.score}}</span></p>
					<p>到达时间 {{seller.deliveryTime}}分钟</p>
				</div>
			</div>
			<hr>
			<p class="rtype">
				<span @click="select(2)" class="blue" :class="{'arte':slctype===2}">全部{{ratings.length}}</span>
				<span @click="select(0)" class="blue" :class="{'arte':slctype===0}">推荐{{positives.length}}</span>
				<span @click="select(1)" class="gray" :class="{'arte':slctype===1}">吐槽{{negatives.length}}</span>
				<label @click="toggleico"><i class="icon-check_circle" :class="{'icca':ico}"></i>只看有内容的评价</label>
			</p>
			<ul>
				<li class="ritem" v-for="(ritem,i) in ratings" :key="i" v-if="List(ritem.rateType,ritem.text)">
					<img :src="ritem.avatar" width="28" height="28">
					<div class="ritem-r">
						<p class="user">{{ritem.username}}<span class="datetime">{{ritem.rateTime|formatDate('yyyy-MM-dd hh:mm')}}</span></p>
						<p><v-star :size="24" :score="seller.score"></v-star>
						<span v-if="ritem.deliveryTime">{{ritem.deliveryTime}}分钟送达</span></p>
						<p v-if="ritem.text">{{ritem.text}}</p>
						<i :class="{'icon-thumb_up':ritem.rateType===0,'icon-thumb_down':ritem.rateType===1}"></i>
						<span class="cookbook" v-for="recomnd in ritem.recommend" :key="recomnd.id" v-if="ritem.recommend">{{recomnd}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import star from '../star.vue';
	export default{
		components: { // 注册子组件
		  'v-star': star
	  },
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				ratings: [],
				ico: true,
				slctype:2,//评论type按钮的样式，使用常量切换
			}
		},
		created() { // 请求后端数据
			this.axios.get('/ratings').then((res) => {
		    this.ratings = res.data.data; // 对象合并
		    // console.log(this.ratings);
		    this.$nextTick(() => {
          this._initScroll();
        });
	    });
    },
    computed: {
	    positives() {
	      return this.ratings.filter((item) =>item.rateType === 0);
	    },
	    negatives() {
	      return this.ratings.filter((item) => item.rateType === 1);
	    }
	  },
		methods:{
			_initScroll() { // 初始化
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      },
      select(type){
      	this.slctype = type;
      },
      toggleico() {
	      this.ico = !this.ico;
	    },
	    List(type, text) {
        if(this.ico&&!text){return false;}//有内容
        if(this.slctype===2){return true;}//所有 
        else{return this.slctype===type;}
      }
		}
	} 
</script>