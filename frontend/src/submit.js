// submit.js

import { useState } from "react";
import { useStore } from "./store";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Alert as required by assessment
      alert(
        `✅ Pipeline Analysis\n\n` +
          `Nodes: ${data.num_nodes}\n` +
          `Edges: ${data.num_edges}\n` +
          `Valid DAG: ${data.is_dag ? "Yes ✅" : "No ❌"}`,
      );
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 flex items-center justify-center">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors shadow-lg"
      >
        {loading ? "Submitting..." : "Submit Pipeline"}
      </button>
    </div>
  );
};
