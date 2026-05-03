// mergeNode.js - Merges multiple inputs into one output

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ", ");

  const handles = {
    inputs: [
      { id: `${id}-input1` },
      { id: `${id}-input2` },
      { id: `${id}-input3` },
    ],
    outputs: [{ id: `${id}-merged` }],
  };

  const nodeContent = (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Separator
      </label>
      <input
        type="text"
        value={separator}
        onChange={(e) => setSeparator(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g. , or space or \n"
      />
      <p className="text-xs text-gray-500">Merges 3 inputs into 1 output</p>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="🔀 Merge"
      handles={handles}
      children={nodeContent}
    />
  );
};
