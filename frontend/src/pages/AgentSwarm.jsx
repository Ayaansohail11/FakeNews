import { useState } from 'react'

function AgentSwarm({ inputText }) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const analyzeSwarm = async () => {
    if (!inputText || !inputText.trim()) { alert('Please enter some text'); return }
    setLoading(true)
    try {
      const response = await fetch('https://ayaans123-fakenewsspace.hf.space/api/predict/swarm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })
      const data = await response.json()
      if (data.error) { alert('Error: ' + data.error); setLoading(false); return }
      setResults(data)
    } catch (error) {
      alert('Backend error: ' + error.message)
    }
    setLoading(false)
  }

  const verdictColor = (v) => {
    if (!v) return 'yellow'
    if (v.includes('FAKE')) return 'red'
    if (v.includes('REAL')) return 'green'
    return 'yellow'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={analyzeSwarm}
          disabled={loading || !inputText}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-orange-500/50 text-lg"
        >
          {loading ? '🕷️ Deploying Agent Swarm...' : '🕷️ Deploy 20-Agent Fact Verification Swarm'}
        </button>
      </div>

      {results && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-4">
              <div className="text-green-400 text-sm mb-1">Credible Matches</div>
              <div className="text-3xl font-black text-white">{results.credible_sources}/16</div>
            </div>
            <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-4">
              <div className="text-red-400 text-sm mb-1">Unreliable Matches</div>
              <div className="text-3xl font-black text-white">{results.unreliable_sources}/4</div>
            </div>
            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-4">
              <div className="text-purple-400 text-sm mb-1">Execution Time</div>
              <div className="text-3xl font-black text-white">{results.elapsed}s</div>
            </div>
            <div className={`border-2 rounded-xl p-4 ${
              verdictColor(results.verdict) === 'red' ? 'bg-red-900/30 border-red-500' :
              verdictColor(results.verdict) === 'green' ? 'bg-green-900/30 border-green-500' :
              'bg-yellow-900/30 border-yellow-500'
            }`}>
              <div className="text-gray-300 text-sm mb-1">Swarm Verdict</div>
              <div className={`text-xl font-black ${
                verdictColor(results.verdict) === 'red' ? 'text-red-400' :
                verdictColor(results.verdict) === 'green' ? 'text-green-400' : 'text-yellow-400'
              }`}>{results.verdict}</div>
              <div className="text-white text-sm font-bold mt-1">{(results.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Keywords */}
          {results.keywords && (
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-4 mb-6">
              <h3 className="text-cyan-400 font-bold text-sm mb-2">🗝️ Extracted Keywords (TF-IDF)</h3>
              <div className="flex flex-wrap gap-2">
                {results.keywords.map((kw, idx) => (
                  <span key={idx} className="bg-cyan-900/30 border border-cyan-500/50 text-cyan-300 px-3 py-1 rounded-full text-sm">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Real Agent Matrix from backend */}
          <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-cyan-400 font-bold text-lg mb-4">🕸️ 20-Agent Live Status Matrix</h3>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
              {results.agents.map((agent, idx) => (
                <div
                  key={idx}
                  className={`bg-slate-900/50 border-2 rounded-lg p-3 hover:scale-110 transition-all ${
                    agent.found
                      ? agent.credible ? 'border-green-500 shadow-green-500/30 shadow-lg' : 'border-red-500 shadow-red-500/30 shadow-lg'
                      : agent.credible ? 'border-cyan-500/30' : 'border-red-500/20'
                  }`}
                  title={agent.site}
                >
                  <div className={`w-3 h-3 rounded-full mb-2 ${
                    agent.found
                      ? agent.credible ? 'bg-green-500' : 'bg-red-500'
                      : 'bg-gray-600'
                  }`}></div>
                  <div className="text-white text-xs font-semibold truncate">{agent.domain}</div>
                  <div className="text-gray-500 text-[10px] truncate">{agent.site}</div>
                  {agent.found && (
                    <div className={`text-[10px] font-bold mt-1 ${agent.credible ? 'text-green-400' : 'text-red-400'}`}>
                      {agent.credible ? '✓ Found' : '⚠ Found'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-6 text-xs">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-gray-400">Credible Match</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-gray-400">Unreliable Match</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-600 rounded-full"></div><span className="text-gray-400">No Match</span></div>
            </div>
          </div>

          {/* Credible Evidence */}
          {results.agents.filter(a => a.credible && a.found).length > 0 && (
            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-6 mb-6">
              <h3 className="text-green-400 font-bold text-lg mb-4">✅ Credible Source Evidence</h3>
              <div className="space-y-3">
                {results.agents.filter(a => a.credible && a.found).map((agent, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-green-500/20">
                    <div className="text-green-400 font-semibold text-sm mb-2">{agent.site}</div>
                    {agent.evidence.map((ev, eidx) => (
                      <div key={eidx} className="mb-2 pl-3 border-l-2 border-green-500/40">
                        <p className="text-white text-xs font-medium">{ev.title}</p>
                        {ev.snippet && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{ev.snippet}</p>}
                        <span className="text-green-400 text-[10px]">Similarity: {(ev.jaccard * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unreliable Evidence */}
          {results.agents.filter(a => !a.credible && a.found).length > 0 && (
            <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-6 mb-6">
              <h3 className="text-red-400 font-bold text-lg mb-4">⚠️ Unreliable Source Evidence</h3>
              <div className="space-y-3">
                {results.agents.filter(a => !a.credible && a.found).map((agent, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-red-500/20">
                    <div className="text-red-400 font-semibold text-sm mb-2">{agent.site}</div>
                    {agent.evidence.map((ev, eidx) => (
                      <div key={eidx} className="mb-2 pl-3 border-l-2 border-red-500/40">
                        <p className="text-white text-xs font-medium">{ev.title}</p>
                        {ev.snippet && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{ev.snippet}</p>}
                        <span className="text-red-400 text-[10px]">Similarity: {(ev.jaccard * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinator Analysis */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🦙</div>
              <div className="flex-1">
                <h3 className="text-purple-400 font-bold text-lg mb-2">LLaMA 3.3 70B Coordinator Analysis</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{results.reasoning}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-cyan-400 text-xs mb-1">Confidence</div>
                    <div className="text-white font-bold">{(results.confidence * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-cyan-400 text-xs mb-1">Credible Sources</div>
                    <div className="text-green-400 font-bold">{results.credible_sources}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-cyan-400 text-xs mb-1">Unreliable Sources</div>
                    <div className="text-red-400 font-bold">{results.unreliable_sources}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!results && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🕷️</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">Agent Swarm Ready</h3>
          <p className="text-gray-500">20 parallel agents ready for live web cross-verification</p>
        </div>
      )}
    </div>
  )
}

export default AgentSwarm
