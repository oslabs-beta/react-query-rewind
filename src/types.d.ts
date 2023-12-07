export type SubscribeEvent = {
  // structure of subscribe event
};

declare global {
  interface WindowEventMap {
    UpdateUI: CustomEvent;
    TimeTravel: CustomEvent;
  }
}
