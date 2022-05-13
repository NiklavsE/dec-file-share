import constants from 'core/types'

const initialState = {
  selectedFiles: []
}

function fileTableReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SELECT_FILE:
      return {
        ...state,
        selectedFiles: [...state.selectedFiles, action.fileIndex]
      }

    case constants.UNSELECT_ALL_FILES:
      return {
        ...state,
        selectedFiles: []
      }

    case constants.UNSELECT_FILE:
      return {
        ...state,
        selectedFiles: state.selectedFiles.filter(fileIndex => fileIndex !== action.fileIndex)
      }

    default:
      return state
  }
}

export default fileTableReducer
