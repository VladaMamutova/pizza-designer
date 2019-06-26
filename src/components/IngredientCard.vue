<template>
  <div class="ingredient-item" @click="updatePortionCount()">
    <div class="ingredient-view" v-bind:class="{ 'selected-view': ingredient.hasInOrder }">
      <img class="ingredient-icon" :src="ingredient.icon">
      <span> {{ ingredient.price }} ₽</span>
    </div>
    <div class="ingredient-info" v-bind:class="{ 'selected-info': ingredient.hasInOrder }">
      <div class="main-info">
        <b>{{ ingredient.name }}</b>
        <span class="portion"> {{ ingredient.portion }} г</span>
      </div>
      <div v-show="ingredient.hasInOrder" class="summary-info">
        <img src="../../static/images/remove.png" @click.stop="removeIngredient()">
        <div class="portion-count">×{{ portionCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>

// Импортируем шину для генерации в ней событий.
import eventBus from '../../src/eventBus.js'

export default {
  name: 'ingredient-card',
  props: {
    ingredient: {
      type: Object,
      required: true
    },
    portionCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeIngredient: function () {
      eventBus.$emit('ingredient-removed', this.ingredient.id)
    },
    updatePortionCount: function () {
      eventBus.$emit('ingredient-updated', this.ingredient.id)
    }
  }
}

</script>

<!-- Атрибут "scoped" ограничивает видимость CSS, поэтому
определённый в теге стиль виден только в этом компоненте -->
<style scoped>
.ingredient-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  padding: 0px;
  font-size: 20px;
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

.ingredient-item:hover .summary-info> img {
  display: flex;
}

.ingredient-view {
  padding: 15px;
  font-weight: bold;
  width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #9b9b9ba6;
  border-radius: 5px 0 0 5px;
}

.selected-view {
  background: #d7bc74;
}

.selected-info {
  background: #ffdd83;
}

.ingredient-icon {
  object-fit: cover;
  width: 60px;
  height: auto;
  min-height: 60px;
  border-radius: 60px;
  margin-bottom: 8px;
  background-color: white;
  -webkit-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 6px 6px 8px -3px rgba(50, 50, 50, 0.7);
}

.ingredient-icon> img {
  padding: 5px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

.ingredient-info {
  padding: 5px 5px 25px 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 25px;
  position: relative;
  border-radius: 0 5px 5px 0;
}

.main-info {
  display: flex;
  margin: auto;
  flex-direction: column;
}

.portion {
  line-height: 30px;
  font-size: 16px;
}

.summary-info {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.summary-info> img {
  display: none;
  width: 24px;
  height: 24px;
  margin: auto auto auto 5px;
}

.portion-count {
  width: 40px;
  background: orange;
  margin: auto 15px auto auto;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 4px -3px rgba(50, 50, 50, 0.7);
  -moz-box-shadow: 3px 3px 4px -3px rgba(50, 50, 50, 0.7);
  box-shadow: 3px 3px 4px -3px rgba(50, 50, 50, 0.7);
}
</style>
