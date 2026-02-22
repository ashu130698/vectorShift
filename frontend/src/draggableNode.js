// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  //Handle drag start
    const onDragStart = (event, nodeType) => {
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify({nodeType}));
      event.dataTransfer.effectAllowed = 'move';
    };
  //Handle drag end
  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
  };
    return (
      <div
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        draggable
        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing"
      >
        {label}
      </div>
    );
  };
  