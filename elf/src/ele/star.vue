<style>
.star{
  display: inline-block;
}
.star_48{
  width:24px;
  height:24px;
  margin:15px 5px 0;
}
.star_36{
  width:15px;
  height:15px;
  margin-right:3px;
}
.star_24{
  width:12px;
  height:12px;
  margin-right:1.5px;
}
.star_24.on,.star_36.on,.star_48.on{background:url(../assets/img/star_on.png);background-size:100% 100%;}
.star_24.half,.star_36.half,.star_48.half{background:url(../assets/img/star_half.png);background-size:100% 100%;}
.star_24.off,.star_36.off,.star_48.off{background:url(../assets/img/star_off.png);background-size:100% 100%;}
</style>
<template>
	<span>
		<i class="star" :class="[aitem,item]" v-for="item in staritems" :key="item.index"></i>
	</span>
</template>
<script>
const LENGTH = 5;// 表示5颗星
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  name: 'Star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    aitem() {
      return 'star_' + this.size;
    },
    staritems() {
      let result = [];// 存放星星数组
      // 0.5表示半颗星，计算分数是0.5的几倍，再乘2，就是几颗星
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;// 判断是否有小数，即判断是不是有半颗星
      let integer = Math.floor(score);// 整数部分，完整的星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);// 数组中放入整颗星
      }
      if (hasDecimal) {
        result.push(CLS_HALF);// 数组中放入半颗星，且半颗星只出现一次
      }
      // 剩余补齐
      while (result.length < LENGTH) {
        result.push(CLS_OFF);// 放入灰色星
      }
      return result;
    }
  }
};
</script>