<style scoped>
	.goods{
		width:100%;
		display:flex;
		position:absolute;
		top:176px;
		left:0;
		bottom:45px;
		overflow:hidden;
	}
	.goods_left{
		width:80px;
		background:#f3f5f7;
	}
	.current{background:#fff;}
	.goods_left li{
		margin:0 10px;
		padding:18px 0; /*高度54px*/
		border-bottom:1px solid #e4e4e4;
	}
	.goods_right{
		flex:1;
	}
	.gr_top{
		display:block;
		height:25px;
		line-height:25px;
		padding-left:15px;
		background:#f3f5f7;
		border-left:2px solid #ddd;
	}
	.gr_list{
		margin:10px 10px 0;
		display:flex;
		align-items:center;
		padding-bottom:10px;
		border-bottom:1px solid #eee;
	}
	.gr_ico{
		display:inline-block;
		margin:0 10px;
	}
	.gr_content{flex:1;}
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
	.aaa{background:#fff;}
	.aaa a{color:#333;}
	.goods_bottom{
		position:fixed;
		bottom:0;
		width:100%;
		height:45px;
		z-index:3;
		background:#141d27;
		display:flex;
		color:#fff6;
		line-height:45px;
	}
	.gb_left{
		flex:1;
		display:flex;
		padding-left:10px;
	}
	.goods_bottom>span{
		flex:0 0 100px;
		text-align:center;
		background:#2b343c;
	}
	.goods_bottom>span.green{
		background:#00b43c;
    color:#fff;
	}
	.shopico{
		width:52px;
		position:relative;
		top:-7px;
		background:#141d27;
		border-radius:50%;
	}
	.num{
		position:absolute;
		line-height:15px;
		padding: 1px 3px;
		text-align:center;
		border-radius:7.5px;
		right:0;
		color:#fff;
		background:#f00;
		font-weight:bold;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
	}
	.shopico span{
		display:flex;
		align-items:center;
		justify-content:center;
		width:40px;
		height:40px;
		background:#2b343c;
		margin:6px auto;
		border-radius:50%;
	}
	.shopico span.bbb{
		background:#18f;
	}
	.shopico i{
		font-size: 24px;
		color: #80858a;
	}
	.shopico i.bbb{
		color:#fff;
	}
	.sum{
		padding-right:10px;
		font-size:1.6rem;
		border-right:1px solid #2b343c;
	}
	.desc{
		padding-left:7px;
	}
	.payshow{
		background:#fff;
		position:fixed;
		width:100%;
		top:0;
		bottom:0;
		z-index:3;
	}
	.payshow input{
		width:50px;
		height:30px;
		background:#fff;
		border:1px solid #ccc;
	}
	.shops{
		position:absolute;
		left:0;
		right:0;
		bottom:0;
		z-index:2;
		background:#fff;
	}
	.gbsl_bg{
		position:fixed;
		width:100%;
		height:100%;
		left:0;
		top:0;
		background:rgba(7,17,27,.5);
		z-index:1;
		filter:blur(10px);
	}
	.shops p{
		font-size:1.4rem;
		line-height:39px;
		border-bottom:1px solid #eee;
		background: #f3f5f7;
		position:relative;
	}
	.shops p>b{
		position:absolute;
		right:15px;
		font-size:1.2rem;
		color:#18f;
	}
	.shoplist{
		max-height:160px;
		overflow:hidden;
	}
	.shops p,.shoplist ul{
		padding: 0 10px;
	}
	.shoplist li{
		line-height:40px;
		border-bottom:1px solid #eee;
		position:relative;
	}
	.sl_price{
		color:#f00;
		position:absolute;
		padding-right:10px;
		right:55px;
	}
	.sl_add{
		color:#18f;
		position:absolute;
		top:0;
		right:10px;
		display: flex;
    align-items: center;
	}
</style>
<template>
	<div class="goods">
		<div class="goods_left" ref="gl">
			<ul>
				<li class="gl_li" v-for="(item,i) in goods":key="i" :class="{aaa:current===i}" v-on:click="aaa(i,$event)">{{item.name}}</li>
			</ul>
		</div>
		<div class="goods_right" ref="gr">
			<ul>
        <li class="gr_li" v-for="(item,i) in goods" :key="i">
          <span class="gr_top">{{item.name}}</span>
          <ul>
            <li class="gr_list" v-for="(food,index) in item.foods" :key="index" @click="selectFood(food,$event)">
              <img :src="food.icon" width="57" height="57" class="gr_ico">
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
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
		</div>
		<div class="goods_bottom">
			<div class="gb_left" @click="togglelist">
				<label class="shopico">
					<sup class="num" v-show="totalCount > 0">{{totalCount}}</sup>
					<span :class="{'bbb':totalCount > 0}">
						<i class="icon-shopping_cart" :class="{'bbb':totalCount > 0}"></i>
					</span>
				</label>
				<label>
					<span class="sum">￥{{totalPrice}}元</span>
					<span class="desc">另需配送费￥{{seller.deliveryPrice}}</span>
				</label>
			</div>
			<span @click="pay" :class="{'green':this.totalPrice >= this.seller.minPrice}">{{payDesc}}</span>
		</div>
		<transition name="fold">
			<div class="shops" v-show="shoplist">
				<p>购物车<b @click="empty">清空</b></p>
				<div class="shoplist" ref="listContent">
					<ul>
					<li v-for="(food,index) in selectFoods" :key="index">
						<span class="gr_name">{{food.name}}</span>
						<span class="sl_price">{{food.price}}</span>
						<v-adddel class="sl_add" :fooditem="food"></v-adddel>
					</li>
				</ul>
				</div>
			</div>
		</transition>
		<span class="gbsl_bg" v-show="shoplist" @click="shoplisthide"></span>
		<div v-show="payShow" class="payshow">
			<ul>
				<li>商品价格{{totalPrice}}</li>
				<li>配送费{{seller.deliveryPrice}}</li>
				<li>总计{{sum}}</li>
			</ul>
			<input type="button" value="返回" @click="payhide"/>
			<input type="submit" value="支付" @click="payadd"/>
		</div>
	<v-goodsinfo :food="goodsdetail" ref="foodinfo"></v-goodsinfo> 
	<!-- 在 goods 组件中引用 goodsinfo 组件，并且传入food，设定变量为 goodsdetail -->
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import adddel from "../adddel.vue";
	import foodinfo from "../goodsinfo.vue"
	export default{
		components: { // 注册子组件
	    'v-adddel': adddel,
	    'v-goodsinfo': foodinfo
	  },
	  props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				active:0,
				payShow:false,
				fold:false,
				goods: [],
				scrollY: 0, 
				listHeight: [],// 存放每一个list的高度
				goodsdetail: {}//定义该变量为一个空对象
			}
		},
		created(){
			this.axios.get('/goods').then((res) => {
		  	this.goods = res.data.data;
		  	// console.log(this.goods);
		  	this.$nextTick(() => {
	        this._initScroll();
	        this._calculateHeight();
	      });
	    });
		},
		computed:{
			current(){// 当前list的index，对应menu-item的index
				for (let i = 0; i < this.listHeight.length; i++) {// 循环list的位置，
	        let currentHeight = this.listHeight[i];
	        let nextHeight = this.listHeight[i + 1];
	        if (!nextHeight || (this.scrollY >= currentHeight && this.scrollY < nextHeight)) {
	          // console.log(i);
	          return i;
	        }
	      }
	      return 0;
			},
			selectFoods() {// 选中foods
	      let foods = [];// 存放选中foods的数组
	      this.goods.forEach((item) => {
	        item.foods.forEach((food) => {// 找到所有选中foods
	          if (food.count) {
	            foods.push(food);
	          };
	        });
	      });
	      return foods;
	    },
	    totalPrice() { // 计算总价格
	      let total = 0;
	      this.selectFoods.forEach((item) => {
	        total += item.price * item.count;
	      });
	      return total;
	    },
	    totalCount() { // 计算总数量
	      let count = 0;
	      this.selectFoods.forEach((item) => {
	        count += item.count;
	      });
	      return count;
	    },
	    payDesc() { // 改变结算状态内容
	      if (this.totalPrice === 0) {
	        return `￥${this.seller.minPrice}元起送`;
	      } 
	      else if (this.totalPrice < this.seller.minPrice) {
	        let differPrice = this.seller.minPrice - this.totalPrice;
	        return `还差${differPrice}元起送`;
	      } 
	      else if (this.totalPrice >= this.seller.minPrice) {
	        return '去结算';
	      }
	    },
	    sum(){
	    	let payshow = this.totalPrice + this.seller.deliveryPrice;
	      return `￥${payshow}元`;
	    },
	    shoplist() { // 判断是否展开详情页
	      if (!this.totalCount) {
	        this.fold = true;// 折叠状态
	        return false;
	      };
	      let show = !this.fold;
	      if (show) {
	        this.$nextTick(() => {
	          if (!this.scroll) { // 页面滚动
	            this.scroll = new BScroll(this.$refs.listContent, {
	              click: true
	            });
	          } else {
	            this.scroll.refresh();// 刷新
	          }
	        });
	      }
	      return show;
	    }
		},
		methods:{	
			_initScroll() {// 页面滑动
				this.menuScroll = new BScroll(this.$refs.gl, {
	        click: true // better-scroll会阻止默认事件，自己派生点击事件,所以pc端会执行两次，包括原生点击触发
	      })
	      this.foodScroll = new BScroll(this.$refs.gr, {
	        click: true,
	        probeType: 3// 实时监测滚动位置
	      })
	      this.foodScroll.on("scroll", (pos) => {
	        this.scrollY = Math.abs(Math.round(pos.y));// 将位置四舍五入后取绝对值
	        // console.log(this.scrollY);
	      })
			},
			_calculateHeight() {//滚动右侧foodScroll，影响左侧menu
	      //获取list
	      let list = this.$refs.gr.getElementsByClassName("gr_li");
	      let height = 0;
	      this.listHeight.push(height);
	      for (let i = 0; i < list.length; i++) {
	        let item = list[i];
	        height += item.clientHeight;
	        this.listHeight.push(height);// list的距离父级顶部的高度存放到数组里，相当于是position.top值
	      }
	        // console.log(this.listHeight);
	    },
			aaa: function(i,event){//点击左侧menu，影响右侧foods，event就是事件对象
				// console.log(index);
				this.active=i;
				let list = this.$refs.gr.getElementsByClassName("gr_li");
	      let foodli = list[i];// 点击menu后，对应的foodlist[index]
	      this.foodScroll.scrollToElement(foodli, 300);// 300ms滚动到对应的foodlist位置
			},
			pay:function() { // 结算
	      if (this.totalPrice === 0) {
	        return;
	      };
	      this.payShow = true;
	      // 此处应该跳转支付方式
	    },
	    payadd:function(){
	    	this.selectFoods.forEach((food) => {
	        food.count = 0;
	      });
	      this.payhide();
	    },
	    payhide:function(){
	    	this.payShow=false;
	    },
	    togglelist:function(){
	      if (!this.totalCount) {
	      	return;// 表示购物车没有商品
	      } 
	      this.fold = !this.fold;
	    },
	    empty:function(){
	    	this.selectFoods.forEach((food) => {
	        food.count = 0;
	      });
	    },
	    shoplisthide:function(){
	    	this.fold = true;
	    },
	    selectFood(food, event) {
	      this.goodsdetail = food;
	      this.$refs.foodinfo.initShow();// 获取foodinfo组件的show方法
	    }
		}
	}
</script>