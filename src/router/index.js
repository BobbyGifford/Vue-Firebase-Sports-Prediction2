import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PredictionList from '@/components/predictions/FullList'
import PredictionItem from '@/components/predictions/PredItem'
import AddPrediction from '@/components/predictions/AddPred'
import SignIn from '@/components/user/SignIn'
import SignUp from '@/components/user/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/predictionItem/:id',
      props: true,
      name: 'PredictionItem',
      component: PredictionItem
    },
    {
      path: '/predictionList',
      name: 'PredictionList',
      component: PredictionList
    },
    {
      path: '/addPrediction',
      name: 'AddPrediction',
      component: AddPrediction
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
