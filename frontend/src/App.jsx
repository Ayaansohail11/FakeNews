import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MLEnsemble from './pages/MLEnsemble'
import AttentionBiLSTM from './pages/AttentionBiLSTM'
import LLMEnsemble from './pages/LLMEnsemble'
import DatasetAudit from './pages/DatasetAudit'
import LiveIntel from './pages/LiveIntel'
import AgentSwarm from './pages/AgentSwarm'

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [biasCorrection, setBiasCorrection] = useState(true)
  const [inputText, setInputText] = useState('')
  const [presetArticle, setPresetArticle] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = [
    { id: 0, name: 'ML Ensemble', icon: '🤖' },
    { id: 1, name: 'BiLSTM', icon: '🧠' },
    { id: 2, name: 'LLM', icon: '🦙' },
    { id: 3, name: 'Audit', icon: '📊' },
    { id: 4, name: 'Live Intel', icon: '📡' },
    { id: 5, name: 'Swarm', icon: '🐝' }
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 0: return <MLEnsemble inputText={inputText} biasCorrection={biasCorrection} />
      case 1: return <AttentionBiLSTM inputText={inputText} />
      case 2: return <LLMEnsemble inputText={inputText} setInputText={setInputText} />
      case 3: return <DatasetAudit />
      case 4: return <LiveIntel />
      case 5: return <AgentSwarm inputText={inputText} />
      default: return <MLEnsemble inputText={inputText} biasCorrection={biasCorrection} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header biasCorrection={biasCorrection} setBiasCorrection={setBiasCorrection} />
      
      {/* Phase Toggle Bar */}
      <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-b border-cyan-500/30 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-cyan-400 font-semibold text-sm">Phase 1: Static Classifiers</span>
            <span className="text-purple-400">|</span>
            <span className="text-purple-400 font-semibold text-sm">Phase 2: Live Bias Correction & Agent Swarm</span>
          </div>
          <span className="sm:hidden text-cyan-400 font-semibold text-sm">TruthLens</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-300 text-xs">Bias:</span>
            <button
              onClick={() => setBiasCorrection(!biasCorrection)}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                biasCorrection ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                biasCorrection ? 'translate-x-4' : ''
              }`} />
            </button>
            <span className={`text-xs font-bold ${
              biasCorrection ? 'text-green-400' : 'text-gray-400'
            }`}>
              {biasCorrection ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static z-30 lg:z-auto
          transition-transform duration-300
          ${ sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' }
          w-80 lg:w-96 flex-shrink-0
        `}>
          <Sidebar
            inputText={inputText}
            setInputText={setInputText}
            setPresetArticle={setPresetArticle}
            activeTab={activeTab}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Tab Navigation */}
          <div className="bg-slate-800/50 border-b border-cyan-500/30">
            <div className="flex items-center">
              {/* Hamburger for mobile */}
              <button
                className="lg:hidden p-3 text-cyan-400 hover:text-white flex-shrink-0"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex overflow-x-auto flex-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-5 py-3 font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? 'bg-cyan-600 text-white border-b-4 border-cyan-400'
                        : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="sm:hidden">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-cyan-500/30 py-3 text-center text-gray-400 text-xs">
        <p>Built by Team Logic Lords | Heritage Institute of Technology</p>
      </footer>
    </div>
  )
}

export default App
