// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
      <div className="bg-gray-900 text-white p-4 shadow-lg">
        <div className="flex flex-wrap gap-3">
          <DraggableNode type="customInput" label=" 📥 Input" />
          <DraggableNode type="llm" label="🤖 LLM" />
          <DraggableNode type="customOutput" label="📤 Output" />
          <DraggableNode type="text" label="📝 Text" />
        </div>
      </div>
    );
};
