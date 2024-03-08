import saveSelectedQueryKeys from "../src/functions/saveSelectedQueryKeys";

// Based on: https://elvisciotti.medium.com/create-a-working-chrome-storage-your-chrome-edge-browser-extension-during-testing-with-jest-071d69fcf8a1

// mock chrome extension get and set functions
let localStorage: any = {
  thisSessionsQueries: undefined,
  selectedQueries: undefined
};

global.chrome = {
  storage: {
    local: {
      clear: () => {
        localStorage = {
          thisSessionsQueries: undefined,
          selectedQueries: undefined
        }
      },
      // set takes in obj with key thisSessionsQueries or selectedQueries and the value that will be stored
      set: (newValue: any) => { 
        localStorage = { ...localStorage, ...newValue };
      },
      // get returns a promise that resolves to an object with key value pairs 
      get: (key: any) => {
        return Promise.resolve({ [key]: localStorage[key] });
      }
    },
  }
} as unknown as typeof chrome;


describe('saveSelectedQueryKeys basic tests', () => {
  // clear info stored in mock function calls and their arrays 
  beforeEach(() => {
    chrome.storage.local.clear();
  });

  it('should set storage to empty array when queries is an empty array and no previous data is stored', async () => {
    await saveSelectedQueryKeys([]);

    expect(localStorage).toEqual({
      thisSessionsQueries: [],
      selectedQueries: []
    });
  })

  it('should set storage to when passed an array with an queryKey in it', async () => {
    await saveSelectedQueryKeys(['[queryKeyTest]'])

    expect(localStorage).toEqual({
      thisSessionsQueries: ['[queryKeyTest]'],
      selectedQueries: ['[queryKeyTest]']
    });
  })
});