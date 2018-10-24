<style scoped>
	i{font-size:2rem;}
</style>
<template>
	<label>
		<i class="icon-remove_circle_outline" v-show="fooditem.count>0" @click.stop.prevent="removefood($event)"></i>
			<span v-show="fooditem.count>0">{{fooditem.count}}</span>
		<i class="icon-add_circle" @click.stop.prevent="addfood($event)"></i>
    <!--stop的使用：阻止事件冒泡的发生-->
    <!--prevent的使用：阻止默认事件的发生-->
	</label>
</template>
<script>
import Vue from 'vue';
export default {
  props: {
    fooditem: {
      type: Object
    }
  },
  methods: {
    removefood(event){// 减少数量
      if (this.fooditem.count) {
        this.fooditem.count--;
      }
    },
    addfood(event) {// 增加数量
      if (!this.fooditem.count) {
        Vue.set(this.fooditem,"count",1)//创建count属性
      } else {
        this.fooditem.count++;
      }
      // console.log(this.$root.eventHub);// 定义的新的公共实例eventHub，归按钮组件和购物车组件公用，传输数据
      this.$root.eventHub.$emit('add', event.target); // 传输点击的目标元素
    }
  }
}	
</script> 