import constants from 'core/types'

export const selectFile = fileIndex => async (dispatch, getState) => {
  const { selectedFiles } = getState().fileTable
  if (selectedFiles.includes(fileIndex)) {
    dispatch({
      type: constants.UNSELECT_FILE,
      fileIndex
    })
  } else {
    dispatch({
      type: constants.SELECT_FILE,
      fileIndex
    })
  }
}

export function unselectAll() {
  return {
    type: constants.UNSELECT_ALL_FILES
  }
}
