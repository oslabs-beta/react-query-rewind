declare global {
  interface WindowEventMap {
    UpdateUI: CustomEvent;
    TimeTravel: CustomEvent;
  }
}

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};
