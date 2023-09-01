<script>
import { ref, Teleport } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  components: { Teleport },
  props: {
    menuList: {
      type: Object,
      required: true,
    },
    startItem: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['choose'],
  setup(props, ctx) {
    const isHover = ref(false)
    const style = ref('')
    const activeItem = ref(props.startItem)
    const button = ref(null)
    const modal = ref(null)

    function open(e) {
      isHover.value = true
      /* определяем расположение */
      if (e) {
        style.value =
          'top:' + (e.pageY - 20) + 'px;' + 'left:' + (e.pageX - 20) + 'px;'
      }
    }

    /**
     * Выбор пункта меню
     * @param {string} _activeItem
     */
    function choose(_activeItem) {
      activeItem.value = _activeItem
      ctx.emit('choose', _activeItem)
      isHover.value = false
    }

    /**
     * Обработка события щелчка мыши вне модального окна
     */
    onClickOutside(modal, () => close())

    function close() {
      isHover.value = false
    }

    return {
      isHover,
      style,
      activeItem,
      button,
      modal,
      open,
      choose,
      close,
    }
  },
}
</script>

<template>
  <div class="relative z-10" @click.stop="open">
    <AppButton
      ref="button"
      :isActive="isActive"
      class="flex items-center gap-2"
    >
      <span>{{ activeItem }}</span>
      <IconCaretDown class="w-3" />
    </AppButton>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isHover"
          ref="modal"
          :style="style"
          class="absolute shadow-xl z-20 bg-mainColors-bg"
        >
          <ul>
            <li
              v-for="(item, i) in menuList"
              :key="i"
              class="p-2 cursor-pointer backdrop-brightness-200"
              :class="{ _btnDropMenuActive: item == activeItem }"
              @click.prevent="choose(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
