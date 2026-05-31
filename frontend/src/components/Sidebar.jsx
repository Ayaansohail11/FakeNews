import { useState, useEffect } from 'react'

function Sidebar({ inputText, setInputText, setPresetArticle, activeTab, onClose }) {
  const [dragActive, setDragActive] = useState(false)
  const [liveNews, setLiveNews] = useState([])

  useEffect(() => {
    fetch('https://ayaans123-fakenewsspace.hf.space/api/live-news?limit=15')
      .then(r => r.json())
      .then(d => setLiveNews(d.articles || []))
      .catch(() => {})
  }, [])

  const mlPresets = [
    {
      id: 1, title: 'US Senate Healthcare Bill (Real)', type: 'real',
      text: 'WASHINGTON (Reuters) - The United States Senate passed a sweeping healthcare reform bill on Thursday by a vote of 60 to 40. President Donald Trump signed the legislation into law at the White House, calling it a historic victory for the American people. The bill allocates 300 billion dollars for Medicaid expansion over the next five years.'
    },
    {
      id: 2, title: 'Obama Secret Muslim Agenda (Fake)', type: 'fake',
      text: 'SHOCKING: Leaked White House documents confirm that Barack Obama secretly funded ISIS during his presidency! Anonymous sources reveal the former president held secret meetings with terrorist leaders in the Oval Office. The mainstream media is covering up this massive scandal. Share this before it gets deleted!'
    },
    {
      id: 3, title: 'Trump Tax Reform Signed (Real)', type: 'real',
      text: 'WASHINGTON (Reuters) - President Donald Trump signed the Tax Cuts and Jobs Act into law on Friday, delivering the largest overhaul of the United States tax code in three decades. The legislation cuts the corporate tax rate from 35 percent to 21 percent and reduces individual income tax rates across most brackets.'
    },
    {
      id: 4, title: 'Hillary Clinton Arrested (Fake)', type: 'fake',
      text: 'BREAKING: Hillary Clinton has been arrested by FBI agents at her New York home early this morning! Sources confirm she will face charges related to her email server and the Clinton Foundation scandal. The deep state is finally being exposed. Donald Trump tweeted that justice is being served. This is the moment patriots have been waiting for!'
    },
    {
      id: 5, title: 'FBI Investigates Russia Ties (Real)', type: 'real',
      text: 'WASHINGTON (Reuters) - The Federal Bureau of Investigation confirmed on Monday that it is conducting a counterintelligence investigation into Russian interference in the 2016 United States presidential election. FBI Director James Comey told the House Intelligence Committee that the investigation includes examining potential links between Trump campaign associates and the Russian government.'
    },
    {
      id: 6, title: 'George Soros Controls Media (Fake)', type: 'fake',
      text: 'EXPOSED: Billionaire George Soros has been secretly paying CNN, MSNBC and New York Times journalists to spread anti-Trump propaganda! Internal documents leaked by a whistleblower reveal a 50 million dollar fund used to control American news coverage. The globalist agenda is being exposed. Mainstream media will never report this truth!'
    }
  ]

  const llmPresets = [
    {
      id: 1, title: 'OpenAI GPT-4o Launch (2024)', type: 'real',
      text: 'OpenAI announced GPT-4o on May 13, 2024, a new flagship model capable of processing text, audio, and images in real time. CEO Sam Altman demonstrated live voice conversations with natural emotional responses. The model is available free to ChatGPT users with higher limits for Plus subscribers.'
    },
    {
      id: 2, title: 'Chandrayaan-3 Moon Landing (2023)', type: 'real',
      text: "India's ISRO successfully landed Chandrayaan-3 on the Moon's south pole on August 23, 2023, making India the fourth country to achieve a soft lunar landing. The Vikram lander and Pragyan rover began collecting data on lunar soil composition and seismic activity near the south pole."
    },
    {
      id: 3, title: 'Gaza Ceasefire Deal (2025)', type: 'real',
      text: 'Mediators from Qatar, Egypt and the United States brokered a ceasefire agreement between Israel and Hamas in January 2025 after 15 months of conflict in Gaza. The deal included a phased release of hostages held by Hamas in exchange for Palestinian prisoners, along with increased humanitarian aid access.'
    },
    {
      id: 4, title: 'AI 5G Mind Control (Fake)', type: 'fake',
      text: 'URGENT: Whistleblowers confirm that ChatGPT is being used by globalists to beam mind control signals through 5G towers! Secret documents show Bill Gates and George Soros funded the project to enslave humanity. Doctors are being silenced! Share this before Big Tech deletes it forever!'
    },
    {
      id: 5, title: 'Tesla Robotaxi Unveiled (2024)', type: 'real',
      text: 'Tesla unveiled its Robotaxi, called Cybercab, at a special event in October 2024. CEO Elon Musk announced the fully autonomous vehicle will have no steering wheel or pedals and is expected to enter production before 2027. The company also showcased its Robovan capable of carrying up to 20 passengers.'
    },
    {
      id: 6, title: 'WHO Hides New Pandemic (Fake)', type: 'fake',
      text: 'BREAKING: The World Health Organization has secretly declared a new pandemic but is hiding it from the public! Anonymous insiders reveal a deadly virus has already killed thousands in underground facilities. Governments are preparing mass lockdowns. Stock up on supplies NOW before the mainstream media admits the truth!'
    }
  ]

  const isLLMTab = activeTab === 2
  const isSwarmTab = activeTab === 5

  const presets = isLLMTab || isSwarmTab ? llmPresets : mlPresets
  const presetLabel = isLLMTab || isSwarmTab ? '🌐 Modern News Test Cases (2023-2025)' : '🗞️ Test Cases (ISOT Dataset Style)'

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
  }

  const handleFile = (file) => alert('OCR processing: ' + file.name)

  const getPresetClass = (type) => {
    if (type === 'real') return 'border-green-500/50 bg-green-900/20 hover:bg-green-900/40 hover:border-green-500'
    if (type === 'fake') return 'border-red-500/50 bg-red-900/20 hover:bg-red-900/40 hover:border-red-500'
    return 'border-gray-500/50 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-500'
  }

  const getPresetIcon = (type) => type === 'real' ? '✓' : '⚠'
  const getPresetIconClass = (type) => type === 'real' ? 'text-green-400' : 'text-red-400'

  return (
    <div className="w-80 lg:w-96 bg-slate-800/50 border-r border-cyan-500/30 p-4 overflow-y-auto h-screen lg:h-[calc(100vh-180px)]">
      {/* Mobile close button */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <span className="text-cyan-400 font-bold text-sm">Input Panel</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Input Text Area */}
      <div className="mb-6">
        <label className="block text-cyan-400 font-semibold mb-2 text-sm">Input News Article</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your news article here..."
          className="w-full h-40 bg-slate-900/50 border border-cyan-500/30 rounded-lg p-3 text-gray-300 text-sm focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      {/* Preset Selector */}
      <div className="mb-6">
        <label className="block text-cyan-400 font-semibold mb-3 text-sm">{presetLabel}</label>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {presets.map(preset => (
            <button
              key={preset.id}
              onClick={() => setInputText(preset.text)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left ${getPresetClass(preset.type)}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold ${getPresetIconClass(preset.type)}`}>
                  {getPresetIcon(preset.type)}
                </span>
                <span className="text-white font-semibold text-xs">{preset.title}</span>
              </div>
              <p className="text-gray-400 text-[11px] line-clamp-2">{preset.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* OCR Uploader */}
      <div className="mb-6">
        <label className="block text-cyan-400 font-semibold mb-3 text-sm">OCR Image Upload</label>
        <div
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${dragActive ? 'border-cyan-500 bg-cyan-900/20' : 'border-cyan-500/30 bg-slate-900/30 hover:border-cyan-500/50'}`}
        >
          <svg className="w-12 h-12 mx-auto mb-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-400 text-sm mb-2">Drag & drop image here</p>
          <p className="text-gray-500 text-xs mb-3">or</p>
          <label className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-block">
            Browse Files
            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
          </label>
        </div>
      </div>

      {/* Live News Section */}
      {liveNews.length > 0 && (
        <div className="mb-6">
          <label className="block text-cyan-400 font-semibold mb-3 text-sm">🔴 Live News (Click to Analyze)</label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {liveNews.map((article, idx) => {
              let verdict = null, confidence = null
              if (article.ml_verdict && article.ml_verdict.includes(':')) {
                const parts = article.ml_verdict.split(':')
                verdict = parts[0]
                confidence = parseFloat(parts[1])
              }
              return (
                <button
                  key={idx}
                  onClick={() => setInputText(article.content || article.title)}
                  className="w-full p-3 rounded-lg border border-slate-600 bg-slate-900/50 hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all text-left"
                >
                  <p className="text-white text-xs font-semibold line-clamp-2 mb-1">{article.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-[10px]">{article.source}</span>
                    {verdict && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${verdict === 'FAKE' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {verdict} {confidence ? `${(confidence * 100).toFixed(0)}%` : ''}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4">
        <h3 className="text-cyan-400 font-semibold text-sm mb-3">Quick Stats</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Character Count:</span>
            <span className="text-white font-semibold">{inputText.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Word Count:</span>
            <span className="text-white font-semibold">{inputText.split(/\s+/).filter(w => w).length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={`font-semibold ${inputText.length > 50 ? 'text-green-400' : 'text-yellow-400'}`}>
              {inputText.length > 50 ? 'Ready' : 'Need more text'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
