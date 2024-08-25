// src/pages/Projects.js

import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>

      <div className="project">
        <h2><a href="https://financetools.streamlit.app/" target="_blank" rel="noopener noreferrer">Financial Calculators</a></h2>
        <p>Financial Calculator App built with Streamlit! This app offers a set of interactive tools designed to help you easily calculate and visualize your financial investments and loan repayments.</p>
      </div>

      <div className="project">
        <h2><a href="https://ifrsassistant.streamlit.app/" target="_blank" rel="noopener noreferrer">IFRS Assistant</a></h2>
        <p>IFRS Assistant designed to handle any IFRS-related queries, providing instant and accurate responses.</p>
      </div>

      <div className="project">
        <h2><a href="https://stockforecast-vik.streamlit.app/" target="_blank" rel="noopener noreferrer">NSE Stock Forecast App</a></h2>
        <p>The Indian Stock Forecast App is an application developed to predict the future stock price of NIFTY 50 companies, based on the Prophet time series model. An app that allows one to choose any stock out of the NIFTY 50 index, get a brief about the company, and generate a forecast of up to 4 years.</p>
      </div>
    </div>
  );
};

export default Projects;
