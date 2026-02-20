// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  //State for input name and type
  const [name, setName] = useState(data?.inputName || `input_1`);
  const [type, setType] = useState(data?.inputType || 'Text');

  //handle change for name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  //handle change for type select
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  //InputNode: No input handles (its the START), 1 output handle
  const handles = {
    outputs: [{ id: `${id}-value` }]
  }

  //unique content for input node (not shared with other nodes)
  const nodeContent = (
    <div className='space-y-3'>
      {/* Input name field */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Name
        </label>
        <input
          type='text'
          value={name}
          onChange={handleNameChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='e.g., user_input'
        />
      </div>
      {/* Type select dropdown */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Type
        </label>
        <select
          value={type}
          onChange={handleTypeChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus: outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </div>
  );

  //Use BaseNode with InputNode specif content
  return (
    <BaseNode
      id={id}
      title="Input"          //title shown at top
      handles={handles}      //1 output handle on right
      children={nodeContent} //Name + Type fields
    />
  );
};
