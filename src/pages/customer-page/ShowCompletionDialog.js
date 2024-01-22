import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useTranslation } from 'react-i18next';
const ShowCompletionDialog = (props) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({
    qScore: props.order.qScore,
    cScore: props.order.cScore,
    pScore: props.order.pScore
  });
  const { qScore, cScore, pScore } = formData;
  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateScore(props.id, props.userId, formData);
    setFormData({
      qScore: '',
      cScore: '',
      pScore: ''
    })
    props.handleClose();
  };
  React.useEffect(() => {
    setFormData({
      qScore: props.order.qScore,
      cScore: props.order.cScore,
      pScore: props.order.pScore
    });
  }, [props.order]);
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{t("CompleteOrder")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">QC {t('Score')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="qScore"
                  value={qScore}
                  defaultValue={props.order.qScore}
                  label={`QC ${t('Score')}`}
                  onChange={handleChange}
                >
                  <MenuItem value={'1Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: 'red' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1Q &#40; {t('1Q')} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'2Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#eb8934' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;2Q &#40; {t('2Q')} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'3Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#ebdc34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;3Q &#40; {t('3Q')} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'4Q'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#cdeb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;4Q &#40; {t('4Q')} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'5Q'} style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', padding: 0 }}>
                    <div style={{ width: '300px', height: '30px', borderLeft: 'solid 5px', borderColor: '#83eb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;5Q &#40; {t('5Q')} &#41;
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t('Claims')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="cScore"
                  value={cScore}
                  defaultValue={props.order.cScore}
                  label={t('Claims')}
                  onChange={handleChange}
                >
                  <MenuItem value={'1C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: 'red' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1C &#40; {t("More")} 10% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'2C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#eb8934' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;2C &#40; {t("Less")} 10% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'3C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#ebdc34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;3C &#40; 5% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'4C'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#cdeb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;4C &#40; 3% &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'5C'} style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', padding: 0 }}>
                    <div style={{ width: '300px', height: '30px', borderLeft: 'solid 5px', borderColor: '#83eb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;5C &#40; 0% &#41;
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("ProcessScore")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="pScore"
                  value={pScore}
                  defaultValue={props.order.pScore}
                  label={t("ProcessScore")}
                  onChange={handleChange}
                >
                  <MenuItem value={'1P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: 'red' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;1P &#40; {t("1P")} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'2P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#eb8934' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;2P &#40; {t("2P")} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'3P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#ebdc34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;3P &#40; {t("3P")} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'4P'} style={{ borderTop: 'solid 1px', padding: 0 }}>
                    <div style={{ width: 'auto', height: '30px', borderLeft: 'solid 5px', borderColor: '#cdeb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;4P &#40; {t("4P")} &#41;
                    </div>
                  </MenuItem>
                  <MenuItem value={'5P'} style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', padding: 0 }}>
                    <div style={{ width: '300px', height: '30px', borderLeft: 'solid 5px', borderColor: '#83eb34' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;5P &#40; {t("5P")} &#41;
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} justifyContent="flex-end">
              <Button variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} onClick={handleSubmit}>
                {t('Complete')}
              </Button>
              <Button onClick={props.handleClose} sx={{ ml: 2 }}>
              {t('Cancel')}
              </Button>
            </Grid>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
// ShowUpdateDialog.propTypes = {
//   updateOrder: PropTypes.func.isRequired
// };
export default ShowCompletionDialog;
