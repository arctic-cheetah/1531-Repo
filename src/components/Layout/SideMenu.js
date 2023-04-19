import { Divider, Drawer, Hidden, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { drawerWidth } from '../../utils/constants';
import { DarkModeContext } from "../../DarkModeContext";


const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
  },
}));

function SideMenu({ container, children, open, setOpen }) {
  const darkMode = useContext(DarkModeContext);
  const classes = useStyles();
  const theme = useTheme();
  const color = darkMode.isDark ? '#FFFFFF' : '#000000';

  return (
      <nav className={classes.drawer} aria-label="channels">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={open}
              onClose={() => setOpen(false)}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
          >
            <div className={classes.toolbar}/>
            <Divider/>
            {children}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
          >
            <div className={classes.toolbar}>
              <Link to="/" style={{ color, textDecoration: 'none' }}>
                <Typography variant="h5" noWrap>1531-MEME</Typography>
              </Link>
            </div>
            {children}
          </Drawer>
        </Hidden>
      </nav>
  );
}

export default SideMenu;
