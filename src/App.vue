<template>
  <div id="app">
  <div class="header">
    <div class="dark-green"></div>
    <div class="light-yellow"></div>
    <div class="dark-red"></div>
    <header>Pizza Designer</header>
    <div class="dark-red"></div>
    <div class="light-yellow"></div>
    <div class="dark-green"></div>
    </div>
    <hr>
    <div class="page-content">
      <div>
        <div class="constructor">
          <img v-show="ingredient.hasInOrder" v-for="ingredient in pizzaIngredients" :src="ingredient.img" :key="ingredient.id" :height="height" :width="width">
        </div>
        <div class="order-info">
          <span>Итого:</span>
          <span></span>
          <span class="order-sum">{{ order.totalWeight }} г / <b>{{ order.fullPrice }} ₽</b></span>
        </div>
      </div>
      <div class="ingredients-menu">
        <category-tabs></category-tabs>
        <div class="ingredients-grid">
          <ingredient-card
            v-show="ingredient.tabId === categoryId"
            v-for="(ingredient, index) in pizzaIngredients"
            :ingredient="ingredient"
            :index="index"
            :portionCount="getPortionCount(index)"
            :key="ingredient.id">
          </ingredient-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CategoryTabs from './components/CategoryTabs.vue'
import IngredientCard from './components/IngredientCard.vue'

// Импортируем шину для отслеживания в ней событий.
import eventBus from '../src/eventBus.js'

