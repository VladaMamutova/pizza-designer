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
          <img v-show="ingredient.hasInOrder" v-for="ingredient in pizzaIngredients" :src="ingredient.img" :key="ingredient.id" :height="height" :width="width">
        </div>
        <div class="ingredients-grid">
          <div class="ingredient-item" v-for="(ingredient, index) in pizzaIngredients" :key="ingredient.id" @click="updatePizza(index)">
            <div class="ingredient-view" v-bind:class="{ selected: ingredient.hasInOrder }">
              <img class="ingredient-icon" :src="ingredient.icon">
              <span> {{ ingredient.price }} ₽</span>
            </div>
            <div class="ingredient-info" v-bind:class="{ activated: ingredient.hasInOrder }">
              <b>{{ ingredient.name }}</b>
              <span> {{ ingredient.portion }} г</span>
              <div v-show="ingredient.hasInOrder" class="portion-count">×{{ getPortion(index) }}</div>
            </div>
          </div>
        </div>
        <p>Общая стоимость: {{ order.fullPrice }} ₽</p>
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
      pizzaIngredients: [
        {
          id: 1,
          name: 'Балык',
          price: 50,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/balyk.png',
          icon: 'static/images/ingredients/balyk.jpg'
        },
        {
          id: 2,
          name: 'Салями',
          price: 40,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/salami.png',
          icon: 'static/images/ingredients/salami.jpg'
        },
        {
          id: 3,
          name: 'Помидоры',
          price: 30,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/tomato.png',
          icon: 'static/images/ingredients/tomato.png'
        }
      ],
      order: {
        ingredients: new Map(),
        fullPrice: 0
      }
    }
  },
  methods: {
    updatePizza: function (ingredientIndex) {
      let portion = 0
      /* let ingredient = this.pizzaIngredients[ingredientIndex]
      if (this.order.ingredients.has(ingredient.id)) {
        portion = this.order.ingredients.get(ingredient.id)
        portion++
        if (portion > 2) {
          this.order.ingredients.delete(ingredient.id)
          this.pizzaIngredients[ingredientIndex].hasInOrder = false
        } else {
          this.order.ingredients.set(ingredient.id, portion)
          this.pizzaIngredients[ingredientIndex].hasInOrder = true
        }
      } */
      if (this.order.ingredients.has(ingredientIndex)) {
        portion = this.order.ingredients.get(ingredientIndex)
      }
      portion++
      if (portion > 2) {
        this.order.ingredients.delete(ingredientIndex)
        this.pizzaIngredients[ingredientIndex].hasInOrder = false
      } else {
        this.order.ingredients.set(ingredientIndex, portion)
        this.pizzaIngredients[ingredientIndex].hasInOrder = true
      }
      this.calcOrderPrice()
    },
    calcOrderPrice: function () {
      let fullPrice = 0
      for (let ingridient of this.order.ingredients) {
        fullPrice += this.pizzaIngredients[ingridient[0]].price * ingridient[1]
      }
      this.order.fullPrice = fullPrice
    },
    getPortion: function (ingredientIndex) {
      if (this.order.ingredients.has(ingredientIndex)) {
        return this.order.ingredients.get(ingredientIndex)
      }
    },
    hasIngredientInOrder (ingredientId) {
      if (this.order.ingredients.has(ingredientId)) {
        return true
      } else {
        return false
      }
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
  background: url('../static/images/constructor/pizza-base.png');
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(10, 120px);
  grid-gap: 12px 12px;
  padding-left: 30px;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
}

.ingredient-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  padding: 0px;
  font-size: 20px;
  font-family: cursive;
  background-color: #c1bcb9ab;
  border-radius: 5px;
  -webkit-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  cursor: pointer;
}

.ingredient-item:hover {
  transition: transform 700ms;
  transform: scale(1.03);
  background-color: #c1bcb9;
}

.ingredient-view {
  padding: 15px;
  font-weight: bold;
  min-width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(155, 155, 155, 0.65);
  border-radius: 5px 0 0 5px;
}

.ingredient-view> span {
  margin-top: 7px;
}

.selected {
  background: #d7bc74;
}

.activated {
  background: #ffdd83;
}

.ingredient-icon {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: white;
  -webkit-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
}

.ingredient-info {
  padding: 15px 5px 5px 5px;
  display: flex;
  width: 100%;
  flex-direction: column;
}

.ingredient-icon> img {
  padding: 5px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

.portion-count {
  width: 40px;
  background: orange;
  margin: 10px 5px auto auto;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 4px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 3px 3px 4px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 3px 3px 4px -3px rgba(50, 50, 50, 0.7);
}

.round-button {
  font-size: 25px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  padding: 0;
  margin: 5px 0 0 0;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  outline: none;
}

.add {
  background-color: rgba(0, 0, 0, 0);
  color: #3ca03c;
  border: 2px solid #3ca03c;
}

.add:hover {
  background-color: #3ca03c;
  color: white;
}

.remove {
  background-color: rgba(0, 0, 0, 0);
  color: #b93e3e;
  border: 2px solid #b93e3e;
}

.remove:hover {
  background-color: #b93e3e;
  color: white;
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
