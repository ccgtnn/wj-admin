<script setup>
import { ref, inject } from 'vue'

// Определение свойств компонента.
const props = defineProps({
  name: {
    type: String,
    default: 'paginator',
  },
})

// Шаг для пагинации.
const paginationStep = ref(3)

// Максимальное количество страниц, после которого отображение становится неполным.
const maxPageDisplay = ref(5)

// Внедряем пагинатор с заданным именем.
const paginator = inject(props.name)

// Ссылки на свойства пагинатора.
const currentPage = ref(paginator.currentPage)
const totalPages = ref(paginator.pagesCount)
const changePage = ref(paginator.changePage)
</script>

<template>
  <div class="flex gap-4 items-center">
    <!-- Кнопки пагинации отображаются только тогда, когда есть более одной страницы. -->
    <div v-if="totalPages > 1" class="py-2 flex items-center">
      <!-- Все номера страниц отображаются, когда общее количество страниц меньше или равно maxPageDisplay. -->
      <div v-if="totalPages <= maxPageDisplay" class="flex items-center gap-2">
        <!-- Используем компонент AppButton для кнопок -->
        <AppButton
          v-for="i in totalPages"
          :key="i"
          :class="{ btnActive: currentPage === i - 1 }"
          @click="changePage(i - 1)"
        >
          {{ i }}
        </AppButton>
      </div>
      <!-- Различные стили отображения, когда общее количество страниц больше maxPageDisplay. -->
      <div v-else>
        <!-- Отображение первых нескольких страниц и последней страницы, когда текущая страница меньше paginationStep. -->
        <div
          v-if="currentPage < paginationStep"
          class="flex items-center gap-2"
        >
          <!-- Используем компонент AppButton для кнопок -->
          <AppButton
            v-for="i in paginationStep + 1"
            :key="i"
            :class="{ btnActive: currentPage === i - 1 }"
            @click="changePage(i - 1)"
          >
            {{ i }}
          </AppButton>
          ...
          <AppButton @click="changePage(totalPages - 1)">
            {{ totalPages }}
          </AppButton>
        </div>
        <!-- Отображение первой страницы, текущей страницы с одной страницей с каждой стороны, и последней страницы, когда текущая страница находится в середине. -->
        <div
          v-if="
            currentPage >= paginationStep &&
            currentPage <= totalPages - paginationStep
          "
          class="flex items-center gap-2"
        >
          <AppButton @click="changePage(0)">1</AppButton>
          ...
          <AppButton
            v-for="i in 3"
            :key="i"
            :class="{
              btnActive: currentPage === currentPage + i - 2,
            }"
            @click="changePage(currentPage + i - 2)"
          >
            {{ currentPage + i - 1 }}
          </AppButton>
          ...
          <AppButton @click="changePage(totalPages - 1)">
            {{ totalPages }}
          </AppButton>
        </div>
        <!-- Отображение первой страницы, последних нескольких страниц, когда текущая страница находится среди последних нескольких страниц. -->
        <div
          v-if="currentPage > totalPages - paginationStep"
          class="flex items-center gap-2"
        >
          <AppButton @click="changePage(0)">1</AppButton>
          ...
          <AppButton
            v-for="i in paginationStep + 1"
            :key="i"
            :class="{
              btnActive: currentPage === totalPages - (5 - i),
            }"
            @click="changePage(totalPages - (5 - i))"
          >
            {{ totalPages - (4 - i) }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
