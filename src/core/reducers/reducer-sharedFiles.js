import constants from 'core/types'

const initialState = {
  sharedFiles: [],
  loading: false,
  error: null
}

export function sharedFilesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SHARE_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case constants.SHARE_FILE:
      return {
        ...state,
        loading: true,
        error: null
      }

    case constants.GET_SHARED_FILES:
      return {
        ...state,
        loading: true,
        error: null
      }

    case constants.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case constants.GET_SHARED_FILES_SUCCESS:
      return {
        ...state,
        sharedFiles: action.payload
      }
    default:
      return state
  }
}
