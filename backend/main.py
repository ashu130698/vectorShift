from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Any]
    edges: List[Any]

def check_is_dag(nodes, edges):
    graph = {n["id"]: [] for n in nodes}
    for e in edges:
        if e["source"] in graph:
            graph[e["source"]].append(e["target"])

    visited = set()
    rec_stack = set()

    def has_cycle(node):
        visited.add(node)
        rec_stack.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(node)
        return False

    for node in nodes:
        if node["id"] not in visited:
            if has_cycle(node["id"]):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": check_is_dag(nodes, edges)
    }