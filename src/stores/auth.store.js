import { defineStore } from 'pinia'
import * as api from '@/api'
import { reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({})
  const timeLimit = ref(0)

  function setUser(_user = {}) {
    user.id = _user?.id ?? ''
    user.name = _user?.name ?? ''
  }

  // первичная инмциализация данных о пользователей
  try {
    setUser(JSON.parse(localStorage.getItem('user') ?? '{}'))
    timeLimit.value = localStorage.getItem('timeLimit') ?? 0
  } catch (error) {
    console.log(error)
  }

  async function signIn({ login, pasw }) {
    try {
      const response = await api.signIn({ login, pasw })

      // устанавливаем значения в localstaorge
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('timeLimit', response.timeLimit)

      // устанавливаем значения в store
      setUser(response.user)
      timeLimit.value = response.timeLimit

      return { errors: '' }
    } catch (error) {
      return { errors: 'Неправильные логин/пароль' }
    }
  }

  function singOut() {
    setUser()
    localStorage.removeItem('user')
    timeLimit.value = 0
    localStorage.removeItem('timeLimit')
    localStorage.removeItem('token')
  }

  return {
    user,
    timeLimit,
    setUser,
    signIn,
    singOut,
  }
})
