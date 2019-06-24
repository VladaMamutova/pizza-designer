import Vue from 'vue'

// eventBus - шина событий, необходимая для передачи данных между компонентами.
// Создаём пустой экземпляр Vue и экспортируем его - он и будет служить шиной событий.

const eventBus = new Vue()

export default eventBus
