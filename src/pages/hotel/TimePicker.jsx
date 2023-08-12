import React, { useState } from 'react';
import moment from 'moment';

const TimePicker = ({ label, value, onChange }) => {
  const [hours, setHours] = useState(moment(value, 'HH:mm').format('HH'));
  const [minutes, setMinutes] = useState(moment(value, 'HH:mm').format('mm'));

  const handleHourChange = (event) => {
    const newHours = event.target.value;
    setHours(newHours);
    onChange(moment(`${newHours}:${minutes}`, 'HH:mm').toISOString());
  };

  const handleMinuteChange = (event) => {
    const newMinutes = event.target.value;
    setMinutes(newMinutes);
    onChange(moment(`${hours}:${newMinutes}`, 'HH:mm').toISOString());
  };

  return (
    <div>
      <h3 className="mt-2 -mb-1">{label}</h3>
      <div className="flex">
        <select value={hours} onChange={handleHourChange} className="mr-1">
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <option key={hour} value={hour.toString().padStart(2, '0')}>
              {hour.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
        <span className="mr-1">:</span>
        <select value={minutes} onChange={handleMinuteChange}>
          {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
            <option key={minute} value={minute.toString().padStart(2, '0')}>
              {minute.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker