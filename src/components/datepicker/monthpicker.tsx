import React from 'react';
import DatePicker from './datepicker';

function MonthPicker(props) {
  return <DatePicker showMonthYearPicker dateFormat="MMMM yyyy." {...props} />;
}

export default MonthPicker;
