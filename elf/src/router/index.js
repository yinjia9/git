import Vue from 'vue';
import Router from 'vue-router';

import head from './../ele/head.vue'
import goods from './../ele/child/goods.vue'
import comment from './../ele/child/comment.vue'
import seller from './../ele/child/seller.vue'

Vue.use(Router);

let router = new Router({
	linkActiveClass:'lac',
	linkExactActiveClass:'leac',
	routes: [
		{path:'/',component:head,redirect:'/1',
			children:[
				{path:'/1',component:goods},
				{path:'/2',component:comment},
				{path:'/3',component:seller}
			]
		}
	]
});
export default router;