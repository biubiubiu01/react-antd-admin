import { createStore, combineReducers } from 'redux'

//导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 组合最终的store
const store = createStore(combineReducers(modules))
export default store
