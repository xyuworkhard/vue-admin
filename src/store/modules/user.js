import { login, logout, getInfo } from '@/api/user'
import {
  getToken, setToken, removeToken, setMark,
  removeMark,
  getMark, setUserInfo, removeUserInfo
} from '@/utils/auth'
import { resetRouter } from '@/router'
import { getSource, getDictionary } from '@/utils/requestFunc'
const getDefaultState = () => {
  return {
    token: getToken(),
    mark: getMark(),
    name: '',
    avatar: '',
    dataDicCode: '',
    dataSourceComp: '',
    dataSourceFinc: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGMARK: (state, mark) => {
    state.mark = mark
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_DATADICCODE: (state, dataDicCode) => {
    state.dataDicCode = dataDicCode
  },
  SET_DATASOURCECOMP: (state, dataSourceComp) => {
    state.dataSourceComp = dataSourceComp
  },
  SET_DATASOURCEFINC: (state, dataSourceFinc) => {
    state.dataSourceFinc = dataSourceFinc
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return (async function () {
      try {
        let { data: { data: data_dic } } = await getDictionary()
        let { data: data_sourcecomp } = await getSource('csce_companyca')
        let { data: data_sourcefinc } = await getSource('csce_company_bank')
        let response = await login(userInfo)
        const { baseinfo } = response.data
        commit('SET_TOKEN', baseinfo.token)
        commit('SET_LOGMARK', baseinfo.loginMark)
        commit('SET_DATADICCODE', data_dic)
        commit('SET_DATASOURCECOMP', data_sourcecomp)
        commit('SET_DATASOURCEFINC', data_sourcefinc)
        setToken(baseinfo.token)
        setMark(baseinfo.loginMark)
        setUserInfo(baseinfo)
      } catch (err) {
        console.log(err)
      }
    }())
  },

  // get user info
  getInfo({ commit }) {
    return (async function () {
      try {
        let { data: { data: data_dic } } = await getDictionary()
        let { data: data_sourcecomp } = await getSource('csce_companyca')
        let { data: data_sourcefinc } = await getSource('csce_company_bank')
        commit('SET_DATADICCODE', data_dic)
        commit('SET_DATASOURCECOMP', data_sourcecomp)
        commit('SET_DATASOURCEFINC', data_sourcefinc)
        commit('SET_NAME', "supper admin")
        commit('SET_AVATAR', "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif")
      } catch (err) {
        console.log(err)
      }
    }())
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        removeMark()
        removeUserInfo()
        resetRouter()
        commit('RESET_STATE')
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeMark()
      removeUserInfo()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

