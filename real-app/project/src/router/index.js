import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailsView from '../views/event/Details.vue'
import EventRegisterView from '../views/event/Register.vue'
import EventEditView from '../views/event/Edit.vue'
import EventLayout from '../views/event/Layout.vue'
import NotFoundView from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'


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

export default router
