<script setup>
import { computed, reactive, ref } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'
import { useIssuesTranslationStore } from '../../stores/issuesTranslation.store'

const props = defineProps({
  issuesItem: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: 'add',
  },
})

const issuesStore = useIssuesStore()
const issuesTranslationStore = useIssuesTranslationStore()

// перевод на англ
const issueItemEn = computed(() =>
  issuesTranslationStore.getByIssueAndLang(props.issuesItem?.id, 'en')
)

// перевод на fr
const issueItemFr = computed(() =>
  issuesTranslationStore.getByIssueAndLang(props.issuesItem?.id, 'fr')
)

const isOpenModal = ref(false)
const model = reactive({
  issue: {},
  en: {},
  fr: {},
})

// валидация
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  issue: {
    name: { required },
    number: { required },
    year: { required },
  },
  en: {
    name: { required },
  },
  fr: {
    name: { required },
  },
}
const v = useVuelidate(rules, model)

// открываем форму
function open() {
  isOpenModal.value = true
  v.value.$reset()

  if (props.type == 'add') {
    model.issue.name =
      '"Водное хозяйство России: проблемы, технологии, управление"'
    model.issue.year = new Date().getFullYear()
    model.issue.number = issuesStore.getNewNumber(model.issue.year)
  }
  // режим редактирования
  if (props.type == 'edit') {
    // копируем объект
    for (let key in props.issuesItem) {
      model.issue[key] = props.issuesItem[key]
    }
  }

  // перевод на англ
  if (!issueItemEn.value) {
    model.en.name =
      '"Water sector of Russia: problems, technologies, management"'
    model.en.lang = 'en'
  } else {
    // копируем объект
    for (let key in issueItemEn.value) {
      model.en[key] = issueItemEn.value[key]
    }
  }

  // перевод на fr
  if (!issueItemFr.value) {
    model.fr.name = 'FRANCH'
    model.fr.lang = 'fr'
  } else {
    // копируем объект
    for (let key in issueItemFr.value) {
      model.fr[key] = issueItemFr.value[key]
    }
  }
}

async function save() {
  // валидация
  const isValid = await v.value.$validate()
  if (!isValid) return

  // запрос на сохранение
  if (props.type == 'add') {
    const newIssue = await issuesStore.create(model.issue)
    if (!newIssue) return

    // добавляем перевод
    model.en.issueId = newIssue.id
    await saveTranslation(model.en)

    model.fr.issueId = newIssue.id
    await saveTranslation(model.fr)
  }
  if (props.type == 'edit') {
    await issuesStore.update(model.issue)

    // добавляем/обновляем перевод
    model.en.issueId = model.issue.id
    await saveTranslation(model.en)

    model.fr.issueId = model.issue.id
    await saveTranslation(model.fr)
  }

  isOpenModal.value = false
}

async function saveTranslation(modelTranslation) {
  // проверяем существование перевода по наличию id
  if (!modelTranslation?.id) {
    await issuesTranslationStore.create(modelTranslation)
  } else {
    await issuesTranslationStore.update(modelTranslation)
  }
}

async function remove() {
  await issuesStore.remove(model.issue.id)
  isOpenModal.value = false
}
</script>

<template>
  <div class="editor">
    <AppButton v-if="type == 'add'" @click="open">ДОБАВИТЬ ВЫПУСК</AppButton>
    <AppButton v-if="type == 'edit'" @click="open">РЕДАКТИРОВАТЬ</AppButton>

    <AppModal :is-open="isOpenModal" size="md" @close="isOpenModal = false">
      <template #head>ДОБАВИТЬ ВЫПУСК</template>
      <template #body>
        <div class="form">
          <div>
            <FormInput
              id="name"
              v-model="model.issue.name"
              label="Название"
              css="w-full"
            />
            <FormWarning :errors="v.issue.name.$errors" />
          </div>

          <div>
            <FormInput
              id="nameEn"
              v-model="model.en.name"
              label="Название (en)"
              css="w-full"
            />
            <FormWarning :errors="v.en.name.$errors" />
          </div>

          <div>
            <FormInput
              id="nameFr"
              v-model="model.fr.name"
              label="Название (fr)"
              css="w-full"
            />
            <FormWarning :errors="v.fr.name.$errors" />
          </div>

          <div>
            <FormInput
              id="number"
              v-model="model.issue.number"
              label="Номер"
              css="w-full"
            />
            <FormWarning :errors="v.issue.number.$errors" />
          </div>

          <div>
            <FormInput
              id="year"
              v-model="model.issue.year"
              label="Год"
              css="w-full"
            />
            <FormWarning :errors="v.issue.year.$errors" />
          </div>
        </div>
      </template>
      <template #actions>
        <div class="actions">
          <AppButton @click="save">Сохранить</AppButton>
          <AppRemoveConfirm v-if="type == 'edit'" @click="remove">
            Подтвердите, что хотите удалить?
          </AppRemoveConfirm>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.form {
  @apply py-2 space-y-4;
}
.actions {
  @apply flex gap-4 items-center justify-between;
}
</style>
