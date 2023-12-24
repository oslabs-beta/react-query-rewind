//custom function to remove circular object error when passing parsedTree to fetch
export const customStringify = (v: any): string => {
  const cache = new Set<any>();
  return JSON.stringify(v, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        // Circular reference found
        try {
          // If this value does not reference a parent, it can be deduped
          return JSON.parse(JSON.stringify(value));
        } catch (err) {
          // Discard key if value cannot be deduped
          return;
        }
      }
      // Store value in our set
      cache.add(value);
    }
    return value;
  });
};

export const saveJSON = (data: any, saveAs: string): void => {
  let stringified = JSON.stringify(data, null, 2);
  let blob = new Blob([stringified], { type: "application/json" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement('a');
  a.download = saveAs + '.json';
  a.href = url;
  a.id = saveAs;
  document.body.appendChild(a);
  a.click();
  document.querySelector('#' + a.id)?.remove();
};

export const sendData = (stringifiedResult: string): void => {
  console.log("clicked on send data and this is what will be sent", stringifiedResult);
  fetch("http://localhost:3000/saveData", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: stringifiedResult
  }).then((response) => {
    // check the response object for result
    console.log('response from backend', response);
    // ...
  });
};



// export const customStringify = (v) => {
//     const cache = new Set();
//     return JSON.stringify(v, function (key, value) {
//       if (typeof value === 'object' && value !== null) {
//         if (cache.has(value)) {
//           // Circular reference found
//           try {
//             // If this value does not reference a parent it can be deduped
//            return JSON.parse(JSON.stringify(value));
//           }
//           catch (err) {
//             // discard key if value cannot be deduped
//            return;
//           }
//         }
//         // Store value in our set
//         cache.add(value);
//       }
//       return value;
//     });
//   };

// export const saveJSON = (data, saveAs) => {
//     let stringified = JSON.stringify(data, null, 2); 
//     let blob = new Blob([stringified], {type: "application/json"});
//     let url = URL.createObjectURL(blob);
    
//     let a = document.createElement('a');
//     a.download = saveAs + '.json';
//     a.href = url;
//     a.id = saveAs;
//     document.body.appendChild(a);
//     a.click();
//     document.querySelector('#' + a.id).remove();
//   } 

// export const sendData = (stringifiedResult) =>{
//     console.log("clicked on send data and this is what will be sent", stringifiedResult)
//     fetch("http://localhost:3000/saveData", {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: stringifiedResult
//   }).then((response) => {
//       // check the response object for result
//       console.log('response from backend', response)
//       // ...
//   });
//   }
  