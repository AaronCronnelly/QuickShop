export function dijkstra(graph, startNode) {
    const distances = {};
    const prev = {};
    const visited = new Set();
  
    // Initialize distances and prev objects
    for (let node in graph) {
      distances[node] = Infinity;
      prev[node] = null;
    }
    distances[startNode] = 0;
  
    // The priority queue is represented by an array for simplicity
    const pq = [startNode];
  
    while (pq.length !== 0) {
      pq.sort((a, b) => distances[a] - distances[b]);
  
      const currentNode = pq.shift(); // The node with the smallest distance
      visited.add(currentNode);
  
      const neighbors = graph[currentNode].adjacent;
      for (let neighbor in neighbors) {
        if (visited.has(neighbor)) continue; // Skip visited nodes
  
        const newDistance = distances[currentNode] + neighbors[neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          prev[neighbor] = currentNode;
          pq.push(neighbor);
        }
      }
    }
  
    return { distances, prev };
  }

export function reconstructPath(prev, startNode, endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      path.unshift(currentNode); // Add the node to the beginning of the path array
      currentNode = prev[currentNode]; // Move to the next node
    }
    if (path[0] !== startNode) return [];
    return path;
  }

export function getPathForShoppingList(graph, shoppingList, startNode) {
    const { distances, prev } = dijkstra(graph, startNode);
  
    shoppingList.sort((a, b) => distances[a] - distances[b]); // Sort by distance to start
  
    let path = [startNode];
    let currentLocation = startNode;
  
    for (let itemNode of shoppingList) {
      const pathSegment = reconstructPath(prev, currentLocation, itemNode);
      pathSegment.shift(); // Remove the first element to avoid duplication
      path = [...path, ...pathSegment];
      currentLocation = itemNode;
    }
  
    return path;
  }
  
  