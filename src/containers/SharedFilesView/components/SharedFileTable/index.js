import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { getSharedFiles } from 'core/actions/actions-sharedFiles'
import DownloadIcon from '@mui/icons-material/Download'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'ipfsHash', label: 'Hash', minWidth: 100 }
]

const SharedFileTable = () => {
  const dispatch = useDispatch()
  const sharedFiles = useSelector(state => state.sharedFiles.sharedFiles)
  const provider = useSelector(state => state.provider.web3Provider)

  React.useEffect(() => {
    if (provider !== null) {
      dispatch(getSharedFiles())
    }
  }, [provider])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const areFilesPresent = sharedFiles.length > 0

  return (
    <div>
      { areFilesPresent ?
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>

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
              <TableBody>
                {sharedFiles
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((file) => {
              // asdasdasd
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={file.index}>
                  <TableCell
                    component="th"
                    id={file.id}
                    scope="row"
                    padding="normal"
                  >
                    {file.name}
                  </TableCell>
                  <TableCell align="center">
                    <a
                      href={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <DownloadIcon />
                    </a>
                  </TableCell>
                </TableRow>
              )
            })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sharedFiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper> : <h3>No shared files currently present in your account!</h3> }
    </div>
  )
}

export default SharedFileTable
