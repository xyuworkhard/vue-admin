const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  dataDicCode: state => state.user.dataDicCode,
  dataSourceComp: state => state.user.dataSourceComp,
  dataSourceFinc: state => state.user.dataSourceFinc,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}
export default getters
