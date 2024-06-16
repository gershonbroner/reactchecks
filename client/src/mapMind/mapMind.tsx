import { useCallback, useEffect, useState } from "react";

import { FaLongArrowAltRight } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { PickerColor } from "./PickerColor";
import { AiOutlineBgColors } from "react-icons/ai";

export interface StructureMap {
  [key: string]: StructureMap | null;
}

interface Props {
  term: string;
  obj: StructureMap | null;
  addTerm: (id: string, term: string) => void;
  deleteOrSetTerm: (termTarget: string) => void;
}

interface MapMindProps {
  mainTerm: string;
}

const Term = ({ term, obj, addTerm, deleteOrSetTerm }: Props) => {
  console.log(term);

  const [choosecolor, setChooseColor] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newTerm, setNewTerm] = useState<string>("");
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("white");

  const correctColor = useCallback((color: string) => {
    setColor(color);
    setChooseColor(false);
  }, []);

  const HandleTerm = useCallback(() => {
    if (newTerm.trim() === "") {
      alert("Term cannot be empty");
      return;
    }
    addTerm(term, newTerm);
    setNewTerm("");
    setIsInputOpen(false);
    setIsOpen(true);
  }, [term, addTerm, newTerm]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          onClick={() => {
            setIsInputOpen(!isInputOpen);
          }}
          style={{ border: "none", background: "white" }}
        >
          <TbPointFilled />
        </button>
        <div
          style={{
            background: `${color}`,
            borderRadius: "10px ",
            marginBottom: "5px",
          }}
          onClick={() => deleteOrSetTerm(term)}
        >
          {term}
        </div>
        {obj && (
          <button
            style={{ border: "none", color: "green", background: "white" }}
            onClick={() => {
              setChooseColor(!choosecolor);
            }}
          >
            <AiOutlineBgColors />
          </button>
        )}
        {obj && (
          <button
            style={{ border: "none", background: "white" }}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FaLongArrowAltRight />
          </button>
        )}
      </div>
      {choosecolor ? (
        <div style={{ zIndex: "auto", position: "absolute" }}>
          <PickerColor sendColor={correctColor} />
        </div>
      ) : (
        ""
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "100px",
          marginTop: "20px",
          justifyContent: "space-around",
        }}
      >
        {isOpen &&
          obj &&
          Object.keys(obj).map((key: string) => {
            return (
              <Term
                key={key}
                term={key}
                obj={obj[key]}
                addTerm={addTerm}
                deleteOrSetTerm={deleteOrSetTerm}
              />
            );
          })}
      </div>
      {isInputOpen && (
        <div>
          <input
            type="text"
            size={newTerm ? newTerm.length : 20}
            onChange={(e) => setNewTerm(e.target.value)}
            style={{ border: "none", borderBottom: "2px solid" }}
          ></input>
          <button
            onClick={HandleTerm}
            style={{ border: "none" }}
            aria-label="Submit new sub-term"
          >
            <TbPointFilled />
          </button>
        </div>
      )}
    </div>
  );
};

const MapMind = ({ mainTerm }: MapMindProps) => {
  const [baseObj, setObj] = useState<StructureMap>(() => {
    const saved = localStorage.getItem(mainTerm);
    const initialValue = saved ? JSON.parse(saved) : { [mainTerm]: null };
    return initialValue;
  });

  const deleteOrSetTerm = (termTarget: string) => {
    setObj((prevObj) => {
      const newObj = { ...prevObj };
      const deleteOrSet = (obj: StructureMap, term: string) => {
        if (obj[term] !== undefined) {
          delete obj[term];
          return true;
        }
        for (const key in obj) {
          if (obj[key] !== null && deleteOrSet(obj[key]!, term)) {
            return true;
          }
        }
        return false;
      };
      deleteOrSet(newObj, termTarget);
      return newObj;
    });
  };
  const addTerm = useCallback((idTarget: string, term: string) => {
    setObj((prevObj) => {
      const newObj = { ...prevObj };

      const add = (
        obj: StructureMap,
        idTarget: string,
        newTerm: string
      ): boolean => {
        if (obj[idTarget] !== undefined) {
          if (!obj[idTarget]) {
            obj[idTarget] = {};
          }
          obj[idTarget]![newTerm] = null;
          return true;
        }
        for (const key in obj) {
          if (obj[key] !== null && add(obj[key]!, idTarget, newTerm)) {
            return true;
          }
        }
        return false;
      };

      add(newObj, idTarget, term);
      return newObj;
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(mainTerm, JSON.stringify(baseObj));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [baseObj, mainTerm]);

  return (
    <>
      <Term
        term={mainTerm}
        obj={baseObj[mainTerm]}
        addTerm={addTerm}
        deleteOrSetTerm={deleteOrSetTerm}
      />
    </>
  );
};

export default MapMind;
