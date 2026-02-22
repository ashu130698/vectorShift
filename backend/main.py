from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')  # Changed to POST
def parse_pipeline(data: dict):  # Accept JSON dict
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    # Simple validation: pipeline received
    if not nodes or not edges:
        return {'status': 'error', 'message': 'nodes and edges required'}
    
    return {
        'status': 'success',
        'message': 'Pipeline parsed successfully',
        'node_count': len(nodes),
        'edge_count': len(edges)
    }