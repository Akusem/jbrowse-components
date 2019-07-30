import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DrawerResizeHandle from './DrawerResizeHandle'

const styles = theme => ({
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: '1 0 auto',
    zIndex: theme.zIndex.drawer,
    top: 0,
    outline: 'none',
    left: 'auto',
    right: 0,
    background: theme.palette.background.default,
  },
  resizer: {
    zIndex: theme.zIndex.drawer + 1,
  },
})

class Drawer extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node,
    open: PropTypes.bool.isRequired,
    session: MobxPropTypes.observableObject.isRequired,
  }

  static defaultProps = {
    children: <></>,
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
  }

  render() {
    const { classes, children, open, session } = this.props
    return (
      <Slide in={open} direction="left" appear={this.mounted}>
        <Paper
          style={{ width: open ? session.drawerWidth : 0 }}
          className={classes.paper}
          elevation={16}
          square
        >
          <DrawerResizeHandle
            className={classes.resizer}
            onHorizontalDrag={distance => session.resizeDrawer(distance)}
          />
          {children}
        </Paper>
      </Slide>
    )
  }
}

export default withStyles(styles)(observer(Drawer))
