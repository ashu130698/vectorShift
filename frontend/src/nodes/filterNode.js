// filterNode.js - Filters data based on condition

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");

  const handles = {
    inputs: [{ id: `${id}-input` }],
    outputs: [{ id: `${id}-true` }, { id: `${id}-false` }],
  };

  const nodeContent = (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Condition
        </label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. value > 10"
        />
      </div>
      <div className="text-xs text-gray-500 flex justify-between mt-1">
        <span>↑ True</span>
        <span>↓ False</span>
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="🔍 Filter"
      handles={handles}
      children={nodeContent}
    />
  );
};
