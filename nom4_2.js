
class Edge 
{
	constructor (sender, receiver, weight)
	{
		this.sender = sender;
		this.receiver = receiver;
		this.weight = weight;
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
	
	shortestPath(array, nodes, start, finish) 
	{
		let mas = [];
		let index = 0;
		let temp = 0;
		let visited = [];
		let result = [];
		for (let i = 0; i < nodes.size; i++)
		{
			mas[i] = [];
			visited[i] = false;
			result[i] = 100;
		}
		for (let i = 0; i < nodes.size; i++)
			for (let j = 0; j < nodes.size; j++)
			{
				mas[i][j] = 0;
			}
		for (var i = 0; i < array.length; i++)
		{
			mas[array[i][0]][array[i][1]] = array[i][2];
			mas[array[i][1]][array[i][0]] = array[i][2];
		}
		//console.log(mas);
		result[start] = 0;
		for (let count = 0; count < nodes.size - 1; count++)
		{
			let min = 100;
			for (let i = 0; i < nodes.size; i++)
			{
				if (!visited[i] && result[i] <= min)
				{
					min = result[i]; 
					index=i;
				}
			}
			temp = index;
			visited[temp] = true;
			for (i = 0; i < nodes.size; i++)
			{
				if (!visited[i] && mas[temp][i] && result[temp] != 100 && result[temp] + mas[temp][i] < result[i])
				{
					result[i] = result[temp] + mas[temp][i];
				}
			}
		}
		console.log(result);
		console.log('result path %d', result[finish]);
		return result[finish];
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
	g.shortestPath(array, nodes, 0, 2);
}

main([[0, 3, 1], [1, 3, 1], [2, 3, 1], [4, 3, 1], [5, 4, 1], [1,6, 1]]);
