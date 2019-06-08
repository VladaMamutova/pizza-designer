// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  data: {
    message: 'Hello Vue.js!',
    title: 'Craft your own pizza!',
    pizzaImage: 'https://wallbox.ru/wallpapers/main/201632/82aa5d73f46ceda.jpg',
    width: 200,
    restaurantIsOpen: true,
    pizzaSizes: [35, 40],
    fullPrice: 0,
    pizzaIngridients: [
      {
        id: 1,
        name: 'Бекон',
        price: 50
      },
      {
        id: 2,
        name: 'Салями',
        price: 40
      },
      {
        id: 3,
        name: 'Помидоры',
        price: 30
      }
    ]
  },
  methods: {
    addToPizza: function (ingridient) {
      this.fullPrice += ingridient.price
    },
    deleteFromPizza (ingridient) {
      this.fullPrice -= ingridient.price
    }
  }
})
