import { Grid2, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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


const Companies = ({ setCompany, company }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (loading) {
            axios({ url: 'http://localhost:8000/api/companies', method: 'GET', headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } })
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
                <Grid2 container spacing={2}>
                    {!loading ? data.map((listCompany, i) => {
                        return listCompany.active && (
                            <Grid2 xs={8} key={i}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5">{listCompany.name}</Typography>
                                        <CardActions>
                                            <Button id={listCompany.id} onClick={() => setCompany(listCompany.id)}>Select</Button>
                                            {company == listCompany.id && <FontAwesomeIcon icon={faCheck} />}
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Grid2>)
                    }) : <CircularProgress />}
                </Grid2>
            </div>
        </>
    );
}

export default Companies;
