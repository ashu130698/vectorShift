// transformNode.js - Transforms/formats data

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(
    data?.transformType || "uppercase",
  );

  const handles = {
    inputs: [{ id: `${id}-input` }],
    outputs: [{ id: `${id}-output` }],
  };

  const nodeContent = (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Transform
      </label>
      <select
        value={transformType}
        onChange={(e) => setTransformType(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="trim">Trim Whitespace</option>
        <option value="reverse">Reverse</option>
        <option value="json">Parse JSON</option>
      </select>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="⚙️ Transform"
      handles={handles}
      children={nodeContent}
    />
  );
};
