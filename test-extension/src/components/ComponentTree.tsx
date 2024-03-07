import React, { useCallback, useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "../css/styles.css";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import {
  customStringify,
  sendData,
  saveJSON,
} from "../functions/treeHelperFuncs";

interface ComponentTreeProps {
  fiberTree: any; // Replace 'any' with the actual type of fiberTree
}

function ComponentTree({ fiberTree }: ComponentTreeProps) {
  // set up a centered tree visualization
  const useCenteredTree = (
    defaultTranslate: { x: number; y: number } = { x: 0, y: 0 }
  ) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const [dimensions, setDimensions] = useState<
      { width: number; height: number } | undefined
    >();

    const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 12 });
      }
    }, []);

    return [dimensions, translate, containerRef] as const;
  };
  const [dimensions, translate, containerRef] = useCenteredTree();

  return (
    <>
      {fiberTree ? (
        <div style={{ width: "100%", height: "100%" }}>
          <IconButton
            aria-label="delete"
            onClick={() => saveJSON(fiberTree, "parseTreeData")}
          >
            <DownloadIcon />
          </IconButton>
          <div
            id="treeWrapper"
            style={{
              width: "100%",
              height: "100%",
            }}
            ref={containerRef}
          >
            <Tree
              data={fiberTree}
              orientation="vertical"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              enableLegacyTransitions
              translate={translate}
            />
          </div>
        </div>
      ) : (
        <>
          <p>
            Component Trees are currently only available for React applications using React Dev Tools
          </p>
          <p>Ensure React Dev Tools are installed and running.</p>
        </>
      )}
    </>
  );
}

export default ComponentTree;
