import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import AddRasp from '@/components/AddRasp'
import DeleteRasp from '@/components/DeleteRasp'
import UpdateRasp from '@/components/UpdateRasp'
import RaspInfo from '@/components/RaspInfo'
import UploadVideo from '@/components/UploadVideo'
import UpdateWebServer from '@/components/UpdateWebServer'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/rasps/add',
    name: 'AddRasp',
    component: AddRasp
  }, {
    path: '/rasps/delete',
    name: 'DeleteRasp',
    component: DeleteRasp
  }, {
    path: '/rasps/update',
    name: 'UpdateRasp',
    component: UpdateRasp
  }, {
    path: '/rasps/:id',
    name: 'RaspInfo',
    component: RaspInfo,
    props: true
  }, {
    path: '/upload/video',
    name: 'UploadVideo',
    component: UploadVideo
  }, {
    path: '/update',
    name: 'UpdateWebServer',
    component: UpdateWebServer
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }]
})
