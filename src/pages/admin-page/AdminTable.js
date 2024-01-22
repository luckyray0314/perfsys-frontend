import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from 'actions/auth';
import { deleteUser } from 'actions/auth';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DeleteModal from './DeleteModal';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(200 200 200)',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const AdminTable = ({ getUsers, deleteUser }) => {
  const { t } = useTranslation();
  const users_state = useSelector((state) => state.auth.users);
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [user_id, setUser_Id] = React.useState();
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);
  React.useEffect(() => {
    setUsers(users_state);
  }, [users_state]);
  const handleDelete = (id) => {
    setOpen(true);
    setUser_Id(id)
  }
  const handleOk = () => {
    deleteUser(user_id);
    setOpen(false);
  }
  const handleClose =() => {
    setOpen(false);
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">{t('FirstName')}</StyledTableCell>
            <StyledTableCell align="center">{t('LastName')}</StyledTableCell>
            <StyledTableCell align="center">{t('EmailAddress')}</StyledTableCell>
            <StyledTableCell align="center">{t('Company')}</StyledTableCell>
            <StyledTableCell align="center">{t('Operation')}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody align="center">
          {users.length > 0 ? (
            users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" align="center" scope="row">
                  {user.firstname}
                </StyledTableCell>
                <StyledTableCell align="center">{user.lastname}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.company}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Delete User">
                    <IconButton edge="end" onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <h3 style={{ color: 'rgb(150 150 150)' }}>Search result is empty!</h3>
          )}
        </TableBody>
      </Table>
      <DeleteModal
        open = {open}
        handleOk = {handleOk}
        handleClose = {handleClose}
        content = {t('DeleteUser')}
      />
    </TableContainer>
  );
};
AdminTable.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};
export default connect(null, { getUsers, deleteUser })(AdminTable);
