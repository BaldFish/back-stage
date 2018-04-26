import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import login from '@/components/login/login';
import management from '@/components/management/management';
import categoryList from '@/components/article/categoryList';
import articleList from '@/components/article/articleList';
import addArticle from '@/components/article/addArticle';
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      children: [
        {
          path: '',
          name: 'addArticle',
          component: addArticle
        },
        {
          path: 'addArticle',
          name: 'addArticle',
          component: addArticle
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          component: categoryList
        },
        {
          path: 'articleList',
          name: 'articleList',
          component: articleList
        },
      ]
    },
  ]
})
