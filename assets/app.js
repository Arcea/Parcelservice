/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from './components/steps/Companies';
import Header from './components/header/Header';
import StepForm from './components/StepForm';
import Form from './components/Form';

class App extends Component {
    render() {

        const theme = createTheme({
            palette: {
                primary: {
                    main: '#212121'
                }
            }
        });


        return (
            <ThemeProvider theme={theme}>
                <Header />
                <Container>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Companies />} />
                            <Route path="/test" element={<Form />} />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>

        )
    }
}

createRoot(document.getElementById('root')).render(<App />);