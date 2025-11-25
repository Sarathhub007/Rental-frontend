
export default function CategorizeIssue() {
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategorize = async () => {
    setLoading(true); setResult(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/ai/categorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setResult({ error: data.error || "Failed" });
    } catch (err) {
      setResult({ error: err.message });
    } finally { setLoading(false); }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-3">Report Maintenance Issue (AI Categorizer)</h2>
      <textarea placeholder="Describe the problem..." value={desc} onChange={(e)=>setDesc(e.target.value)} className="textarea" rows={6} />
      <div className="mt-3">
        <button onClick={handleCategorize} className="btn" disabled={loading || !desc}>
          {loading ? "Classifying..." : "Categorize"}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-3 border rounded">
          <div><strong>Category:</strong> {result.category}</div>
          <div><strong>Risk:</strong> {result.risk}</div>
          {result.raw && <details className="mt-2"><summary>Raw AI output</summary><pre>{result.raw}</pre></details>}
          {result.error && <div className="text-red-600 mt-2">{result.error}</div>}
        </div>
      )}
    </div>
  );
}
