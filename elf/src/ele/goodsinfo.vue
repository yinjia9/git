<style scoped>
	.info{
		width:100%;
		background:#fff;
		position:fixed;
		top:0;
		bottom:45px;
	}
	.icon-arrow_lift{
		color:#fff;
		text-shadow:0 0 5px #000;
		font-size:2rem;
		position:absolute;
		top:20px;
		left:10px;
		z-index:1;
	}
	.info_pic{
		display:block;
		position:relative;
		width:100%;
		padding-top:100%;
	}
	.info_pic img{
		position:absolute;
		top:0;
	}
	.gr_content{padding:15px;}
	.gr_name{font-size:1.4rem;}
	.gr_extra{color:#999;}
	.gr_extra label{display:block;}
	.gr_price{
		color:#f01414;
		position: relative;
		font-size:1.4rem;
	}
	.gr_price label{
		color:#18f;
		position:absolute;
		display:flex;
		top:0;
		right:10px;
	}
	.infoshop{
		position:absolute;
		top:0;
		right:0;
		z-index:1;
		background:#18f;
		color:#fff;
		padding:2px 10px;
		border-radius:10px;
		font-size:1.2rem;
	}
	.info hr{
		height:16px;
		background:#f3f5f7;
		border:1px solid #07111b1a;
		border-left:0;
		border-right:0;
	}
	.ritem{padding:10px;position:relative;border-bottom:1px solid #eee;}
	.ritem img{border-radius:50%;margin-left:5px;}
	.user{position:absolute;right:10px;}
	.icon-thumb_up{color:#18f;}
	.icon-thumb_down{color:#aaa}
	.rtype{padding:10px;border-bottom:1px solid #eee;}
	.rtype span{display:inline-block;width:60px;height:30px;text-align:center;line-height:30px;margin:0 0 10px 10px;border:1px solid #f2f2f2;}
	.blue{background:#8cf;}
	.blue.arte{background:#18f;color:#fff;}
	.gray{background:#ddd;}
	.gray.arte{background:#555;color:#fff}
	.rtype label{display:flex;padding:10px 10px 0;align-items:center;border-top:1px solid #eee;}
	.icon-check_circle{font-size:2rem;color:#999;}
	.icca{color:#0c5;}
	.ritem-r{flex:1;}
	.datetime{position:absolute;right:10px;}
</style>
<template>
	<div class="info" v-show="infoshow" ref="foodInfo">
		<div>
			<i class="icon-arrow_lift" @click="hide"></i>
			<label class="info_pic">
				<img :src="food.image" width="100%" height="100%">
			</label>
			<div class="gr_content">
	      <p class="gr_name">{{food.name}}</p>
	      <p class="gr_extra">
	    		<label>{{food.description}}</label>
	        <span>月售{{food.sellCount}}份</span>
	        <span>好评率{{food.rating ? food.rating : 0}}%</span>
	      </p>
	      <div class="gr_price">
	      	￥{{food.price}}
	      	<v-adddel :fooditem="food"></v-adddel>
	      	<p class="infoshop" @click="add($event)" v-show="!food.count || food.count===0">加入购物车</p>
	      </div>
	    </div>
	    <hr>
	    <div class="gr_content" v-if="food.info">
	    	<h3>商品信息</h3>
	    	<p>{{food.info}}</p>
	    </div>
	    <hr v-if="food.info">
	    <div class="gr_content">
	    	<h3>商品评价</h3>
	    	<p class="rtype" v-if="food.ratings!=null"><!--数据没有时，隐藏不渲染-->
					<span @click="select(2)" class="blue" :class="{'arte':slctype===2}">全部{{food.ratings.length}}</span>
					<span @click="select(0)" class="blue" :class="{'arte':slctype===0}">推荐{{positives.length}}</span>
					<span @click="select(1)" class="gray" :class="{'arte':slctype===1}">吐槽{{negatives.length}}</span>
					<label @click="toggleico"><i class="icon-check_circle" :class="{'icca':ico}"></i>只看有内容的评价</label>
				</p>
	    	<ul>
	    		<li class="ritem" v-for="(ritem,index) in food.ratings" :key="index" v-if="List(ritem.rateType,ritem.text)">
	    			{{ritem.rateTime|formatDate('yyyy-MM-dd hh:mm')}}
	    			<span class="user">{{ritem.username}}<img :src="ritem.avatar" width="12" height="12"></span><br>
	    			<i :class="{'icon-thumb_up':ritem.rateType===0,'icon-thumb_down':ritem.rateType===1}"></i>
	    			{{ritem.text}}
	    			</label>
	    		</li>
	    	</ul>
	    </div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import adddel from "./adddel.vue";
	import Vue from 'vue';
	export default{
		components: { // 注册子组件
	    'v-adddel': adddel,
	  },
		props: {
	    food: {
	      type: Object
	    }
	  },
		data(){
			return{
				infoshow:false,
				ico: true,//只显示有内容的评价
				slctype:2,//显示全部条数
			}
		},
		computed:{
	    positives() {
	      return this.food.ratings.filter((item) => {
	        return item.rateType === 0;
	      });
	    },
	    negatives() {
	      return this.food.ratings.filter((item) => {
	        return item.rateType === 1;
	      });
	    }
	  },
		methods:{
			initShow() {
	      this.infoshow = true;
	      this.$nextTick(() => {
	        if (!this.scroll) {
	          this.scroll = new BScroll(this.$refs.foodInfo, {
	            click: true
	          });
	        } else {
	          this.scroll.refresh();
	        }
	      });
	    },
	    hide() {
	      this.infoshow = false;
	    },
	    add(event) { // 添加商品到购物车
	      Vue.set(this.food, 'count', 1);
	      this.$root.eventHub.$emit('cart.add', event.target); // 传输点击的目标元素
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