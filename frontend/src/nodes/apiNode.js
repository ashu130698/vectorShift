// apiNode.js - Makes API calls

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "https://api.example.com");
  const [method, setMethod] = useState(data?.method || "GET");

  const handles = {
    inputs: [{ id: `${id}-input` }],
    outputs: [{ id: `${id}-response` }],
  };

  const nodeContent = (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://api.example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="🌐 API Call"
      handles={handles}
      children={nodeContent}
    />
  );
};
