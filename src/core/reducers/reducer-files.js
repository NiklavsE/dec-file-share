import constants from 'core/types'

const initialState = {
  files: [],
  isUploadingFile: false,
  isLoadingFileList: false,
  error: null
}

export function filesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        error: null,
        isUploadingFile: false,
        files: [...state.files, action.payload]
      }

    case constants.UPLOAD_FILE:
      return {
        ...state,
        isUploadingFile: true,
        error: null
      }

    case constants.GET_FILES:
      return {
        ...state,
        loading: true,
        error: null
      }

    case constants.SET_SHARE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case constants.GET_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        files: action.payload
      }
    default:
      return state
  }
}
