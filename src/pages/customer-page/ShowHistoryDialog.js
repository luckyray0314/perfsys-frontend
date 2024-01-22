import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import NotificationsIcon from '@mui/icons-material/Notifications';

export default function ShowHistoryDialog(props) {
  const { t } = useTranslation();
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
      id: 'readyDate',
      align: 'center',
      disablePadding: false,
      label: t('ReadyDate')
    },
    {
      id: 'orderCompletionDate',
      align: 'center',
      disablePadding: false,
      label: t('OrderCompletionDate')
    },
    {
      id: 'operation',
      align: 'center',
      disablePadding: false,
      label: t('UpdatedDate')
    }
  ];
  const orders = props.data;
  console.log('history----------', orders);
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{fontSize: "20px"}}>{t('OrderHistory')} PO# {Array.isArray(orders) && orders.length > 0 && orders[0]?.orderPO}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
              position: 'relative',
              display: 'block',
              maxWidth: '100%',
              height: '700px',
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
                {Array.isArray(orders) &&
                  orders.length > 0 &&
                  orders?.map((order, key) => {
                    // const isItemSelected = isSelected(order.orderPO);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={key}
                        id={order._id}
                        // selected={isItemSelected}
                      >
                        <TableCell component="th" scope="row" align="center">
                          <Link color="secondary" to="">
                            {key + 1}
                          </Link>
                        </TableCell>
                        <TableCell align="center">{order.factory}</TableCell>
                        <TableCell align="center">{order.customer}</TableCell>
                        <TableCell align="center">{order.readyDate?.split('T')[0]}</TableCell>
                        <TableCell align="center">{order.completionDate?.split('T')[0]}</TableCell>
                        <TableCell align="center">{order.saveDate?.split('T')[0]}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
        {/* <Button onClick={props.handleOk} autoFocus>
          Agree
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
