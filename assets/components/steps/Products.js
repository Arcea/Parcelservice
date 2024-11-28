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


const Products = ({ setProduct, product, company }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (loading) {
            axios({ url: `http://localhost:8000/api/companies/${company}/products`, method: 'GET', headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } })
                .then(function (response) {
                    setLoading(false);
                    setData(response.data.data);
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
    })

    return (
        <>
            <div className="mt-3">
                <FormControl fullWidth>
                    <InputLabel id="product-select-label">Product</InputLabel>
                    <Select labelId="product-select-label" onChange={({ target }) => setProduct(target.value)} label="Product">
                        {!loading ? data.map((listProduct, i) => {
                            return (<MenuItem key={i} value={listProduct}>{listProduct.name}</MenuItem>)
                        }) : <CircularProgress />}
                    </Select>
                </FormControl>
            </div>
        </>
    );
}

export default Products;
