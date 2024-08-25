// src/pages/About.js

import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.goat1000.com/tagcanvas.min.js';
    script.onload = () => {
      if (window.TagCanvas) {
        try {
          window.TagCanvas.Start('myCanvas', 'tags', {
            textColour: '#1E90FF', // Default blue color
            outlineColour: '#ff00ff',
            reverse: true,
            depth: 0.3,
            maxSpeed: 0.02,
            wheelZoom: false,
            weight: true,
            weightFrom: 'data-weight',
            textHeight: 8,
            radiusX: 0.5,
            radiusY: 0.5,
            radiusZ: 0.5,
          });

          // Force specific words to be orange
          setTimeout(() => {
            const tags = document.querySelectorAll("#tags a");
            tags.forEach(tag => {
              const text = tag.innerText;
              if (
                text === "Project Management" ||
                text === "AICPA-IFRS" ||
                text === "IFC" ||
                text === "IIM-C EPGM" ||
                text === "MBA"
              ) {
                tag.style.color = '#FFA500'; // Force orange color
              }
            });
          }, 500); // Delay to ensure the canvas is rendered before applying styles

        } catch (e) {
          console.log('Canvas error:', e);
        }
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="about-container">
      <canvas id="myCanvas" width="750" height="750" style={{ marginLeft: '200px' }}>
        <p>Anything in here will be replaced on browsers that support the canvas element</p>
      </canvas>
      <div id="tags">
        <ul>
          <li><a href="#" data-weight="40">Python</a></li>
          <li><a href="#" data-weight="55">IFRS</a></li>
          <li><a href="#" data-weight="45">Tax</a></li>
          <li><a href="#" data-weight="50">DCF</a></li>
          <li><a href="#" data-weight="45">Finance</a></li>
          <li><a href="#" data-weight="40">Accounting</a></li>
          <li><a href="#" data-weight="30">Tech</a></li>
          <li><a href="#" data-weight="30">CSS</a></li>
          <li><a href="#" data-weight="25">JS</a></li>
          <li><a href="#" data-weight="35">SQL</a></li>
          <li><a href="#" data-weight="30">Project Management</a></li> {/* Orange color */}
          <li><a href="#" data-weight="40">AICPA-IFRS</a></li> {/* Orange color */}
          <li><a href="#" data-weight="40">IFC</a></li> {/* Orange color */}
          <li><a href="#" data-weight="50">IIM-C EPGM</a></li> {/* Orange color */}
          <li><a href="#" data-weight="35">MBA</a></li> {/* Orange color */}
        </ul>
      </div>
    </div>
  );
};

export default About;
