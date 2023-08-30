<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'

import { useRouter } from 'vue-router'
const router = useRouter()

const authStore = useAuthStore()

const model = reactive({ login: 'admin', pasw: '67254jhk4357923fdfs' })
const serverErrors = ref('')
const isLoading = ref(false)

// валидация
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  login: { required },
  pasw: { required },
}
const v = useVuelidate(rules, model)

/**
 * Login
 */
async function signIn() {
  const isValid = await v.value.$validate()
  if (!isValid) return

  isLoading.value = true

  const res = await authStore.signIn(model)
  if (res.errors) {
    serverErrors.value = res.errors
  } else {
    router.push('/p/journals/issues')
  }

  isLoading.value = false
}
</script>

<template>
  <div class="wrap">
    <AppCard class="form">
      <div>
        <FormInput
          id="login"
          v-model="model.login"
          label="Логин"
          css="w-full"
        />
        <FormWarning :errors="v.login.$errors" />
      </div>
      <div>
        <FormInput
          id="pasw"
          v-model="model.pasw"
          label="Пароль"
          type="password"
          css="w-full"
        />
        <FormWarning :errors="v.pasw.$errors" />
      </div>

      <div class="form__actions">
        <AppButton :isDisable="isLoading" @click="signIn">Вход</AppButton>
      </div>

      <div class="form__errors">
        {{ serverErrors }}
      </div>
    </AppCard>
  </div>
</template>

<style scoped>
.wrap {
  @apply my-10 flex justify-center;
}
.form {
  @apply py-2 space-y-2;
}
.form__actions {
  @apply py-2;
}
.form__errors {
  @apply text-mainColors-form-warning;
}
</style>
