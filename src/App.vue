<template>
  <div id="app">
    <div class="header">
      <div class="flag"></div>
      <header>Конструктор пиццы "Создай сам"</header>
      <div class="flag-reversed"></div>
    </div>
    <div class="page-content">
        <div class="constructor">
          <img v-show="ingredient.hasInOrder" v-for="ingredient in pizzaIngredients" :src="ingredient.img" :key="ingredient.id">
        </div>
      <div class="order">
        <div class="order-info">
          <span>Ваша пицца содержит:</span>
          <div class="order-item">
            <span>Основа с томатным соусом</span>
            <span>{{ pizzaBase.weight }} г</span>
            <span>{{ pizzaBase.price }} ₽</span>
          </div>
           <div class="order-item" v-show="ingredient.hasInOrder" v-for="ingredient in pizzaIngredients" :key="ingredient.id">
            <span>{{ ingredient.name }} ×{{ getPortionCount(ingredient.id) }}</span>
            <span>{{ ingredient.portion * getPortionCount(ingredient.id)}} г</span>
            <span>{{ ingredient.price * getPortionCount(ingredient.id)}} ₽</span>
          </div>
          <div class="order-weight">Общий вес: {{ order.totalWeight }} г</div>
          <div class="order-sum"><b>Итого: {{ order.fullPrice }} ₽</b></div>
        </div>
        <button onclick="alert('Ваш заказ отправлен!'); window.location.reload();">Заказать</button>
      </div>
      <div class="ingredients-menu">
        <category-tabs></category-tabs>
        <div class="ingredients-grid">
          <ingredient-card
            v-show="ingredient.tabId === categoryId"
            v-for="ingredient in pizzaIngredients"
            :ingredient="ingredient"
            :portionCount="getPortionCount(ingredient.id)"
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
      categoryId: 1,
      pizzaBase: {
        weight: 300,
        price: 150
      },
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
        fullPrice: 150,
        totalWeight: 300
      }
    }
  },
  methods: {
    updateOrder: function (ingredientId) {
      let ingredientIndex = this.pizzaIngredients.findIndex(ingredient => ingredient.id === ingredientId)
      if (ingredientIndex !== -1) {
        let portion = 0
        if (this.order.ingredients.has(ingredientId)) {
          portion = this.order.ingredients.get(ingredientId)
        }
        portion++
        if (portion > 2) {
          this.removeFromOrder(ingredientId)
        } else {
          this.order.ingredients.set(ingredientId, portion)
          this.pizzaIngredients[ingredientIndex].hasInOrder = true
          this.calcOrderInfo()
        }
      }
    },
    calcOrderInfo: function () {
      let fullPrice = 0
      let totalWeight = 0
      for (let ingridient of this.order.ingredients) {
        let ingredientIndex = this.pizzaIngredients.findIndex(ingredient => ingredient.id === ingridient[0])
        if (ingredientIndex !== -1) {
          fullPrice += this.pizzaIngredients[ingredientIndex].price * ingridient[1]
          totalWeight += this.pizzaIngredients[ingredientIndex].portion * ingridient[1]
        }
      }
      this.order.fullPrice = fullPrice + this.pizzaBase.price
      this.order.totalWeight = totalWeight + this.pizzaBase.weight
    },
    removeFromOrder: function (ingredientId) {
      let ingredientIndex = this.pizzaIngredients.findIndex(ingredient => ingredient.id === ingredientId)
      if (ingredientIndex !== -1 && this.order.ingredients.has(ingredientId)) {
        this.order.ingredients.delete(ingredientId)
        this.pizzaIngredients[ingredientIndex].hasInOrder = false
        this.calcOrderInfo()
      }
    },
    getPortionCount: function (ingredientId) {
      if (this.order.ingredients.has(ingredientId)) {
        return this.order.ingredients.get(ingredientId)
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
    eventBus.$on('ingredient-updated', ingredientId => {
      this.updateOrder(ingredientId)
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
  height: 100%;
  min-height: 100vh;
  background: url('assets/wood-background.jpg');
  object-fit: cover;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

header {
  font-size: xx-large;
  font-weight: bold;
  padding: 8px;
  color: white;
  background-color: #286f03;
}

.header {
  display: grid;
  grid-template-columns: 120px auto 120px;
  grid-template-rows: 60px;
  width: 100%;
  position: fixed;
  height: 60px;
  z-index: 1000;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.flag {
  background: linear-gradient(to right, #025f02 33%, #ffffb1 33%, #ffffb1 66%, #d20000 66%);
}

.flag-reversed {
  background: linear-gradient(to left, #025f02 33%, #ffffb1 33%, #ffffb1 66%, #d20000 66%);
}

.page-content {
  padding: 100px 40px 40px 40px;
  display: grid;
  grid-template-columns: minmax(200px, 370px) minmax(200px, 300px) auto;
  grid-template-rows: 370px auto;
  grid-gap: 15px;
  grid-template-areas:
        "c o m"
        ". o m"
}

.constructor {
  grid-area: c;
  position: relative;
  background: url('../static/images/constructor/pizza-base.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.constructor> img {
  position: absolute;
  display: block;
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
}

.order {
  grid-area: o;
}

.order-info {
  padding: 15px;
  font-size: medium;
  text-align: left;
  background-color: #ffffff;
  width: 100% - 30px;
  height: auto;
  background-color: #fcfcfc;
  border-radius: 5px;
  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.order-info> span {
  margin-top: 100px;
}

.order-item {
  display: grid;
  font-size: small;
  margin-top: 8px;
  grid-template-columns: auto 40px 40px;
  grid-gap: 5px;
  border-bottom: dotted;
  border-bottom-width: 1px;
  border-color: rgb(170, 170, 170);
  margin-top: 7px;
}

button {
  font-size: 25px;
  width: 100%;
  height: 50px;
  margin-top: 15px;
  border-radius: 5px;
  background-color: #c92828;
  color: white;
  outline: none;
  border: none;
  -webkit-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  cursor: pointer;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
}

button:hover {
  background-color: #de2d2d;
  -webkit-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.8);
  -moz-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.8);
  box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.8);
}

.order-weight {
  margin-top: 7px;
}

.order-sum {
  margin: 10px auto 0 auto;
  padding: 10px;
  font-size: large;
  background-color: #ffdd83;
  border-radius: 5px;
  text-align: center;
}

.ingredients-menu {
  grid-area: m;
  padding: 0 20px 30px 20px;
  background-color: #fcfcfc;
  border-radius: 5px;
  height: fit-content;
  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
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

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .page-content {
    padding: 100px 30px 30px 30px;
    grid-template-rows: 350px auto-fit;
    grid-template-areas:
      "c m m"
      "o m m"
  }
}

@media screen and (max-width: 991px) {
  header {
    padding-top: 12px;
    font-size: x-large;
  }
}

@media screen and (max-width: 767px) {
  .header {
    grid-template-columns: 0px auto 0px;
  }
  .page-content {
    padding: 80px 10px 10 10px;
    grid-gap: 15px 0px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "m"
      "o"
  }
}

@media screen and (max-width: 480px) {
  header {
    font-size: large;
  }
}

</style>
