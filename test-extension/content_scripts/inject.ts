//retrieve global hook and save in reactdevglobahook variable, used to interact w/react devtools
console.log('INJECT.TS - React Dev Tools: ', window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

// Extend Window interface for TypeScript to recognize custom properties
// Requires dummy export so that typescript treats this as a module
export {};
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      onCommitFiberRoot: (original: Function) => Function;
    };
  }
}

interface TreeNode {
  name: string;
  actualDuration: number;
  selfBaseDuration: number;
  child?: TreeNode | null;
  sibling?: TreeNode | null;
  children?: TreeNode[];
}

let foundTree = false;
const getReactTree = () => {
  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    // console.log("REACT DEVTOOLS NOT DETECTED");
    // window.postMessage({ type: "REACT_DEVTOOLS_NOT_DETECTED"});
  } else {
    console.log('React Dev Tools Detected');
    try {
      const reactDevGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      // store the parsed fiber tree info
      // each element will represent one re-render that has occurred
      let eventList:[] = [];
      
      //recursively parse fiber tree, creates a structured object
      type ParseTreeType = (reactFiberTree: any) => any;
      const parseTree:ParseTreeType = (reactFiberTree: any) => {
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
      type GetChildrenType = (tree: TreeNode|null|undefined) => TreeNode[];
      const getChildren:GetChildrenType = (tree) => {
        const children:any[] = [];
        if (!tree) return children;
        while (tree.sibling) {
          children.push(tree.sibling);
          tree = tree.sibling;
        }
        return children;
      };
      
      //create tree structure from parsed fiber tree
      type ParseTreeInTreeStructureType = (tree: TreeNode | null) => any;
      const parseTreeInTreeStructure:ParseTreeInTreeStructureType = (tree) => {
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
              children: [tree.child, ...getChildren(tree.child)].map((elem: TreeNode) =>
                parseTreeInTreeStructure(elem)
              ),
            };
          } else {
            obj = {
              name: tree.name,
              actualDuration: tree.actualDuration,
              selfBaseDuration: tree.selfBaseDuration,
              children: [...getChildren(tree.child)].map((elem: TreeNode) =>
                parseTreeInTreeStructure(elem)
              ),
            };
          }
          return obj;
        }
      };
      
      //remove nodes w/NFC(non functional component) from child array
      const removeNFCsFromChildArray = (tree:any) => {
        if (tree.children === null) return null;
        let parsedChildArray:any[] = [];
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
      const removeAllNFCs = (tree: TreeNode) => {
        //ASSUMING THAT THE ROOT NODE OF TREE IS NOT A NFC
        const immediateChildren = removeNFCsFromChildArray(tree) || [];
        const actualChildren:any[] = immediateChildren.map((child) => {
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
      type FinalType = (tree: TreeNode) => {name: string, actualDuration: number, selfBaseDuration: number, children: any[]};
      const final: FinalType = (tree) => {
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
      type CustomOnCommitFiberRootType = (onCommitFiberRoot: any) => any;
      const customOnCommitFiberRoot: CustomOnCommitFiberRootType = (onCommitFiberRoot) => {
        return (...args: any) => {
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
            //@ts-ignore
            final(parseTreeInTreeStructure(parseTree(fiberRoot.current)))
          );
          //convert eventList to string
          const eventListStr = JSON.stringify(eventList);
          //send message w/eventList string
          window.postMessage({ type: "tree", eventListStr });
          return onCommitFiberRoot(...args);
        };
      };
      
      //invoke customOnCommitFiberRoot to create custom function and override w/actual one
      reactDevGlobalHook.onCommitFiberRoot = customOnCommitFiberRoot(
        reactDevGlobalHook.onCommitFiberRoot
      );
    } catch (error) {
      // console.error("Error rendering component Tree: ", error);
    }
  }
}

// execute function
getReactTree();