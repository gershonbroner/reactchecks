import { useEffect, useState } from "react"
import MapMind from "./mapMind/mapMind"

const App =  () => {
  
 
  useEffect(()=>{

    setTerms( () =>{
      const data:any = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = key&&localStorage.getItem(key);
        if (key && value) {
          data[key] = value;
        }
      }
     return data&&Object.keys(data)
    }

    ) },[])
  const [terms,setTerms]=useState<string[]>([])
  const [input,setInput] = useState<string>("") 
  const createNerwMap = () => {
   if(input!==""){
    setTerms([...terms,input])
    setInput("")
   }
   return;
  }
  return (
    <div  translate="no">
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={createNerwMap}>create</button>
    {
    terms.map((term)=>{
    return (
    <div  key={term}>
     <MapMind mainTerm={term}/>
    <div style={{borderBottom:" dashed red"}}/> 
    </div>
    )
    })
    }

    </div>
  )
 }
export default App