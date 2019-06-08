<template>
  <div id="app">
    <h1>Pizza-Designer</h1>
    <p>{{ message }}</p>
    <p v-if="restaurantIsOpen">{{ title }}</p>
    <img :src="pizzaImage" :height="width">
    <p>Размеры пиццы:
      <span v-for="size in pizzaSizes" :key="size">{{ size }} </span>
    </p>
    <p>Ингридиенты: </p>
    <div>
      <div v-for="ingridient in pizzaIngridients" :key="ingridient.id">
        <p>{{ ingridient.name }} - {{ingridient.price }} руб.
        <button v-on:click="addToPizza(ingridient)">Добавить</button>
        <button v-on:click="deleteFromPizza(ingridient)">Удалить</button>
        </p>
      </div>
    </div>
  <p>Общая стоимость: {{ fullPrice }} руб.</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
    }
  },
  methods: {
    addToPizza: function (ingridient) {
      this.fullPrice += ingridient.price
    },
    deleteFromPizza (ingridient) {
      this.fullPrice -= ingridient.price
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
