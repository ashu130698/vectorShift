// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="bg-gray-900 text-white p-4 shadow-lg overflow-x-auto">
      <div className="flex gap-3 min-w-max">
        <DraggableNode type="customInput" label="📥 Input" />
        <DraggableNode type="llm" label="🤖 LLM" />
        <DraggableNode type="customOutput" label="📤 Output" />
        <DraggableNode type="text" label="📝 Text" />
        <DraggableNode type="api" label="🌐 API Call" />
        <DraggableNode type="filter" label="🔍 Filter" />
        <DraggableNode type="transform" label="⚙️ Transform" />
        <DraggableNode type="note" label="🗒️ Note" />
        <DraggableNode type="merge" label="🔀 Merge" />
      </div>
    </div>
  );
};
