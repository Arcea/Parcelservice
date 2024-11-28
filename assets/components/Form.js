import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
import Companies from './steps/Companies';
import Brands from './steps/Brands';
import Products from './steps/Products';
import Divider from '@mui/material/Divider';
import Combinations from './steps/Combinations';


const Form = () => {

    const [company, setCompany] = useState(null);
    const [brand, setBrand] = useState(null);
    const [product, setProduct] = useState(null);
    const [combination, setCombination] = useState(null);

    const sendData = () => {
        axios.post('http://localhost:8000/api/shipment', {
            company: company,
            brand: brand,
            product: product.id,
            combination: combination
        }, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    return (
        <>
            <h4>Step 1: Choose your company</h4>
            <div className="mt-3">
                <Companies company={company} setCompany={setCompany} />
            </div>
            {company !== null &&
                <>
                    <Divider />
                    <h4>Step 2: Choose your brand</h4>
                    <div className="mt-3">
                        <Brands company={company} setBrand={setBrand} brand={brand} />
                    </div>
                </>
            }
            {company !== null && brand !== null &&
                <>
                    <Divider />
                    <h4>Step 3: Choose your product</h4>
                    <div className="mt-3">
                        <Products company={company} setProduct={setProduct} product={product} />
                    </div>
                </>
            }
            {company !== null && brand !== null && product !== null &&
                <>
                    <Divider />
                    <h4>Step 4: Choose your combination</h4>
                    <div className="mt-3">
                        <Combinations combination={combination} setCombination={setCombination} product={product} />
                    </div>
                </>
            }

            {company !== null && brand !== null && product !== null && combination !== null &&
                <>
                    <Divider />
                    <div className="mt-3">
                        <Button onClick={sendData}>Receive PDF</Button>
                    </div>
                </>
            }
        </>
    );
}

export default Form;
