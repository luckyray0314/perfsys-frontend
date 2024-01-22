import PropTypes from 'prop-types';
import React from 'react';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase , FormControl, InputLabel} from '@mui/material';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18n from 'i18n/index';
// assets
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const Profile = ({ auth: { isAuthenticated }, logout }) => {
  const { t } = useTranslation();
  const anchorRef = useRef(null);
  const open = false;
  // const [open, setOpen] = useState(false);
  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };
  const [language, setLanguage] = React.useState(i18n.language);
  const handleChange_l = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value)
  }
  const iconBackColorOpen = 'grey.300';
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <FormControl sx={{ m: 1, minWidth: 120}} size="small">
        <InputLabel id="demo-select-small-label">{t("SelectLanguage")}</InputLabel>
        <Select labelId="demo-select-small-label" id="demo-select-small" value={language} label="Age" onChange={handleChange_l}>
          <MenuItem value="en">{t("English")}</MenuItem>
          <MenuItem value="zh">{t("Chinese")}</MenuItem>
        </Select>
      </FormControl>

      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          width: '100px',
          minHeight: '30px',
          marginTop: '10px'
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={logout}
      >
        <LogoutOutlined />
        &nbsp;&nbsp;&nbsp;&nbsp;{t('Logout')}
      </ButtonBase>
    </Box>
  );
};
Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Profile);
