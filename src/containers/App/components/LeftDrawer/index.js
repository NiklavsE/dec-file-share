import * as React from 'react'
import Typography from '../../../../components/Typography'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons//Mail'
import { Link } from 'react-router-dom'

/* component styles */
import { styles } from './styles.scss'

const drawerWidth = 500

export default function LeftDrawer() {
  return (
    <div className={styles}>
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography>
            Decentralised File Storage
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button component={Link} to="home" key="Your Files">
            <ListItemText primary="Your Files" />
          </ListItem>
          <ListItem button component={Link} to="shared" key="Shared">
            <ListItemText primary="Shared" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  )
}
