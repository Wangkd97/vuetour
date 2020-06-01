
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
export function  setsysOption({commit},sysOption) {
  return commit('setsysOption',sysOption)
}
export function  setsysUserInfo({commit},sysUserInfo) {
  return commit('setsysUserInfo',sysUserInfo)
}

