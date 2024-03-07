// component prop types

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type BasicTabsProps = {
  selectedQueries: string[];
  queryEvents: QueryEvent[];
};

export type ParentTabsProps = {
  queryEvents: QueryEvent[];
  selectedQueries: string[];
  handleSelectionChange: (queries: string[]) => void;
  devToolsPort: chrome.runtime.Port | null;
};

export type QueryTabProps = {
  selectedQueries: string[];
  queryEvents: QueryEvent[];
  handleSelectionChange: (queries: string[]) => void;
  devToolsPort: chrome.runtime.Port | null;
};

export type DataTabProps = {
  queryDisplay: QueryDisplay[][];
  currentIndex: number;
};

export type SliderSectionProps = {
  queryDisplay: QueryDisplay[][];
  currentIndex: number;
  setCurrentIndex: (selected: number) => void;
  handleAutoPlay: () => void;
  selectedQueries: string[];
  isPlaying: boolean;
};

export type JsonFormatterType = {
  jsonData: JsonDataType;
  queryKey: string;
  expandNodesFunc?: ExpandNodesFuncType; // this should be required but getting errors when it's not
};

export type JsonDiffType = {
  oldJson?: JsonDataType | string; // optional in case you're on first state
  currentJson: JsonDataType | string; // or string since state gets initialized to an empty string
  isHidden: boolean;
};

// variable types
export type QueryEvent = {
  eventType: string;
  queryKey: string[];
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

export type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};

export type JsonDataType = {
  [key: string]: any;
};

// function types

export type ExpandNodesFuncType = (
  keyPath: ReadonlyArray<string | number>,
  value: any,
  layer: number
) => boolean;
