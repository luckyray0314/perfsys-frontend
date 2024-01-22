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
import { getSamples, addSample, deleteSample } from 'actions/sample';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
const SampleTable = ({ getSamples, addSample, deleteSample }) => {
  const { t } = useTranslation();
  const samples_state = useSelector((state) => state.sample.samples);
  const [samples, setSamples] = React.useState(['']);
  const [open, setOpen] = React.useState(false);
  const [sample_id, setSample_Id] = React.useState();
  const [sampleData, setSampleData] = React.useState({
    sample: '',
    location: ''
  });
  const { sample, location } = sampleData;
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
  const handleChange = (e) => setSampleData({ ...sampleData, [e.target.name]: e.target.value.trimEnd() });
  const handleClick = () => {
    addSample(sampleData);
  };
  const handleDelete = (id) => {
    setSample_Id(id);
    setOpen(true);
  };
  React.useEffect(() => {
    getSamples();
  }, [getSamples]);
  React.useEffect(() => {
    setSamples(samples_state);
  }, [samples_state]);
  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    addSample(sampleData);
    setSampleData({sample: ''});
  };
  const handleOk = () => {
    deleteSample(sample_id);
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} md={12} lg={12}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '120px', overflow: 'auto' }}>
          {samples.map((sample_item) => {
            const labelId = `checkbox-list-label-${sample_item}`;

            return (
              <ListItem
                key={sample_item}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={(e) => handleDelete(sample_item._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(sample_item)} dense>
                  <ListItemText id={labelId} primary={sample_item.sample} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <TextField
          id="standard-basic"
          label={t('AddSample')}
          type="search"
          variant="standard"
          sx={{ margin: '0 5vw 10px 50px' }}
          name="sample"
          value={sample}
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
        content = {t('DeleteSample')}
      />
    </Grid>
  );
};
SampleTable.propTypes = {
  getSamples: PropTypes.func.isRequired,
  addSample: PropTypes.func.isRequired,
  deleteSample: PropTypes.func.isRequired
};
export default connect(null, { getSamples, addSample, deleteSample })(SampleTable);
