import React from 'react';
import DatePicker from './datepicker';

function MonthPicker(props: any) {
  return <DatePicker showMonthYearPicker dateFormat="MMMM yyyy." {...props} />;
}

export default MonthPicker;
