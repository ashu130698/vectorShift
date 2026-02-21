// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  const handles = {
    inputs: [
      { id: `${id}-system` }, //system instruction
      { id: `${id}-prompt` }, //User prompt
    ],
    outputs: [{ id: `${id}-response`}]  //Responce from LLM
  };

  //Content specific to LLMNode
  const nodeContent = (
    <div className='text-center space-y-2'>
      <div className='text-sm text-gray-600'>
        <p className='font-medium'>Language Model</p>
        <p className='text-xs mt-1'>Recieve prompt and return responce</p>
      </div>
    </div>
  )
  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={handles}
      children={nodeContent}
    />
  );
}
