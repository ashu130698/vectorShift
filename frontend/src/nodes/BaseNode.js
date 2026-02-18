// BaseNode.js

import { Handle, Position } from 'reactflow';

export const BaseNode = ({
    id,            //uniquie node ID (e.g., "customInput-1")
    title,         //node title (e.g., "Input", "Text")
    children,      //node-specific content (passed as JSX)
    handles = {}   //which handles to show and their positions
}) => {
    return (
        <div></div>
    )
}