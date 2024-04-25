import { createWebHistory, createRouter } from 'vue-router'

import MainLayouts from '../layouts/MainLayouts.vue'

const routes: any = [
  {
    path: '',
    name: 'index',
    component: () => import('../modules/home/Index.vue'),
    meta: {
      layout: MainLayouts
    }
  },
  {
    path: '/org-charts',
    name: 'org-charts',
    component: () => import('../modules/org-charts/Index.vue'),
    meta: {
      layout: MainLayouts
    }
  }
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, _from, savedPosition) {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth'
			}
		}

		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

export default router
