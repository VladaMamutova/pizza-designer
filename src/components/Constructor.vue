<template>
  <div class="constructor" :style="{ 'background-image': 'url(' + background + ')' }">
    <img v-show="ingredient.hasInOrder" v-for="ingredient in pizzaIngredients" :src="ingredient.img" :key="ingredient.id">
  </div>
</template>

<script>

export default {
  name: 'constructor',
  props: {
    pizzaIngredients: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      background: require('../assets/pizza-base.png')
    }
  }
}

</script>

<!-- Атрибут "scoped" ограничивает видимость CSS, поэтому
определённый в теге стиль виден только в этом компоненте -->
<style scoped>
.constructor {
  grid-area: c;
  position: relative;
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

</style>
