import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import { NotificationProvider } from './components/NotificationSystem';
import { LanguageProvider } from './contexts/LanguageContext';
import Homepage from './components/Homepage';
import ModuleLayout from './components/ModuleLayout';
import AboutMe from './components/AboutMe';
import './styles/globalTheme.css';
import './styles/hierarchicalSystem.css'; /* Professional visual hierarchy system */
import './styles/modernComponents.css';
import './styles/modernInteractions.css';
import './components/EnhancedButtons.css';
import './components/NotificationSystem.css';
import './App.css';

/* GlobalContrast.css MUST be imported last to override everything */
import './styles/GlobalContrast.css';

// Import all modules
import MoneyModule from './modules/MoneyModule';
import BitcoinBasicsModule from './modules/BitcoinBasicsModule';
import NumbersModule from './modules/NumbersModule';
import HashingModule from './modules/HashingModule';
import MiningModule from './modules/MiningModule';
import KeysModule from './modules/KeysModule';
import TransactionsModule from './modules/TransactionsModule';
import ScriptsModule from './modules/ScriptsModule';
import MerkleModule from './modules/MerkleModule';
import CustodyModule from './modules/CustodyModule';
import LightningModule from './modules/LightningModule';
import AdvancedTopicsModule from './modules/AdvancedTopicsModule';
import MythsModule from './modules/MythsModule';
import BitcoinToolkitModule from './modules/BitcoinToolkitModule';

function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<ModuleLayout><AboutMe /></ModuleLayout>} />
              <Route path="/module/money" element={<ModuleLayout><MoneyModule /></ModuleLayout>} />
              <Route path="/module/bitcoin-basics" element={<ModuleLayout><BitcoinBasicsModule /></ModuleLayout>} />
              <Route path="/module/numbers" element={<ModuleLayout><NumbersModule /></ModuleLayout>} />
              <Route path="/module/hashing" element={<ModuleLayout><HashingModule /></ModuleLayout>} />
              <Route path="/module/mining" element={<ModuleLayout><MiningModule /></ModuleLayout>} />
              <Route path="/module/keys" element={<ModuleLayout><KeysModule /></ModuleLayout>} />
              <Route path="/module/transactions" element={<ModuleLayout><TransactionsModule /></ModuleLayout>} />
              <Route path="/module/scripts" element={<ModuleLayout><ScriptsModule /></ModuleLayout>} />
              <Route path="/module/merkle" element={<ModuleLayout><MerkleModule /></ModuleLayout>} />
              <Route path="/module/custody" element={<ModuleLayout><CustodyModule /></ModuleLayout>} />
              <Route path="/module/lightning" element={<ModuleLayout><LightningModule /></ModuleLayout>} />
              <Route path="/module/advanced-topics" element={<ModuleLayout><AdvancedTopicsModule /></ModuleLayout>} />
              <Route path="/module/myths" element={<ModuleLayout><MythsModule /></ModuleLayout>} />
              <Route path="/module/bitcoin-toolkit" element={<ModuleLayout><BitcoinToolkitModule /></ModuleLayout>} />
            </Routes>
          </div>
        </Router>
        </NotificationProvider>
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;
