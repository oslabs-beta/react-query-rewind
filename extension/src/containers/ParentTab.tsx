import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ParentTabsProps } from "../types";
import CustomTabPanel from "../components/CustomTabPanel";
import a11yProps from "../functions/a11yProps";
import TreeTab from "./TreeTab";
import QueriesTab from "./QueriesTab";

const ParentTab = ({
  queryEvents,
  selectedQueries,
  handleSelectionChange,
  devToolsPort,
  treeData,
}: ParentTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //state for navigating between tree and charts
  const [profilingStatus, setProfilingStatus] = useState<boolean>(false);

  function sendMessageToContentScript(profilingEnabled: boolean) {
    // only send message if devToolsPort is available and profiling is enabled
    if (devToolsPort && profilingEnabled) {
      devToolsPort.postMessage({
        type: "profiling-status",
        payload: profilingEnabled,
      });
    }
  }
  const toggleProfiling = () => {
    console.log("toggleProfiling clicked");
    const newProfilingStatus = !profilingStatus;
    setProfilingStatus(newProfilingStatus);
    sendMessageToContentScript(newProfilingStatus);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", height: "3rem" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="QUERIES" {...a11yProps(0)} />
          <Tab label="COMPONENT TREE" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <Box
        sx={{ flexGrow: 1, height: "calc(100vh - 3rem)", paddingTop: "0.5rem" }}
      >
        <CustomTabPanel value={value} index={0}>
          <QueriesTab
            selectedQueries={selectedQueries}
            queryEvents={queryEvents}
            handleSelectionChange={handleSelectionChange}
            devToolsPort={devToolsPort}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <TreeTab
            treeData={treeData}
            toggleProfiling={toggleProfiling}
            profilingStatus={profilingStatus}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default ParentTab;
