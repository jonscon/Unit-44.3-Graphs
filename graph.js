class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
    return;
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => {
      this.nodes.add(vertex);
      return;
    }) 
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS (recursive approach)
  depthFirstSearch(start) {
    let seen = new Set();
    let result = [];

    function traverse(vertex) {
      if (!vertex) return null;
      // visit node
      seen.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if (!seen.has(neighbor)) {
          return traverse(neighbor);
        }
      })
    }

    traverse(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let result = [];

    while (toVisitQueue.length) {
      // shift the first item out from queue
      let currNode = toVisitQueue.shift();
      // add node value to result array
      result.push(currNode.value);

      // check if each neighbor has been seen. if not, add to queue
      currNode.adjacent.forEach(neighbor => {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      })
    }
    return result;
  }
}

module.exports = {Graph, Node}