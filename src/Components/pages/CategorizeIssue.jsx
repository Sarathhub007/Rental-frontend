import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function CategorizeIssue() {
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategorize = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/ai/categorize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: desc }),
        }
      );

      const data = await res.json();
      if (res.ok) setResult(data);
      else setResult({ error: data.error || "Failed" });
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-3xl font-semibold mb-6">Report Maintenance Issue</h2>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="space-y-4 p-6">
          <Textarea
            placeholder="Describe the issue clearly…"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={6}
            className="resize-none"
          />

          <Button
            onClick={handleCategorize}
            disabled={loading || !desc}
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Classifying…
              </div>
            ) : (
              "Categorize Issue"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <Card className="border-l-4 border-blue-600 shadow-md rounded-2xl">
            <CardContent className="p-5 space-y-2">
              {result.error ? (
                <div className="text-red-600 font-semibold">{result.error}</div>
              ) : (
                <>
                  <div>
                    <strong>Category:</strong> {result.category}
                  </div>
                  <div>
                    <strong>Risk:</strong> {result.risk}
                  </div>

                  {result.raw && (
                    <details className="mt-3 cursor-pointer">
                      <summary className="text-blue-600">Raw AI Output</summary>
                      <pre className="bg-gray-100 p-3 rounded-lg mt-2 text-sm">
                        {result.raw}
                      </pre>
                    </details>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
