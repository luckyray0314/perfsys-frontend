import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//--------------Dialog---------------//
import ShowAddDialog from './ShowAddDialog';
import ShowHistoryDialog from './ShowHistoryDialog';
import ShowUpdateDialog from './ShowUpdateDialog';
import ShowCompletionDialog from './ShowCompletionDialog';
// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
// third-party
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getOrders } from 'actions/order';
import { getOrdersHistory } from 'actions/order_history';
import { deleteOrder } from 'actions/order';
import { useSelector } from 'react-redux';
import { updateOrder } from 'actions/order';
import { updateScore } from 'actions/order';
import { addOrderHistory } from 'actions/order_history';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useTranslation } from 'react-i18next';

// project import
// const updateletter = 'Do you really update this item?';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order_h, orderBy) {
  return order_h === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order_h = comparator(a[0], b[0]);
    if (order_h !== 0) {
      return order_h;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order_h, orderBy }) {
  const { t } = useTranslation();
  const headCells = [
    {
      id: 'orderPO',
      align: 'center',
      disablePadding: false,
      label: `${t('Order')}  PO#`
    },
    {
      id: 'status',
      align: 'center',
      disablePadding: false,
      label: t('Status')
    },
    {
      id: 'factory',
      align: 'center',
      disablePadding: false,
      label: t('Factory')
    },
    {
      id: 'customer',
      align: 'center',
      disablePadding: true,
      label: t('Customer')
    },
    {
      id: 'owner',
      align: 'center',
      disablePadding: false,
      label: t('Owner')
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
      label: t('CompletionDate')
    },
    {
      id: 'operation',
      align: 'center',
      disablePadding: false,
      label: t('Operation')
    }
  ];
  return (
    <TableHead>
      <TableRow>
        
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order_h : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order_h: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //
const OrderTable = ({ getOrders, deleteOrder, getOrdersHistory, updateOrder, updateScore, addOrderHistory }) => {
  const { t } = useTranslation();
  const [open_d, setOpen_d] = React.useState(false);
  const [open_h, setOpen_h] = React.useState(false);
  const [open_u, setOpen_u] = React.useState(false);
  const [open_c, setOpen_c] = React.useState(false);
  const [updateId, setUpdateId] = React.useState('');

  const [orderID, setOrderID] = React.useState();
  const [userId, setUserId] = React.useState();
  const [orderHistory, setOrderHistory] = React.useState();
  const [orders, setOrders] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  // -----------Delete Order--------------//
  const handleClickOpen_d = (orderID) => {
    setOpen_d(true);
    setOrderID(orderID);
  };
  const handleClose_d = () => {
    setOpen_d(false);
  };
  //--------------Open History Dialog-----------//
  const handleClickOpen_h = (orderID) => {
    setOpen_h(true);

  };
  const handleClose_h = () => { 
    setOpen_h(false);
  };
  //--------------Open Update dialog-----------//
  const handleClickOpen_u = (orderID, order) => {
    setUpdateId(orderID);
    setOrder(order);
    setOpen_u(true);
  };
  const handleClose_u = () => {
    setOpen_u(false);
  };
  //--------------Open Complete dialog-----------//
  const handleClickOpen_c = (orderID, userID, order) => {
    setOrderID(orderID);
    setUserId(userID);
    setOrder(order);
    setOpen_c(true);
  };
  const handleClose_c = () => {
    setOpen_c(false);
  };
  // ------------------Get factory, customer or owner dropdown from redux----------------//
  const factories = useSelector((state) => state.factory.factories);
  const customers = useSelector((state) => state.customer.customers);
  const owners = useSelector((state) => state.owner.owners);
  const userID = useSelector((state) => state.auth.user);
  // ---------------Get orders history from redux -----------------//
  const ordershistory = useSelector((state) => state.ordershistory.orders_history);
  //------------------Get orders from redux------------//
  const orders_state = useSelector((state) => state.order.orders);

  const onClickTableRow = async (id) => {
    console.log('------', id);
    await getOrdersHistory(id);
    handleClickOpen_h(id);
  };
  //----------------Get Orders History------------//
  useEffect(() => {
    if (ordershistory) {
      setOrderHistory(ordershistory);
    }
  }, [ordershistory]);
  //------------------Get Orders---------------//
  useEffect(() => {
    if (orders_state) {
      setOrders(orders_state);
    }
  }, [orders_state, updateOrder, updateScore]);

  useEffect(() => {
    if (userID) {
      getOrders(userID._id);
    }
  }, [getOrders, userID, updateOrder, updateScore]);
  //-----------------Delete Order-------------//
  const handleOk = () => {
    deleteOrder(orderID);
    handleClose_d();
  };
  /************Table part**************/
  const [order_h] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  return (
    <Box>
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
          <OrderTableHead order_h={order_h} orderBy={orderBy} />
          <TableBody>
            {Array.isArray(orders) &&
              orders.length > 0 &&
              stableSort(orders, getComparator(order_h, orderBy))?.map((order, key) => {
                const isItemSelected = isSelected(order.orderPO);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={key}
                    id={order._id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <Link color="secondary" component={RouterLink} to="">
                        {order.orderPO}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {order.qScore ? (
                        <div style={{ backgroundColor: '#71eb34', width: 'auto', height: '20px', borderRadius: '5px', color: 'white' }}>
                          {t('Completed')}
                        </div>
                      ) : (
                        <div style={{ backgroundColor: '#eb3734', width: 'auto', height: '20px', borderRadius: '5px', color: 'white' }}>
                          {t('NotCompleted')}
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">{order.factory}</TableCell>
                    <TableCell align="center">{order.customer}</TableCell>
                    <TableCell align="center">{order.owner}</TableCell>
                    <TableCell align="center">{order.readyDate?.split('T')[0]}</TableCell>
                    <TableCell align="center">{order.completionDate?.split('T')[0]}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Order History">
                        <IconButton color="primary" onClick={() => onClickTableRow(order._id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Update Order">
                        <IconButton color="primary" onClick={() => handleClickOpen_u(order._id, order)}>
                          <BorderColorIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order">
                        <IconButton color="error" onClick={() => handleClickOpen_d(order._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Completion Order">
                        <IconButton color="success" onClick={() => handleClickOpen_c(order._id, order.userId, order)}>
                          <FactCheckIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ShowAddDialog
        open={open_d}
        handleClose={handleClose_d}
        content={t('DeleteLetter')}
        handleOk={handleOk}
      />
      <ShowHistoryDialog
        open={open_h}
        data={orderHistory}
        handleClose={handleClose_h}
      />
      <ShowUpdateDialog
        open={open_u}
        id={updateId}
        order={order}
        updateOrder={updateOrder}
        addOrderHistory={addOrderHistory}
        factories={factories}
        customers={customers}
        owners={owners}
        handleClose={handleClose_u}
      />
      <ShowCompletionDialog
        open={open_c}
        id={orderID}
        order = {order}
        userId={userId}
        updateScore={updateScore}
        handleClose={handleClose_c}
      />
    </Box>
  );
};
OrderTable.propTypes = {
  getOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  getOrdersHistory: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  addOrderHistory: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  order: state.order
});
export default connect(mapStateToProps, { getOrders, getOrdersHistory, deleteOrder, updateOrder, updateScore, addOrderHistory })(
  OrderTable
);
