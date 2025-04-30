import { Slider } from '@mui/material';
import styles from "./CustomSlider.module.css";
function valuetext(value) {
    return `${value}`;
}

const YesNoCustomSlider = ({ value = 0, title }) => {
    const getDynamicStyles = (value) => {
        const dynamicStyles = {
            '& .MuiSlider-markLabel[data-index="0"]': {
                color: value === 0 ? '#00b050' : "black",
            },
            '& .MuiSlider-markLabel[data-index="1"]': {
                color: value === 1 ? '#00b050' : "black",
            },
        };
        return dynamicStyles;
    };

    return (
        <div className={styles.questions}>
            <h4>{title}</h4>
            <Slider
                aria-label="Custom marks"
                defaultValue={value}
                min={0}
                max={1}
                getAriaValueText={valuetext}
                step={0}
                valueLabelDisplay="auto"
                marks={[
                    {
                        value: 0,
                        label: 'No',
                    },
                    {
                        value: 1,
                        label: 'Yes',
                    },
                ]}
                sx={{
                    color: 'green',
                    width: "50%",
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
                }}
            />
        </div>
    );
};

export default YesNoCustomSlider;