export default {
  name: 'App',
  components: {
    CategoryTabs,
    IngredientCard
  },
  data () {
    return {
      height: 400,
      width: 400,
      categoryId: 1,
      pizzaIngredients: [
        {
          id: 1,
          tabId: 3,
          name: 'Сыр "Пармезан"',
          price: 99,
          portion: 70,
          hasInOrder: false,
          img: 'static/images/constructor/parmesan.png',
          icon: 'static/images/icons/parmesan.jpg'
        },
        {
          id: 2,
          tabId: 1,
          name: 'Ветчина',
          price: 50,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/ham.png',
          icon: 'static/images/icons/ham.jpg'
        },
        {
          id: 3,
          tabId: 1,
          name: 'Бекон',
          price: 65,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/bacon.png',
          icon: 'static/images/icons/bacon.jpg'
        },
        {
          id: 4,
          tabId: 1,
          name: 'Куриное филе копчёное',
          price: 69,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/chicken-fillet.png',
          icon: 'static/images/icons/chicken-fillet.jpg'
        },
        {
          id: 5,
          tabId: 1,
          name: 'Салями',
          price: 79,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/salami.png',
          icon: 'static/images/icons/salami.jpg'
        },
        {
          id: 6,
          tabId: 1,
          name: 'Колбаски охотничьи',
          price: 79,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/hunting-sausages.png',
          icon: 'static/images/icons/hunting-sausages.jpg'
        },
        {
          id: 7,
          tabId: 2,
          name: 'Помидоры',
          price: 35,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/tomato.png',
          icon: 'static/images/icons/tomato.jpg'
        },
        {
          id: 8,
          tabId: 2,
          name: 'Перец болгарский',
          price: 45,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/bell-pepper.png',
          icon: 'static/images/icons/bell-pepper.jpg'
        },
        {
          id: 9,
          tabId: 2,
          name: 'Красный лук',
          price: 30,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/red-onion.png',
          icon: 'static/images/icons/red-onion.jpg'
        },
        {
          id: 10,
          tabId: 2,
          name: 'Шампиньоны свежие',
          price: 59,
          portion: 50,
          hasInOrder: false,
          img: 'static/images/constructor/champignon.png',
          icon: 'static/images/icons/champignon.jpg'
        },
        {
          id: 11,
          tabId: 2,
          name: 'Ананас',
          price: 39,
          portion: 30,
          hasInOrder: false,
          img: 'static/images/constructor/pineapple.png',
          icon: 'static/images/icons/pineapple.jpg'
        },
        {
          id: 12,
          tabId: 2,
          name: 'Кукуруза',
          price: 39,
          portion: 30,
          hasInOrder: false,
          img: 'static/images/constructor/corn.png',
          icon: 'static/images/icons/corn.jpg'
        },
        {
          id: 13,
          tabId: 3,
          name: 'Сыр "Добрлю"',
          price: 99,
          portion: 70,
          hasInOrder: false,
          img: 'static/images/constructor/dorblu.png',
          icon: 'static/images/icons/dorblu.jpg'
        },
        {
          id: 14,
          tabId: 3,
          name: 'Сыр "Фета"',
          price: 90,
          portion: 70,
          hasInOrder: false,
          img: 'static/images/constructor/feta.png',
          icon: 'static/images/icons/feta.jpg'
        },
        {
          id: 15,
          tabId: 2,
          name: 'Маслины',
          price: 39,
          portion: 30,
          hasInOrder: false,
          img: 'static/images/constructor/olive.png',
          icon: 'static/images/icons/olive.jpg'
        },
        {
          id: 16,
          tabId: 2,
          name: 'Зелень',
          price: 10,
          portion: 5,
          hasInOrder: false,
          img: 'static/images/constructor/greenery.png',
          icon: 'static/images/icons/greenery.jpg'
        }
      ],
      order: {
        ingredients: new Map(),
        fullPrice: 0,
        totalWeight: 0
      }
    }
  },
  methods: {
    updateOrder: function (ingredientIndex) {
      if (ingredientIndex >= 0 && ingredientIndex < this.pizzaIngredients.length) {
        let portion = 0
        if (this.order.ingredients.has(ingredientIndex)) {
          portion = this.order.ingredients.get(ingredientIndex)
        }
        portion++
        if (portion > 2) {
          this.removeFromOrder(ingredientIndex)
        } else {
          this.order.ingredients.set(ingredientIndex, portion)
          this.pizzaIngredients[ingredientIndex].hasInOrder = true
          this.calcOrderInfo()
        }
      }
    },
    calcOrderInfo: function () {
      let fullPrice = 0
      let totalWeight = 0
      for (let ingridient of this.order.ingredients) {
        fullPrice += this.pizzaIngredients[ingridient[0]].price * ingridient[1]
        totalWeight += this.pizzaIngredients[ingridient[0]].portion * ingridient[1]
      }
      this.order.fullPrice = fullPrice
      this.order.totalWeight = totalWeight
    },
    removeFromOrder: function (ingredientIndex) {
      if (this.order.ingredients.has(ingredientIndex)) {
        this.order.ingredients.delete(ingredientIndex)
        this.pizzaIngredients[ingredientIndex].hasInOrder = false
        this.calcOrderInfo()
      }
    },
    getPortionCount: function (ingredientIndex) {
      if (this.order.ingredients.has(ingredientIndex)) {
        return this.order.ingredients.get(ingredientIndex)
      } else {
        return 0
      }
    },
    hasIngredientInOrder (ingredientId) {
      if (this.order.ingredients.has(ingredientId)) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    eventBus.$on('category-selected', categoryId => {
      this.categoryId = categoryId
    })
    eventBus.$on('ingredient-updated', ingredientIndex => {
      this.updateOrder(ingredientIndex)
    })
    eventBus.$on('ingredient-removed', ingredientIndex => {
      this.removeFromOrder(ingredientIndex)
    })
  }
}

</script>

<style>
#app {
  font-family: cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: url('assets/wood-background.jpg');
  object-fit: cover;
  background-size: cover;
}

header {
  font-size: 30px;
  font-weight: bold;
  padding: 8px;
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

.page-content {
  padding: 30px 50px;
  display: grid;
  grid-template-columns: 400px auto;
  grid-gap: 30px;
}

.constructor {
  position: relative;
  background: url('../static/images/constructor/pizza-base.png');
  width: 400px;
  height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
}

.constructor> img {
  position: absolute;
  display: block;
}

.order-info {
  margin: 20px 0 auto 0;
  padding-top: 10px;
  font-size: 25px;
  background-color: #ffdd83;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 100px auto auto;
  grid-template-rows: 45px;
  -webkit-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
}

.order-sum {
  margin: 0 10px 0 auto;
}

.ingredients-menu {
  padding: 0 20px 30px 20px;
  background-color: #fcfcfc;
  border-radius: 5px;
  height: fit-content;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 12px 12px;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
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
