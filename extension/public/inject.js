//retrieve global hook and save in reactdevglobahook variable, used to interact w/react devtools
// console.log('React Dev Tools: ', window.__REACT_DEVTOOLS_GLOBAL_HOOK__);
if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  try {
    const reactDevGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    // store the parsed fiber tree info
    // each element will represent one re-render that has occurred
    let eventList = [];
    
    //recursively parse fiber tree, creates a structured object
    const parseTree = (reactFiberTree) => {
      if (reactFiberTree === null) return null;
      else if (typeof reactFiberTree.elementType === "function") {
        // console.log("In the else if block", reactFiberTree.elementType.name);
        const elemObj = {
          name: reactFiberTree.elementType.name,
          actualDuration: reactFiberTree.actualDuration,
          selfBaseDuration: reactFiberTree.selfBaseDuration,
          child: parseTree(reactFiberTree.child),
          sibling: parseTree(reactFiberTree.sibling),
        };
        return elemObj;
      } else {
        // console.log("In the else block", reactFiberTree.elementType);
        return {
          name: "NFC",
          actualDuration: reactFiberTree.actualDuration,
          selfBaseDuration: reactFiberTree.selfBaseDuration,
          child: parseTree(reactFiberTree.child),
          sibling: parseTree(reactFiberTree.sibling),
        };
      }
    };
    
    //retrieve children for given node
    const getChildren = (tree) => {
      const children = [];
      if (!tree) return children;
      while (tree.sibling) {
        children.push(tree.sibling);
        tree = tree.sibling;
      }
      return children;
    };
    
    //create tree structure from parsed fiber tree
    const parseTreeInTreeStructure = (tree) => {
      if (!tree) return;
      let obj;
      // console.log("parsetree", tree);
      if (tree === null) return null;
      else {
        // console.log("result of invokign getChildren", getChildren(tree));
        if (tree.child) {
          obj = {
            name: tree.name,
            actualDuration: tree.actualDuration,
            selfBaseDuration: tree.selfBaseDuration,
            children: [tree.child, ...getChildren(tree.child)].map((elem) =>
              parseTreeInTreeStructure(elem)
            ),
          };
        } else {
          obj = {
            name: tree.name,
            actualDuration: tree.actualDuration,
            selfBaseDuration: tree.selfBaseDuration,
            children: [...getChildren(tree.child)].map((elem) =>
              parseTreeInTreeStructure(elem)
            ),
          };
        }
        return obj;
      }
    };
    
    //remove nodes w/NFC(non functional component) from child array
    const removeNFCsFromChildArray = (tree) => {
      if (tree.children === null) return null;
      let parsedChildArray = [];
      for (let i = 0; i < tree.children.length; i++) {
        const el = tree.children[i];
        if (el.name === "NFC") {
          parsedChildArray = parsedChildArray.concat(
            removeNFCsFromChildArray({
              name: tree.name,
              actualDuration: tree.actualDuration,
              selfBaseDuration: tree.selfBaseDuration,
              children: el.children,
            })
          );
        } else parsedChildArray.push(el);
      }
      // console.log("Parsed Child Array", parsedChildArray);
      return parsedChildArray;
    };
    
    //removes all nodes w/NFC from tree
    const removeAllNFCs = (tree) => {
      //ASSUMING THAT THE ROOT NODE OF TREE IS NOT A NFC
      const immediateChildren = removeNFCsFromChildArray(tree);
      const actualChildren = immediateChildren.map((child) => {
        return {
          name: child.name,
          actualDuration: child.actualDuration,
          selfBaseDuration: child.selfBaseDuration,
          children: removeAllNFCs(child),
        };
      });
      return actualChildren;
    };
    
    //create final, transformed tree structure
    const final = (tree) => {
      return {
        name: tree.name,
        actualDuration: tree.actualDuration,
        selfBaseDuration: tree.selfBaseDuration,
        children: removeAllNFCs(tree),
      };
    };
    
    //event listener logs message from content script, resets eventList array
    document.addEventListener("CustomEventFromContentScript", function (event) {
      // console.log("Message from content script:", event.detail.message);
      eventList = [];
    });
    
    //create customized oncommitfiber root function, 
    const customOnCommitFiberRoot = (onCommitFiberRoot) => {
      return (...args) => {
        //extract fiberRoot from args
        const fiberRoot = args[1];
        //log info about fiberRoot
        // console.log(
        //   "INJECT.JS: FIBER ROOT FROM THE CUSTOM ONCOMMITFIBERROOT",
        //   fiberRoot
        // );
        // console.log("this is the unparsed tree", fiberRoot.current);
        //parse tree and add to eventList
        eventList.push(
          final(parseTreeInTreeStructure(parseTree(fiberRoot.current)))
        );
        //convert eventList to string
        const eventListStr = JSON.stringify(eventList);
        //send message w/eventList string
        window.postMessage({ type: "EVENT_LIST", eventListStr });
        return onCommitFiberRoot(...args);
      };
    };
    
    //invoke customOnCommitFiberRoot to create custom function and override w/actual one
    reactDevGlobalHook.onCommitFiberRoot = customOnCommitFiberRoot(
      reactDevGlobalHook.onCommitFiberRoot
    );
  } catch (error) {
    console.error("Error in inject.js: ", error);
  }
}