// BaseNode.js

import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id, //uniquie node ID (e.g., "customInput-1")
  title, //node title (e.g., "Input", "Text")
  children, //node-specific content (passed as JSX)
  handles = {}, //which handles to show and their positions
}) => {
  return (
    <div>
      {/* Input handles (dots on the left side where connections come FROM)*/}
      {handles.inputs &&
        handles.inputs.map((input, idx) => (
          <Handle
            key={`input - ${idx}`}
            type="target" //target = receives input FROM other nodes
            position={Position.Left} //Position = left side of node
            id={input.id} //unique id for this handle (e.g., "text-1-{{variable}}")
            style={{
              top: `${(idx + 1) * (100 / (handles.inputs.length + 1))}%`, //space handles evenly
            }}
            className="bg-blue-500"
          />
        ))}
      {/* title section */}
      <div className="font-bold text-lg text-gray-800 mb-3 border-b pb-2">
        {title}
      </div>
      {/* node specific content */}
      <div className="mb-3">{children}</div>
      {/* output handles (dots on the right side where connections GO TO)*/}

      {handles.outputs &&
        handles.outputs.map((output, idx) => (
          <Handle
            key={`output-${idx}`}
            type="source" // source =send output to other nodes
            position={Position.Right} //Position  right side of node
                id={output.id} //unique ID (e.g., "text-1-output")
                style={{
                    top: `${(idx+1)*(100/(handles.outputs.length+1))}%`
                }}
                className="bg-green-500"
          />
        ))}
    </div>
  );
};
