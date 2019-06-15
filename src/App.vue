<template>
  <div id="app">
  <div class="header">
    <div class="dark-green"></div>
    <div class="light-yellow"></div>
    <div class="dark-red"></div>
    <header>Pizza-Designer</header>
    <div class="dark-red"></div>
    <div class="light-yellow"></div>
    <div class="dark-green"></div>
    </div>
    <hr>
    <div id="container">
      <div class="page-content">
        <div class="constructor">
          <img v-for="ingredient in pizzaIngredients" :src="ingredient.img" :key="ingredient.id" :height="height" :width="width">
        </div>
        <div class="ingredients-grid">
          <div class="ingredient-item" v-for="ingredient in pizzaIngredients" :key="ingredient.id">
            <p>{{ ingredient.name }} - {{ingredient.price }} руб.</p>
            <p style="margin: 0;">
              <button v-on:click="addToPizza(ingredient)">Добавить</button>
              <button v-on:click="deleteFromPizza(ingredient)">Удалить</button>
            </p>
          </div>
        </div>
        <p>Общая стоимость: {{ fullPrice }} руб.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      message: 'Hello Vue.js!',
      title: 'Craft your own pizza!',
      height: 400,
      width: 400,
      restaurantIsOpen: true,
      pizzaSizes: [35, 40],
      fullPrice: 0,
      pizzaIngredients: [
        {
          id: 1,
          name: 'Бекон',
          price: 50,
          img: 'static/images/balyk.png'
        },
        {
          id: 2,
          name: 'Салями',
          price: 40,
          img: 'static/images/salami.png'
        },
        {
          id: 3,
          name: 'Помидоры',
          price: 30,
          img: 'static/images/tomato.png'
        }
      ]
    }
  },
  methods: {
    addToPizza: function (ingredient) {
      this.fullPrice += ingredient.price
    },
    deleteFromPizza (ingredient) {
      this.fullPrice -= ingredient.price
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
}

header {
  font-size: 30px;
  font-weight: bold;
  padding: 15px;
  color: white;
  background: linear-gradient(to left, green, #286f03, green);
}

.header {
  display: grid;
  grid-template-columns: 40px 40px 40px auto 40px 40px 40px;
  grid-template-rows: 60px;
}

hr {
  border: 0;
  margin: 0;
  height: 2px;
  background: linear-gradient(to left, #c1bcb9 10%, #164200 30%, #164200 70%, #c1bcb9 90%);
}

#container {
  background: url('assets/wood-background.jpg');
  background-position: center;
  object-fit: cover;
  height: -webkit-fill-available;
}

.page-content {
  padding: 30px 70px;
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 400px;
  grid-gap: 10px;
}

.constructor {
  position: relative;
  background: url('../static/images/pizza-base.png');
  width: 100%;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
}

.constructor> img {
  position: absolute;
  display: block;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: repeat(10, 70px);
  grid-gap: 7px;
}

.ingredient-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 100%;
  padding: 12px;
  background-color: #c1bcb9ab;
  border-radius: 5px;
}

.light-yellow{
  background-color:#ffffb1;
}

.dark-red{
  background-color:#d20000;
}

.dark-green{
  background-color:#025f02;
}

</style>
