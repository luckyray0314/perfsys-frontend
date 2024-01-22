import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  // FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { UseSelector } from '../../../../node_modules/react-redux/es/hooks/useSelector';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { login } from 'actions/auth';
import { setEnvLanguage } from 'actions/auth';
import ShowSnackbar from 'layout/Component/alert';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ login, setEnvLanguage, isAuthenticated }) => {
  const alertInfo = useSelector((state) => state.alert);
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(email, password);
  };
  if (isAuthenticated) {
    return <Navigate to="/customerManage" />;
  }
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  name="password"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              {/*  */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me sign in</Typography>}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Formik>
      <ShowSnackbar open={alertInfo[0]?.open} content={alertInfo[0]?.msg} type={alertInfo[0]?.alertType} /> 
    </>
  );
};
AuthLogin.propTypes = {
  login: PropTypes.func.isRequired,
  setEnvLanguage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login, setEnvLanguage })(AuthLogin);
