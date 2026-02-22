// submit.js

import { useState } from "react";
import { useStore } from "./store";  //our Zustand store, NOT reactflow's useStore

const hasCycle = (nodes, edges) => {
    const graph = {};

    //Initialize empty array for each node
    nodes.forEach(node => {
        graph[node.id] = [];
    });

    //Adding edges to graph
    edges.forEach(edge => {
        graph[edge.source]?.push(edge.target);
    });

    //Track visited nodes
    const visited = new Set();

    //If we visit a node already in recursion, there's a cycle
    const recursionStack = new Set();

    //DFS function 
    const dfs = (node) => {
        visited.add(node);
        recursionStack.add(node);

        //check all neighbour (connected nodes)
        for (let neighbour of graph[node] || []) {
            //If neighbour not visited, visit it
            if (!visited.has(neighbour)) {
                if (dfs(neighbour)) return true;   //cycle found in subtree
            }
            //If neighbour is in recursion stack, cycle found
            else if (recursionStack.has(neighbour)) {
                return true;
            }
        }
        // remove from recursion stack
        recursionStack.delete(node);
        return false;
    };
    //Check all node for cycles
    for (let node of nodes) {
        if (!visited.has(node.id)) {
            if (dfs(node.id)) return true;  //cycle found
        }
    }
    return false;  //No cycle found, valid DAG
};

//Zustand selector: pick only nodes and edges from the store
const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    //Get nodes and edges from Zustand store
    const { nodes, edges } = useStore(selector);

    //Submission is in process?
    const [loading, setLoading] = useState(false);

    //Succes/error message
    const [message, setMessage] = useState('');

    //Handle Submit click
    const handleSubmit = async () => {
        setMessage('');  //clear previos message
        setLoading(true);
    

        try {
            // Validation1: checking for cycles (DAG Validation)
            if (hasCycle(nodes, edges)) {
                setMessage('Pipeline has cycle! DAGs must be acyclic. ');
                setLoading(false);
                return;
            }

            //Validation 2: At least one input node 
            const hasInput = nodes.some(n => n.type === 'customInput');
            if (!hasInput) {
                setMessage('Pipeline must have one input node.');
                setLoading(false);
                return;
            }

            //Validation 3: At least one output node
            const hasOutput = nodes.some(n => n.type === 'customOutput');
            if (!hasOutput) {
                setMessage('Pipeline must have one Output node.');
                setLoading(false);
                return;
            }

            //All validation are passed, send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ nodes, edges })  //dot, not dash
            });

            //checking if responces is ok
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);  //Error with capital E
            }

            //Parse responce
            const data = await response.json();
            //Success!
            setMessage('Pipeline submitted succesfully');
            console.log('Backend responce:', data);

        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Submission error:', error);
        } finally {
            //Always stop loading, wheather succes or error
            setLoading(false);

        }
    };

    return (
        <div className="bg-gray-100 p-4 flex flex-col items-center justify-center gap-4">
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors shadow-lg">
                {loading ? 'Submitting...' : 'Submit Pipeline'}
            </button>

            {/* Success/Error message */}
            {message && (
                <div className={`text-sm font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    );
};