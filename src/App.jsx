import { useState } from 'react'

// Where the Flask backend is running. If you ever deploy this for real,
// this is the one line you'd change to point at a live server instead.
const API_URL = 'http://localhost:5000'

function App() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected)) // local-only preview, no upload yet
    setMatches([])
    setError(null)
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${API_URL}/api/recommend`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMatches(data.matches)
    } catch (err) {
      setError('Could not reach the server. Is the Flask backend running on port 5000?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Visual search</span>
        <h1>Find clothes that look like this</h1>
        <p>Upload a photo of one item and the catalog will surface the closest visual matches, ranked by similarity.</p>
      </header>

      <section className="upload-card">
        <label className={`upload-zone ${previewUrl ? 'has-image' : ''}`} htmlFor="file-input">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected upload" className="preview-image" />
          ) : (
            <>
              <span className="upload-icon" aria-hidden="true">+</span>
              <span className="upload-hint">Click to choose a photo</span>
            </>
          )}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />

        <button onClick={handleSubmit} disabled={!file || loading} className="submit-btn">
          {loading ? 'Searching…' : 'Find similar items'}
        </button>

        {error && <p className="error-text">{error}</p>}
      </section>

      {matches.length > 0 && (
        <section className="results">
          <h2>Closest matches</h2>
          <div className="results-grid">
            {matches.map((m, i) => (
              <figure key={m.filename} className="result-card">
                <span className="rank-badge">{i + 1}</span>
                <img
                  src={`${API_URL}/api/image/${m.filename}`}
                  alt={`Match ${i + 1}`}
                  loading="lazy"
                />
                <figcaption>distance {m.distance}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App
