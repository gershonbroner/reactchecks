import { SetStateAction, useState } from 'react';
import { SketchPicker } from 'react-color';

interface Props {
sendColor : (color:string)=>void   
}
export const PickerColor = ({sendColor}:Props) =>{
const [color, setColor] = useState<string>('#000000');

const handleColorChange = (color: { hex: SetStateAction<string>; }) => {
    setColor(color.hex);
};

    return (
     <div >
    <SketchPicker
        color={color}
        onChangeComplete={handleColorChange}
    />
    <button style={{width:"30px"}} onClick={()=>sendColor(color)}>ok</button>
     </div>
    )
}