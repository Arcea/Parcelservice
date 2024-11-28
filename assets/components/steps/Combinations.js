import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const Combinations = ({ setCombination, combination, product }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);

    return (
        <>
            <div className="mt-3">
                <FormControl fullWidth>
                    <InputLabel id="combination-select-label">Combination</InputLabel>
                    <Select labelId="combination-select-label" onChange={({ target }) => setCombination(target.value)} label="Product">
                        {product.combinations.map((listCombination, i) => {
                            return (<MenuItem key={i} value={listCombination.id}>{listCombination.name}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </div>
        </>
    );
}

export default Combinations;
