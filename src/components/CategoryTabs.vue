<template>
  <ul>
    <li class="tab" v-bind:class="{ 'active-tab': selectedTab === tab.id }" v-for="tab in tabs" :key="tab.id" @click="selectTab(tab.id)">
      <a>{{ tab.caption }}</a>
    </li>
  </ul>
</template>

<script>

// Импортируем шину для генерации в ней событий.
import eventBus from '../../src/eventBus.js'

export default {
  name: 'category-tabs',
  data () {
    return {
      tabs: [
        {
          id: 1,
          caption: 'Мясо'
        },
        {
          id: 2,
          caption: 'Овощи'
        },
        {
          id: 3,
          caption: 'Сыры'
        }
      ],
      selectedTab: 1
    }
  },
  methods: {
    selectTab: function (tabId) {
      this.selectedTab = tabId
      eventBus.$emit('category-selected', this.selectedTab)
    }
  }
}

</script>

<!-- Атрибут "scoped" ограничивает видимость CSS, поэтому
определённый в теге стиль виден только в этом компоненте -->
<style scoped>
ul {
  list-style: none;
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 0px;
}

.tab {
  display: block;
  font-size: large;
  cursor: pointer;
}

.tab a {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  color: #828282;
  display: flex;
  justify-content: center;
  margin-bottom: -3px;
  padding: 0.5em 1em;
  vertical-align: top;
}

a:hover {
  border-bottom-color: #2c3e50;
  color: #2c3e50;
}

li.active-tab a {
  border-bottom-color: #025f02;
  color: #025f02;
}

a {
  color: #025f02;
  cursor: pointer;
  text-decoration: none;
}

.active-tab {
  color: green;
  font-weight: bold;
}
</style>
