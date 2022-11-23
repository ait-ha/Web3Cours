import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Admin from "./components/Admin";
import Proposal from "./components/Proposal";
import useEth from "./contexts/EthContext/useEth";
import { EthProvider } from "./contexts/EthContext";

function TabPanel(props) {
  const { children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <EthProvider>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="ADMIN" {...a11yProps(0)} />
          <Tab label="VOTER" {...a11yProps(1)} />
    
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
 
      <div id="App" >
        <div className="container">
         
          <Admin />
          <hr />
         
        </div>
      </div>
  
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Proposal />
      </TabPanel>
      
    </Box>
    </EthProvider>
  );
}