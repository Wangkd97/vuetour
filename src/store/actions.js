
//给action注册事件处理函数。
 export function  setUserInfo({commit},user) {
   return commit('setUserinfo',user)
 }
export function  setUserName({commit},user) {
  return commit('setUserName',user)
}
export function  setFuzzyName({commit},fuzzyname) {
  return commit('setFuzzyName',fuzzyname)
}

