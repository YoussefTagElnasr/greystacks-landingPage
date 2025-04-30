import { Slider } from '@mui/material';
import styles from "./CustomSlider.module.css";
import { useState } from 'react';
function valuetext(value) {
    return `${value}`;
}

const MultiOptionCustomSlider = ({title, marks, value = 0, type, style}) => {
    const color = ["rgba(4,255,0,1)", "rgba(255,226,0,1)", "rgba(255,0,0,1)"];
    const [colorIndex, setColorIndex] = useState(0);
    const getDynamicStyles = (value) => { // static needs change
        const dynamicStyles = {
            '& .MuiSlider-markLabel[data-index="0"]': {
                color: value === 0 ? '#00b050' : "black",
            },
            '& .MuiSlider-markLabel[data-index="1"]': {
                color: value === 1 ? '#00b050' : "black",
            },
            '& .MuiSlider-markLabel[data-index="2"]': {
                color: value === 2 ? '#00b050' : "black",
            },
        };
        return dynamicStyles;
    };
    const changeColor = (marks) => { // static needs change
        const dynamicStyles = {
            '& .MuiSlider-rail': {
                background:  marks[0].label === "CI" ? "linear-gradient(90deg, rgba(4,255,0,1) 0%, rgba(255,226,0,1) 35%, rgba(255,0,0,1) 100%)" : '#00b04f7a'
            },
            '& .MuiSlider-track': {
                background:  marks[0].label === "CI" ? color[colorIndex] : '#00b04f7a',
                border: "none"
            },
        };
        return dynamicStyles;
    };
    return (
        <div className={styles.SliderInfo} style={style}>
            <h4 style={!title ? {marginTop:"5px"}: null}>{type}</h4>
        <div className={styles.Slider}>
            <h4>{title}</h4>
            <Slider
            onChange={(e) => setColorIndex(e.target.value)}
            aria-label="Custom marks"
            defaultValue={value}
            min={0}
            max={marks.length - 1}
            getAriaValueText={valuetext}
            step={0}
            valueLabelDisplay="auto"
            marks={marks}
            sx={{
                color: 'green',
                '& .MuiSlider-rail': {
                    backgroundColor: '#00b04f7a',
                },
                '& .MuiSlider-track': {
                    backgroundColor: '#00B050',
                    border: "none"
                },
                '& .MuiSlider-thumb': {
                    backgroundColor: '#0070C0', 
                },
                '& .MuiSlider-valueLabel': {
                    display:"none"
                },
                ...getDynamicStyles(value),
                ...changeColor(marks)
            }}
            />
        </div>
    </div>
    );
};

export default MultiOptionCustomSlider;