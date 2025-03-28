import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SpeedTest from '@cloudflare/speedtest';
import './styles/App.css';

function App() {
  const [ downloadSpeed, setDownloadSpeed ] = useState(null);
  const [ uploadSpeed, setUploadSpeed ] = useState(null);
  const [ ping, setPing ] = useState(null);
  const [ testProgress, setTestProgress ] = useState(0);
  const [ testRunning, setTestRunning ] = useState(false);
  const [ currentStep, setCurrentStep ] = useState('');
  const [ ispInfo, setIspInfo ] = useState(null);
  const [ serverInfo, setServerInfo ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  const proxyUrl = `${process.env.REACT_APP_BACKEND_URL}/proxy/` || 'https://speed-tester-api.vercel.app/proxy';

  async function getISPInfo() {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const userIp = ipResponse.data.ip;

      const locationResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ipinfo`, {
        ip: userIp
      });

      const { latitude, longitude, isp, location } = locationResponse.data;
      return { latitude, longitude, isp, location };
    } catch (error) {
      console.error('Error fetching ISP info:', error);
      return null;
    }
  }

  async function getServers() {
    try {
      const targetUrl = 'https://www.speedtest.net/api/js/servers?engine=js';
      const encodedTargetUrl = encodeURIComponent(targetUrl);
      const response = await axios.get(`${proxyUrl}${encodedTargetUrl}`);
      return response.data;
    } 
    catch (error) {
      console.error('Error fetching servers:', error);
      return [];
    }
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  async function getClosestServers(userLocation, servers) { 
    const { latitude, longitude } = userLocation;
    servers.forEach(server => {
      server.distance = calculateDistance(latitude, longitude, server.lat, server.lon);
    });
    servers.sort((a, b) => a.distance - b.distance);
    return servers.slice(0, 5);
  }

  useEffect(() => {
    const fetchISPandServerInfo = async () => {
      try {
        const userLocation = await getISPInfo();
        setIspInfo(userLocation);

        // Fetch servers and filter by closest to user location
        const servers = await getServers();
        const closestServers = await getClosestServers(userLocation, servers);
        const closestServer = closestServers[0];
        setServerInfo(closestServer)

        setLoading(false);
      } 
      catch (err) {
        console.error('Error fetching server info:', err);
        setLoading(false);
      }
    };

    fetchISPandServerInfo();
  }, []);

  const runSpeedTest = async () => {
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setTestRunning(true);
    setTestProgress(0);
    setCurrentStep('Establishing connection to server');

    try {
      const speedTest = new SpeedTest();
      speedTest.onResultsChange = ({ type }) => {
        setTestProgress(prev => {
          let newProgress = prev;
          if (type === 'latency') {
            newProgress = Math.min(prev + 0.25, 100);
          }
          else if (type === 'download') {
            newProgress = Math.min(prev + 0.55, 100);
          }
          else if (type === 'upload') {
            newProgress = Math.min(prev + 0.7, 100);
          }
          else if (type == 'packetLoss') {
            newProgress = Math.min(prev + 0.01, 100);
          }

          if (newProgress <= 2) {
            setCurrentStep('Establishing connection to server');
          }
          else if (newProgress <= 6) {
            setCurrentStep('Measuring latency.');
          }
          else if (newProgress <= 60) {
            setCurrentStep('Testing download speed.');
          }
          else {
            setCurrentStep('Testing upload speed');
          }

          return newProgress;
        });
      };
      speedTest.onFinish = results => {
        const summary = results.getSummary();
        setDownloadSpeed((summary.download / 1_000_000).toFixed(1));
        setUploadSpeed((summary.upload / 1_000_000).toFixed(1));
        setPing(summary.latency.toFixed(1));
        setTestRunning(false);
        setTestProgress(100);
        setCurrentStep('Test complete!');
      }
    } catch (error) {
      console.error('Error running speed test:', error);
      alert('Failed to run speed test');
      setTestRunning(false);
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    const link = event.target;
    link.classList.add('animate');
    setTimeout(() => {
      link.classList.remove('animate');
    }, 300); // Duration of the animation
  };

  return (
    <Router basename="/SpeedTester">
      <div className="app">
        <nav className="navbar">
          <div className="left-navbar">
            <a href="/SpeedTester" className="navbar-link">
              <img src={`${process.env.PUBLIC_URL}/img/speedtester-round.png`} alt="Logo" className="navbar-logo" />
              <span className="title navbar-title">SpeedTester</span>
            </a>
          </div>
          <div className="dropdown">
            <img src={`${process.env.PUBLIC_URL}/img/login.png`} alt="Person Icon" className="person-icon" />
            <div className="dropdown-content">
              <a href="#" className="login-link" onClick={handleLoginClick}>
                Login (Coming Soon)
              </a>
              <a href="https://github.com/giovanni-rojas/SpeedTester" target="_blank" rel="noopener noreferrer">
                See Code
              </a>
              <a href="https://giovanni-rojas.github.io/" target="_blank" rel="noopener noreferrer">
                About
              </a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="speedtest-container">
                {!testRunning ? (
                  <>
                    <button className="start-button" onClick={runSpeedTest}>
                      <span className="start-text">Run Test!</span>
                    </button>
                    {!loading && serverInfo && (
                      <div className='info-wrapper'>
                        <div className="info-container info-container-running">
                          <div className="isp-info">
                            <div className="icon-text">
                              <p className="name">{ispInfo.isp}</p>
                              <p className="location">{ispInfo.location}</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/img/wifi.jpg`} alt="Wifi Icon" className="icon" />
                          </div>
                          <div className="arrows">
                            <div className="arrow">&#8594;</div>
                            <div className="arrow">&#8592;</div>
                          </div>
                          <div className="server-info">
                            <img src={`${process.env.PUBLIC_URL}/img/server-round.png`} alt="Server Icon" className="icon" />
                            <div className="icon-text">
                              <p className="name">{serverInfo.sponsor}</p>
                              <p className="location">{serverInfo.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="progress-container">
                    <div className="progress-background"></div>
                    <p key={currentStep} className="current-step ellipsis-slow">
                      {currentStep}
                    </p>
                    <div className="progress-bar" style={{ width: `${testProgress}%` }}></div>
                    {!loading && serverInfo && (
                      <div className="info-wrapper">
                        <div className="info-container centered">
                          <div className="isp-info">
                            <div className="icon-text">
                              <p className="name">{ispInfo.isp}</p>
                              <p className="location">{ispInfo.location}</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/img/wifi.jpg`} alt="Wifi Icon" className="icon" />
                          </div>
                          <div className="arrows">
                            <div className="arrow">&#8594;</div>
                            <div className="arrow">&#8592;</div>
                          </div>
                          <div className="server-info">
                            <img src={`${process.env.PUBLIC_URL}/img/server-round.png`} alt="Server Icon" className="icon" />
                            <div className="icon-text">
                              <p className="name">{serverInfo.sponsor}</p>
                              <p className="location">{serverInfo.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="speed-display">
                      <p className="ellipsis-fast">
                        Download Speed:{downloadSpeed ? `${downloadSpeed} Mbps` : ''}
                      </p>
                      <p className="ellipsis-fast">
                        Upload Speed:{uploadSpeed ? `${uploadSpeed} Mbps` : ''}
                      </p>
                      <p className="ellipsis-fast">Ping:{ping ? `${ping} ms` : ''}</p>
                    </div>
                  </div>
                )}
                {!testRunning && downloadSpeed && uploadSpeed && ping && (
                  <>
                    <div className="results-container">
                      <div className="results-content">
                        <div className="results-values">
                          <div>{downloadSpeed}</div>
                          <div>{uploadSpeed}</div>
                          <div>{ping}</div>
                        </div>
                        <div className="results-labels">
                          <div className="download">Mbps</div>
                          <div className="upload">Mbps</div>
                          <div className="ping">Ping</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            }
          />
        </Routes>
        <footer className="footer">
          <p>
            Compare to results on{' '}
            <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer">
              speedtest.net
            </a>
            !
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;