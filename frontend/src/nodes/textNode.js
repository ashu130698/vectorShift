// textNode.js

import { useEffect, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  
  const textareaRef = useRef(null);

  //state: template text (e.g., "Hello {{name}}, welcome to {{app}}")
  const [text, setText] = useState(data?.text || '{{input}}');

  //Function: Extract variables from text using regex
  const extractVariables = (textContent) => {
    const matches = textContent.match(/\{\{([^}]+)\}\}/g) || [];
    //Remove Duplicates
    return [...new Set(matches)];
  };

  // Get unique variable from current text
  const variables = extractVariables(text);

  //Handle Text area change
  const handleTextChange = (e) => {
    //Update text state
    setText(e.target.value);
    //Auto-resize textarea using the ref instead of e.target (consistent approach)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  //Initialize textarea height on mount
  useEffect(() => {
    //textareaRef.current gives us the exact textarea element — no DOM searching needed
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [id]);

  //Input handles: one for each variable  
  //output handles: one for result
  const handles = {
    inputs: variables.map((variable) => ({
      id: `${id}-${variable}`
    })),
    outputs: [{ id: `${id}-output` }]  //Result Output
  };

  //Content specific to TextNode
  const nodeContent = (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>
        Template Text
      </label>

      {/* Textarea for multiline template */}
      <textarea
        ref={textareaRef}  //connects this element to our useRef (replaces data-node-id)
        value={text}
        onChange={handleTextChange}
        className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
        rows="3"  //start from 3 rows then resize 
        placeholder='Use {{variable}} for dynamic content'
      />

      {/* display detected variables to user */}
      {variables.length > 0 && (
        <div>
          Variables detected: {variables.join(', ')}
        </div>
      )}
    </div>
  );

//basenode with textnode-specific content
  return (
    <BaseNode
      id={id}
      title="Text"            //Title shown at top
      handles={handles}       //Input handles for variables +1 output
      children={nodeContent}  //Textare + variable display
    />
  );
}
