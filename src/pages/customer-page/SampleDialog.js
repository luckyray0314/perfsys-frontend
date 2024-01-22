import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Link, Table,Label, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import DialogTitle from '@mui/material/DialogTitle';
export default function SampleModal(props) {
  const { t } = useTranslation();
  const samples = props.data
  const headCells = [
    {
      id: 'no',
      align: 'center',
      disablePadding: false,
      label: 'No'
    },
    {
      id: 'factory',
      align: 'center',
      disablePadding: true,
      label: t("Factory")
    },
    {
      id: 'customer',
      align: 'center',
      disablePadding: false,
      label: t('Customer')
    },
    {
      id: 'owner',
      align: 'center',
      disablePadding: false,
      label: t('Owner')
    }
  ];
  const [formData, setFormData] = React.useState({
    orderPO: '',
    factory: '',
    customer:'',
    owner: '',
    qScore: '',
    cScore: '',
    pScore: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOk = () => {
      props.addOrder(formData);
      props.handleClose();
  };
  //----------------table Row selection--------------//
  const [rowSelect, setRowSelect] = React.useState('');
  const handleClickRow = (sample) => {
    setRowSelect(`🛒${t('Order')}  [${t('Factory')}]:  ${sample.factory}   [${t('Customer')}]:  ${sample.customer}  [${t('Owner')}]:  ${sample.owner}` );
    setFormData({
      ...formData,
      factory: sample.factory,
      customer: sample.customer,
      owner: sample.owner
    })
  }
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogContent>
        <DialogContentText>Enter Order PO# number</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="orderPO"
          label="Order PO# Number"
          onChange={handleChange}
          type="number"
          fullWidth
          variant="standard"
        />
        <h2 style={{color : "rgb(130, 130, 130)"}}>{rowSelect}</h2>
        <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
              position: 'relative',
              display: 'block',
              maxWidth: '100%',
              height: '500px',
              '& td, & th': { whiteSpace: 'nowrap' }
            }}
          >
            <Table
              aria-labelledby="tableTitle"
              sx={{
                '& .MuiTableCell-root:first-of-type': {
                  pl: 2
                },
                '& .MuiTableCell-root:last-of-type': {
                  pr: 3
                }
              }}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.align}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      sortDirection={'desc'}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(samples) &&
                  samples.length > 0 &&
                  samples?.map((sample, key) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        tabIndex={-1}
                        key={key}
                        id={sample._id}
                        onClick={ (e) => handleClickRow(sample)}
                      >
                        <TableCell component="th" scope="row" align="center">
                          <Link color="secondary" to="">
                            {key + 1}
                          </Link>
                        </TableCell>
                        <TableCell align="center">{sample.factory}</TableCell>
                        <TableCell align="center">{sample.customer}</TableCell>
                        <TableCell align="center">{sample.owner}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
