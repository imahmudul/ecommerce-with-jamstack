import React, {
  useState
} from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  IconButton,
  Tabs,
  Tab,
  Hidden,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
  Link,
  navigate
} from 'gatsby'

import search from '../../images/search.svg'
import cart from '../../images/cart.svg'
import account from '../../images/account-header.svg'
import menu from '../../images/menu.svg'

const useStyles = makeStyles(theme => ({
  coloredIndicator: {
    backgroundColor: '#fff'
  },
  logoText: {
    color: theme.palette.common.offBlack
  },
  logoContainer: {
    [theme.breakpoints.down('md')]: {
      marginRight: 'auto'
    }
  },
  tabs: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 600
  },
  icon: {
    height: '3rem',
    width: '3rem'
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  listItemText: {
    color: '#fff'
  }
  // "@global": {
  //   '.MuiTypography-h1': {
  //     fontSize: "30rem"
  //   }
  // },
}))

export default function Header({ categories }) {
  const classes = useStyles()
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const activeIndex = () => {
    const found = routes.indexOf(
      routes.filter(
        ({ node: { name, link } }) =>
          (link || `/${name.toLowerCase()}`) === window.location.pathname
      )[0]
    )
    console.log({ found })
    return found === -1 ? false : found
  }

  const routes = [...categories, { node: { name: 'Contact Us', strapiId: 'contact', link: '/contact' } }]

  const tabs = (
    <Tabs value={activeIndex()} classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}>
      {routes.map(route => (
        <Tab
          classes={{ root: classes.tab }}
          label={route.node.name}
          key={route.node.strapiId}
          component={Link}
          to={route.node.link || `/${route.node.name.toLowerCase()}`}
        />
      ))}
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {routes.map((route, i) => (
          <ListItem
            selected={activeIndex() === i}
            divider
            button
            key={route.node.strapiId}
            component={Link}
            to={route.node.link || `/${route.node.name.toLowerCase()}`}
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={route.node.name}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )

  const actions = [
    { icon: search, alt: 'search', visible: true, onClick: () => console.log("search") },
    { icon: cart, alt: 'cart', visible: true, link: '/cart' },
    { icon: account, alt: 'account', visible: !matchesMD, link: '/account' },
    { icon: menu, alt: 'menu', visible: matchesMD, onClick: () => setDrawerOpen(true) }
  ]

  return (
    <AppBar color="transparent" elevation={0}>
      <Toolbar>
        <Button component={Link} to='/' classes={{ root: classes.logoContainer }}>
          <Typography variant="h1"><span className={classes.logoText}>VAR</span> X</Typography>
        </Button>

        {matchesMD ? drawer : tabs}

        {actions.map(action => {
          if (action.visible) {
            return (
              <IconButton key={action.alt} onClick={action.onClick} component={action.onClick ? undefined : Link} to={action.onClick ? undefined : action.link}>
                <img
                  classes={classes.icon}
                  src={action.icon}
                  alt={action.alt}
                />
              </IconButton>
            )
          }
        })}
      </Toolbar>
    </AppBar>
  )
}