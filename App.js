import React, { useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = 'dalyventures';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  /*
   * Start by creating a new action that we will run on component load
   */
  // Actions
  const checkIfWalletIsConnected = () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">🐢 Teenage Mutant Ninja Turtles 🐢</p>
          <p className="sub-text">Team up to defeat Shredder!</p>
        </div>
        <div className="connect-wallet-container">
          <img
            src="https://64.media.tumblr.com/6ce0efd032c11117ccefcccee48c8f31/d2f6d1cd1704cba9-91/s500x750/a4e7fb2d40a021ca31ebb5c054c8e2d9385dec26.gifv"
            alt="Monty Python Gif"
          />
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
