import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailsView from '../views/event/Details.vue'
import EventRegisterView from '../views/event/Register.vue'
import EventEditView from '../views/event/Edit.vue'
import EventLayout from '../views/event/Layout.vue'
import NotFoundView from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
      alias: '/about',
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true,
    },  
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      component: EventLayout,
      props: true,
      beforeEnter: (to) => 
        {
          return EventService.getEvent(to.params.id)
            .then(response => {
              GStore.event = response.data
            })
            .catch(error => {
              if (error.response && error.response.status == 404) {
                return {
                  name: '404Resource',
                  params: { resource: 'event' }
                }
              } else {
                return { name: 'NetworkError' }
              }
            })
        },
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetailsView,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
        }
      ]
    },
    {
      path: '/event/:id',
      redirect: () => {
        return { name: 'event-details'}
      },
    },

  ],
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})



export default router
