import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

const Search = () => {
    const [value, setValue] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    return (
        <TextField
            label="Search"
            type="search"
            value={value}
            onChange={onChange}
            variant="standard"
            fullWidth
            sx={{ mb: '1.5rem' }}
        />
    );
};

export default Search;
