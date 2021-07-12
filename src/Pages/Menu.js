import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ZumeInstallButton from 'Components/zume/ZumeInstallButton';
import ZumeLogo from 'Components/zume/ZumeLogo';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from 'Components/shared/navigation/ListItemLink';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import TranslateIcon from '@material-ui/icons/TranslateOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BookIcon from '@material-ui/icons/BookOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { useAppTranslation, useLocalizedAsset } from 'Components/zume/translationHooks';
import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import { reset } from 'Redux/store';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  const [resetting, setResetting] = useState(false);

  return (
    <div className={classes.root}>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <ZumeLogo size="small" />
        </Box>
        <Box>
          <ZumeInstallButton />
        </Box>
      </Box>
      <Divider />
      <List
        subheader={<ListSubheader>{trans('Settings')}</ListSubheader>}
        component="nav"
        aria-label={trans('Settings')}
      >
        <ListItemLink href="/downloads">
          <ListItemIcon>
            <CloudDownloadIcon />
          </ListItemIcon>
          <ListItemText primary={trans('Downloads')} />
        </ListItemLink>
        <ListItemLink href="/language">
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText primary={trans('Language')} />
        </ListItemLink>
        <ListItem
          button
          onClick={() => {
            const shouldReset = window.confirm(
              trans(
                trans(
                  'Resetting the app will delete all app data. Are you sure you want to reset?',
                ),
              ),
            );
            if (shouldReset) {
              setResetting(true);
              dispatch(reset());
              dispatch({ type: RESET_STATE });
              setTimeout(() => {
                setResetting(false);
                window.location.reload();
              }, 500);
            }
          }}
        >
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText primary={trans('Reset App')} />
          {resetting && (
            <ListItemSecondaryAction>
              <CircularProgress />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader>{trans('About Zúme Training')}</ListSubheader>}
        component="nav"
        aria-label={trans('About Zúme Training')}
      >
        <ListItemLink href="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={trans('About')} />
        </ListItemLink>
        <ListItemLink href="https://zume.training/" target="_blank">
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={trans('Help')} />
        </ListItemLink>
        <ListItemLink href={asset('guidebook')} target="_blank">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary={trans('Workbook')} />
        </ListItemLink>
      </List>
    </div>
  );
}
