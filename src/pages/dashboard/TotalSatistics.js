import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SatisticsPage from './SatisticsPage';
import OrderPage from './OrderPage';
import OrderPage1 from './OrderPage1';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DvrIcon from '@mui/icons-material/Dvr';
import { useTranslation } from 'react-i18next';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("ScoreAnalysis")} icon = {<AnalyticsIcon/>} iconPosition="start" sx={{fontSize: "20px", fontFamily: "serif", marginTop: "30px"}} {...a11yProps(0)} />
          <Tab label={t("OrderAnalysis")} icon = {<DvrIcon/>} iconPosition="start" sx={{fontSize: "20px", fontFamily: "serif", marginTop: "30px"}} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SatisticsPage/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OrderPage1/>
        <OrderPage/>
      </CustomTabPanel>
    </Box>
  );
}
