// noteNode.js - Adds comments/notes to pipeline

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || "");

  // Note node has no handles - it's just a comment
  const handles = {};

  const nodeContent = (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Note
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none bg-yellow-50"
        rows="3"
        placeholder="Add a note or comment..."
      />
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="📝 Note"
      handles={handles}
      children={nodeContent}
    />
  );
};
