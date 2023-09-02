import React from 'react';
import DatePicker from 'react-native-date-picker';

const DatePickerFrm = ({ value, ...restProps }) => {
    return (
        <DatePicker
            date={value.length === 0 ? new Date : value}
            locale='id-ID'
            confirmText="Ok"
            cancelText="Batal"
            {...restProps}
        />
    );
};

export default DatePickerFrm;