import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { selectFile, unselectAll } from 'core/actions/actions-fileTable'
import { getFiles } from 'core/actions/actions-files'
import DownloadIcon from '@mui/icons-material/Download'

const headCells = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'ipfsHash',
    label: 'Download'
  }
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick, numSelected, showCheckbox
  } =
    props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          { showCheckbox &&
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0}
            onChange={onSelectAllClick}
            inputProps={{
            'aria-label': 'unselect files'
          }}
          />
        }
        </TableCell>
        <TableCell
          key="name"
          align="left"
          padding="normal"
        >
          Name
        </TableCell>
        <TableCell
          key="ipfsHash"
          align="center"
          padding="normal"
          style={{ width: '15%' }}
        >
          Download
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  showCheckbox: PropTypes.bool.isRequired
}

export default function EnhancedTable() {
  const dispatch = useDispatch()

  const selectedFiles = useSelector(state => state.fileTable.selectedFiles)

  const files = useSelector(state => state.files.files)

  const provider = useSelector(state => state.provider.web3Provider)
  React.useEffect(() => {
    if (provider !== null) {
      dispatch(getFiles())
    }
  }, [provider])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)

  const handleSelectAllClick = () => {
    dispatch(unselectAll())
  }

  const handleClick = (event, index) => {
    dispatch(selectFile(index))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = fileIndex => selectedFiles.indexOf(fileIndex) !== -1

  const areFilesSelected = selectedFiles.length > 0

  const areFilesPresent = files.length > 0

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      {
        areFilesPresent ?
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  numSelected={selectedFiles.length}
                  onSelectAllClick={handleSelectAllClick}
                  showCheckbox={areFilesSelected}
                />
                <TableBody>
                  {files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.index)
                      const labelId = `enhanced-table-checkbox-${index}`

                      return (
                        <TableRow
                          hover
                          onClick={event => handleClick(event, row.index)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={`https://ipfs.infura.io/ipfs/${row.ipfsHash}`}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <DownloadIcon />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                  {emptyRows > 0 && (
                  <TableRow
                    style={{
                  height: 53 * emptyRows
                }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
            )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={files.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        : <h3> No Files uploaded!</h3>
        }
    </Box>
  )
}
