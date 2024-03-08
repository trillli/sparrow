import React from 'react';
import TrSlider from './TrSlider';

interface TrSliderColorPickerProps {
  lightHue: number
  onChange?: Function
  onChangeCommitted?: Function
}

const TrSliderColorPicker: React.FC<TrSliderColorPickerProps> = ({lightHue, onChange, onChangeCommitted}) => {

  // State Variables & Related ------------------------------------------------------------------ //

  // Effects & Related -------------------------------------------------------------------------- //

  // Event Handlers & Related ------------------------------------------------------------------- //

  // Other vars, util functions, etc ------------------------------------------------------------ //

  const styles = {
    track: {
      background: 'white',
      '& .MuiSlider-rail': {
        background: `linear-gradient(90deg, 
          hsl(0, 100%, 50%), 
          hsl(60, 100%, 50%),
          hsl(120, 100%, 50%),
          hsl(180, 100%, 50%),
          hsl(240, 100%, 50%),
          hsl(300, 100%, 50%),
          hsl(360, 100%, 50%))`,
        opacity: 1
      },
      '& .MuiSlider-track': {
        opacity: 0
      },
      '& .MuiSlider-thumb': {
        background: `hsl(${lightHue}, 100%, 50%)`
      }
    },
  };

  return (
    <TrSlider 
      className='light-color-slider'
      value={lightHue} 
      min={0} 
      max={360}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      sx={
        styles.track
      }
      
    />
  );
};

export default TrSliderColorPicker;
