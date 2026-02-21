// outputNode.js

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  //State for output configuration
  const [name, setName] = useState(data?.outputName || "output_1");
  const [type, setType] = useState(data?.outputType || "Text");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handles = {
    inputs: [{ id: `${id}-value` }], //Recieves result
  };

  //Content specific to OutputNode
  const nodeContent = (
    <div className="space-y-3">
      {/* Name input field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., final_result"
        />
      </div>
      {/* Type select dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={handles}
      children={nodeContent}
    />
  );
};
