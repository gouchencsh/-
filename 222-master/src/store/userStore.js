/**
 * 存储用户状态信息
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('loginUser', {
  state: () => ({
    id: 0,
    username: '',
    userAccount: '',
    token: ''
  }),
  actions: {
    setUser(data) {
      this.id = data.id || 0
      this.username = data.username || ''
      this.userAccount = data.userAccount || ''
      this.token = data.token || ''
      localStorage.setItem('id', String(this.id))
      localStorage.setItem('username', this.username)
      localStorage.setItem('userAccount', this.userAccount)
      localStorage.setItem('token', this.token)
    },
    clearUser() {
      this.id = 0
      this.username = ''
      this.userAccount = ''
      this.token = ''
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('userAccount')
      localStorage.removeItem('token')
    },
    loadUser() {
      this.id = Number(localStorage.getItem('id')) || 0
      this.username = localStorage.getItem('username') || ''
      this.userAccount = localStorage.getItem('userAccount') || ''
      this.token = localStorage.getItem('token') || ''
    }
  }
})
