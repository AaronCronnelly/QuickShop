// Function to perform Dijkstra's algorithm on a graph
const dijkstra = (graph, startNode) => {
  // Check if the start node exists in the graph
  if (!graph[startNode]) {
      console.error(`Start node '${startNode}' not found in graph`);
      return { distances: {}, prev: {} }; // Return empty distances and prev objects
  }
  
  // Initialize distances, prev, and visited sets
  const distances = {};
  const prev = {};
  const visited = new Set();

  // Initialize distances for all nodes as Infinity, and prev as null
  for (let node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }
  
  // Set distance to startNode as 0 and add it to the priority queue
  distances[startNode] = 0;
  const pq = [startNode];

  // Loop until priority queue is empty
  while (pq.length) {
    // Sort priority queue based on distances
    pq.sort((a, b) => distances[a] - distances[b]);
    const currentNode = pq.shift(); // Pop the node with smallest distance
    if (!graph[currentNode]) {
      console.log("Graph structure:", graph);
      console.error("Missing node in graph:", currentNode);
      continue; // Skip this node if it doesn't exist in the graph
    }
    visited.add(currentNode); // Mark current node as visited

    // Iterate through neighbors of currentNode
    for (let neighbor in graph[currentNode].adjacent) {
      if (visited.has(neighbor)) continue; // Skip visited nodes
      // Calculate new distance to neighbor
      const newDistance = distances[currentNode] + graph[currentNode].adjacent[neighbor];
      // Update distance and previous node if new distance is shorter
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        prev[neighbor] = currentNode;
        pq.push(neighbor); // Add neighbor to priority queue
      }
    }
  }
  return { distances, prev }; // Return distances and prev objects
};  

// Function to check if the graph is fully connected starting from a specific node
export function isGraphConnected(graph, startNode) {
const { distances } = dijkstra(graph, startNode); // Get distances from startNode
// Check if any distance is still Infinity (indicating unreachable node)
return Object.values(distances).every(distance => distance !== Infinity);
}

// Function to reconstruct path from startNode to endNode using prev object
export function reconstructPath(prev, startNode, endNode) {
  const path = [];
  let currentNode = endNode;
  // Traverse prev object to reconstruct path
  while (currentNode !== null && currentNode !== startNode) {
    path.unshift(currentNode); // Add node to beginning of path array
    currentNode = prev[currentNode]; // Move to previous node
  }
  // Handle case when path cannot be found
  if (currentNode === startNode) {
    path.unshift(startNode); // Add startNode to path
  } else {
    console.error("No valid path found between", startNode, "and", endNode);
  }
  return path; // Return reconstructed path
}

// Function to get optimal path for shopping list traversal
export function getPathForShoppingList(graph, shoppingList, startNode) {
  console.log("Graph within pathfinding function:", graph);
  const { distances, prev } = dijkstra(graph, startNode); // Perform Dijkstra's algorithm

  // Sort shoppingList based on distances to startNode
  shoppingList.sort((a, b) => distances[a] - distances[b]);

  let path = [startNode]; // Initialize path with startNode
  let currentLocation = startNode; // Initialize currentLocation

  // Iterate through shoppingList to calculate path
  for (let itemNode of shoppingList) {
    const pathSegment = reconstructPath(prev, currentLocation, itemNode); // Reconstruct path to itemNode
    pathSegment.shift(); // Remove first element to avoid duplication
    path = [...path, ...pathSegment]; // Concatenate pathSegment to path
    currentLocation = itemNode; // Update currentLocation
  }

  // Reconstruct path to register and exit and concatenate to path
  const pathToRegister = reconstructPath(prev, currentLocation, 'register');
  pathToRegister.shift(); // Remove start node to avoid duplication
  path = [...path, ...pathToRegister]; // Concatenate path to register

  const pathToExit = reconstructPath(prev, 'register', 'exit'); // Reconstruct path to exit
  pathToExit.shift(); // Remove register node to avoid duplication
  path = [...path, ...pathToExit]; // Concatenate path to exit

  return path; // Return optimal path for shopping list traversal
}
