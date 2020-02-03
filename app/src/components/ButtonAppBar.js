import React from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const ButtonAppBar = ({ user, setUser, history }) => {
  const classes = useStyles()

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Menu
          </Typography>
          <Button color="inherit">Highlights</Button>
          <Button color="inherit">Articles</Button>
          <Button color="inherit">Friends</Button>
          {user === null ? null : (
            <>
              <Button color="inherit" component={RouterLink} to="/api/recipes">
                My recipes
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/api/recipes/new"
              >
                Create new recipe
              </Button>
            </>
          )}
          {user === null ? (
            <Button color="inherit" component={RouterLink} to="/signin">
              Sign in
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(ButtonAppBar)
