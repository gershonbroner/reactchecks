import React, { useState } from "react";

type NodeStructure = {
  [key: string]: NodeStructure | null;
};

const Node: React.FC<{
  id: string;
  children: NodeStructure | null;
  addChild: (id: string) => void;
  mydelete: (id: string) => void;
}> = ({ id, children, addChild, mydelete }) => {
  return (
    <div>
      <div
        onClick={() => addChild(id)}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "lightblue",
          margin: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        {id}
      </div>
      <button
        onClick={() => {
          mydelete(id);
        }}
      >
        OK
      </button>
      {children && (
        <div style={{ marginLeft: "20px" }}>
          {Object.keys(children).map((childId) => (
            <Node
              key={childId}
              id={childId}
              children={children[childId]}
              addChild={addChild}
              mydelete={mydelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const AppE = () => {
  const [nodes, setNodes] = useState<NodeStructure>({ root: null });
  const [idCounter, setIdCounter] = useState<number>(1);
  const generateUniqueId = () => {
    const newId = `node-${idCounter}`;
    setIdCounter(idCounter + 1);
    return newId;
  };

  const addChild = (id: string) => {
    setNodes((prevNodes) => {
      const newNodes = { ...prevNodes };

      const addNode = (obj: NodeStructure, targetId: string): boolean => {
        if (obj[targetId] !== undefined) {
          const newId = generateUniqueId();
          obj[targetId] = obj[targetId] || {};
          obj[targetId]![newId] = null;
          return true;
        }

        for (const key in obj) {
          if (obj[key] && addNode(obj[key] as NodeStructure, targetId)) {
            return true;
          }
        }
        return false;
      };
      addNode(newNodes, id);
      return newNodes;
    });
  };
 

  const mydelete = (id: string) => {

   
    
    setNodes((prev)=>{
    const newNodes = { ...prev };
    const d = (obj: any, id: string) => {
      if (obj[id] !== undefined) {
      delete obj[id];
      return true
    }

    
    for(const key in obj){
     if(obj[key]&&d(obj[key] as NodeStructure,id))return true
    }
    return false
    }
    d(newNodes.root,id)
    return newNodes
    })
     
      };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      <Node
        id="root"
        children={nodes.root}
        addChild={addChild}
        mydelete={mydelete}
      />
    </div>
  );
};
export default AppE;
