import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Grid, Button, TextField } from '@mui/material';
import { getOwners, addOwner, deleteOwner } from 'actions/owner';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
const OwnerTable = ({ getOwners, addOwner, deleteOwner }) => {
  const { t } = useTranslation();
  const owners_state = useSelector((state) => state.owner.owners);
  const [owners, setOwners] = React.useState(['']);
  const [open, setOpen] = React.useState(false);
  const [owner_id, setOwner_Id] = React.useState();
  const [ownerData, setOwnerData] = React.useState({
    owner: '',
    location: ''
  });
  const { owner, location } = ownerData;
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleChange = (e) => setOwnerData({ ...ownerData, [e.target.name]: e.target.value.trimEnd() });
  const handleClick = () => {
    addOwner(ownerData);
  };
  const handleDelete = (id) => {
    setOwner_Id(id);
    setOpen(true);
  };
  React.useEffect(() => {
    getOwners();
  }, [getOwners]);
  React.useEffect(() => {
    setOwners(owners_state);
  }, [owners_state]);
  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    addOwner(ownerData);
    setOwnerData({owner: ''});
  };
  const handleOk = () => {
    deleteOwner(owner_id);
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} md={12} lg={12}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '160px', overflow: 'auto' }}>
          {owners.map((owner_item) => {
            const labelId = `checkbox-list-label-${owner_item}`;

            return (
              <ListItem
                key={owner_item}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={(e) => handleDelete(owner_item._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(owner_item)} dense>
                  <ListItemText id={labelId} primary={owner_item.owner} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <TextField
          id="standard-basic"
          label={t('AddOwner')}
          type="search"
          variant="standard"
          sx={{ margin: '0 5vw 10px 50px' }}
          name="owner"
          value={owner}
          onKeyPress={handleEnter}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Button
          variant="contained"
          color="success"
          sx={{ backgroundColor: 'rgb(170,170,170)' }}
          onClick={handleClick}
          startIcon={<PlaylistAddCircleIcon />}
        >
          {t('AddNew')}
        </Button>
      </Grid>
      <DeleteModal
        open = {open}
        handleOk = {handleOk}
        handleClose = {handleClose}
        content = {t('DeleteOwner')}
      />
    </Grid>
  );
};
OwnerTable.propTypes = {
  getOwners: PropTypes.func.isRequired,
  addOwner: PropTypes.func.isRequired,
  deleteOwner: PropTypes.func.isRequired
};
export default connect(null, { getOwners, addOwner, deleteOwner })(OwnerTable);
