class Edge 
{
	constructor (sender, receiver)
	{
		this.sender = sender;
		this.receiver = receiver;
	}
}

class Graph 
{
	constructor ()
	{
		this.nodes = new Set();
		this.adjacencyMatrix = new Map();
	}
	AddNode(node)
	{
		this.adjacencyMatrix.set(node, new Set());
	}
	AddEdge(Edge)
	{
		// направление не учитываем иначе нельзя будет начинать с любой вершины
		this.adjacencyMatrix.get(Edge.sender).add(Edge.receiver);
		// если направленную то эту строку убрать
		this.adjacencyMatrix.get(Edge.receiver).add(Edge.sender);
	}
	
	//----------------------------------------------------------------------------//
	// обход в глубину
	DFS(startNode, visited)
	{
		visited.add(startNode);
		let availableNodes = this.adjacencyMatrix.get(startNode);
		console.log('result: %d', startNode);
		for (let node of availableNodes)
		{
			if (!visited.has(node))
			{
				visited.add(node);
				this.DFS(node, visited);
			}
		}
	}

	//----------------------------------------------------------------------------//
	// обход в ширину
	BFS(startNode)
	{
		var visited = new Set();
		var unknownNode = new Array();
		unknownNode.push(startNode);
		while (unknownNode.length > 0)
		{
			let availableNodes = this.adjacencyMatrix.get(unknownNode[0]);
			for (let node of availableNodes)
			{
				if (!visited.has(node))
					unknownNode.push(node);
			}
			console.log('node: %d', unknownNode[0]);
			visited.add(unknownNode[0]);
			unknownNode.shift();
		}
	}
}


//----------------------------------------------------------------------------//
// по массиву построить граф
function main(array)
{
	var g = new Graph();
	let nodes = new Set();
	for (var i = 0; i < array.length; i++)
	{
		nodes.add(array[i][0]);
		nodes.add(array[i][1])
	}
	for (let node of nodes)
		g.AddNode(node);
	for (var i = 0; i < array.length; i++)
	{
		g.AddEdge(new Edge(array[i][0], array[i][1]));
	}
	let visited = new Set();
	console.log('________BFS_____________');
	g.BFS(0);
	console.log('________DFS_____________');
	g.DFS(0, visited);
}

main([[0, 3], [1, 3], [2, 3], [4, 3], [5, 4], [1,6]]);
