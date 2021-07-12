import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TranslateIcon from '@material-ui/icons/TranslateOutlined';
import RoutedBottomNavigation from '../shared/navigation/RoutedBottomNavigation';
import { useAppTranslation } from 'Components/zume/translationHooks';

const classes = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  },
});

export default function ZumeAppNavigation() {
  const trans = useAppTranslation();
  const defaultActions = [
    {
      label: trans('Home'),
      icon: <HomeIcon />,
      path: '/',
    },
    {
      label: trans('About'),
      icon: <InfoOutlinedIcon />,
      path: '/about',
    },
    {
      label: trans('Account'),
      icon: <AccountCircleOutlinedIcon />,
      path: '/menu',
    },

    {
      label: trans('Language'),
      icon: <TranslateIcon />,
      path: '/language',
    },
  ];

  return <RoutedBottomNavigation actions={defaultActions} className={classes().stickToBottom} />;
}
