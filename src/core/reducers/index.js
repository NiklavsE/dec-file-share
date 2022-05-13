import { combineReducers } from 'redux'
import { providerReducer } from 'core/reducers/reducer-provider'
import { filesReducer } from 'core/reducers/reducer-files'
import uiReducer           from 'core/reducers/reducer-ui'
import { sharedFilesReducer } from './reducer-sharedFiles'
import fileTableReducer from './reducer-fileTable'

const rootReducer = combineReducers({
  provider: providerReducer,
  ui: uiReducer,
  files: filesReducer,
  sharedFiles: sharedFilesReducer,
  fileTable: fileTableReducer
})

export default rootReducer
