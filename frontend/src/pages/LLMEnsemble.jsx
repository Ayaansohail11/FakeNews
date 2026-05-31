import { useState } from 'react'
import API_BASE from '../config'

function LLMEnsemble({ inputText, setInputText }) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const analyzeLLM = async () => {
    if (!inputText || inputText.trim().length === 0) {
      alert('Please enter some text to analyze')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/api/predict/llm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'API request failed')
        return
      }
      
      setResults({
        llama: {
          verdict: data.verdict || 'UNCERTAIN',
          confidence: data.confidence || 0.5,
          reasoning: data.reasoning || 'No reasoning provided',
          metrics: {
            factual: data.metrics?.factual || 0.5,
            sensationalism: data.metrics?.sensationalism || 0.5,
            credibility: data.metrics?.credibility || 0.5,
            style: data.metrics?.style || 0.5
          }
        }
      })
    } catch (err) {
      console.error('LLM API Error:', err)
      setError('Network error - make sure backend is running')
    } finally {
      setLoading(false)
    }
  }

  const MetricBar = ({ label, value, color }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  )

  const sampleArticles = [
    {
      label: 'OpenAI GPT-4o (2024)',
      text: 'OpenAI announced GPT-4o on May 13, 2024, a new flagship model capable of processing text, audio, and images in real time. CEO Sam Altman demonstrated live voice conversations with natural emotional responses. The model is available free to ChatGPT users with higher limits for Plus subscribers.'
    },
    {
      label: 'India Chandrayaan-3 Moon Landing',
      text: "India's ISRO successfully landed Chandrayaan-3 on the Moon's south pole on August 23, 2023, making India the fourth country to achieve a soft lunar landing. The Vikram lander and Pragyan rover began collecting data on lunar soil composition and seismic activity near the south pole."
    },
    {
      label: 'Gaza Ceasefire Talks (2025)',
      text: 'Mediators from Qatar, Egypt and the United States brokered a ceasefire agreement between Israel and Hamas in January 2025 after 15 months of conflict in Gaza. The deal included a phased release of hostages held by Hamas in exchange for Palestinian prisoners held by Israel, along with increased humanitarian aid access.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Sample Modern News */}
      <div className="mb-6 bg-slate-800/50 border border-green-500/30 rounded-xl p-4">
        <p className="text-green-400 font-semibold text-sm mb-3">🌐 Modern News Samples (2023-2025)</p>
        <div className="space-y-2">
          {sampleArticles.map((a, i) => (
            <button
              key={i}
              onClick={() => setInputText(a.text)}
              className="w-full text-left px-3 py-2 bg-slate-900/50 hover:bg-slate-700/50 rounded-lg border border-slate-600 hover:border-green-500/50 transition-all"
            >
              <p className="text-green-400 text-xs font-semibold">{a.label}</p>
              <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{a.text}</p>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm font-semibold">❌ Error: {error}</p>
          {error.includes('GROQ_API_KEY') && (
            <p className="text-gray-400 text-xs mt-1">Set GROQ_API_KEY in your .env file. Get key at console.groq.com</p>
          )}
        </div>
      )}

      {/* Analyze Button */}
      <div className="mb-6">
        <button
          onClick={analyzeLLM}
          disabled={loading || !inputText}
          className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-green-500/50 text-lg"
        >
          {loading ? '🦙 Querying LLaMA 3.3 70B...' : '🦙 Analyze with LLaMA 3.3 70B'}
        </button>
      </div>

      {results && (
        <>
          {/* Single LLaMA Result */}
          <div className="mb-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-2 border-green-500 rounded-xl p-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-black text-green-400 mb-2">
                {results.llama.verdict === 'FAKE' ? '⚠️ FAKE NEWS' : results.llama.verdict === 'REAL' ? '✅ REAL NEWS' : '❓ UNCERTAIN'}
              </h2>
              <p className="text-gray-300 text-lg">LLaMA 3.3 70B Analysis - Confidence: {(results.llama.confidence * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Single LLaMA Card */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="bg-slate-800/50 border-2 border-green-500/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-2xl">
                  🦙
                </div>
                <div>
                  <h3 className="text-green-400 font-bold text-lg">LLaMA 3.3 70B</h3>
                  <p className="text-xs text-gray-400">via Groq API (Meta AI)</p>
                </div>
              </div>

              <div className={`mb-4 py-3 px-4 rounded-lg text-center font-black text-xl ${
                results.llama.verdict === 'FAKE' 
                  ? 'bg-red-500/20 text-red-400' 
                  : results.llama.verdict === 'REAL'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {results.llama.verdict}
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Confidence</div>
                <div className="text-3xl font-black text-green-400">{(results.llama.confidence * 100).toFixed(1)}%</div>
              </div>

              <div className="mb-4 p-4 bg-slate-900/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-2">Reasoning:</div>
                <p className="text-sm text-gray-300 leading-relaxed">{results.llama.reasoning}</p>
              </div>

              <div className="space-y-2">
                <MetricBar label="Factual Consistency" value={results.llama.metrics.factual} color="bg-blue-500" />
                <MetricBar label="Sensationalism" value={results.llama.metrics.sensationalism} color="bg-red-500" />
                <MetricBar label="Source Credibility" value={results.llama.metrics.credibility} color="bg-green-500" />
                <MetricBar label="Journalistic Style" value={results.llama.metrics.style} color="bg-purple-500" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!results && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🦙</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">LLaMA 3.3 70B Ready</h3>
          <p className="text-gray-500">70 billion parameter language model by Meta AI</p>
          <p className="text-gray-600 text-sm mt-2">Powered by Groq API</p>
        </div>
      )}
    </div>
  )
}

export default LLMEnsemble
