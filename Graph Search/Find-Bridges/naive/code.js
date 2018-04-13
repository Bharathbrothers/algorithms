//Depth First Search Exploration Algorithm to test connectedness of the Graph (see Graph Algorithms/DFS/exploration), without the tracer & logger commands
function DFSExplore (graph, source) {
	var stack = [ [source, null] ], visited = {};
	var node, prev, i, temp;

	while (stack.length > 0) {
		temp = stack.pop ();
		node = temp [0];
		prev = temp [1];

		if (!visited [node]) {
			visited [node] = true;
			//logger.print (node);

			/*
			if (prev !== undefined && graph [node] [prev]) { tracer.visit (node, prev).wait (); console.log ('tracer ' + prev + ', ' + node); }
			else { tracer.visit (node).wait (); console.log ('tracer ' + node); }
			*/

			for (i = 0; i < graph.length; i++) {
				if (graph [node] [i]) {
					stack.push ([i, node]);
				}
			}
		}
	}

	return visited;
}

function findBridges (graph) {
	var tempGraph, bridges = [], visited;

	for (var i = 0; i < graph.length; i++) {
		for (var j = 0; j < graph.length; j++) {
			if (graph [i] [j]) {	//check if an edge exists
				logger.print ('Deleting edge ' + i + '->' + j + ' and calling DFSExplore ()');
				tracer.visit (j, i).wait ();
				tracer.leave (j, i).wait ();

				tempGraph = JSON.parse (JSON.stringify (graph));
				tempGraph [i] [j] = 0;
				tempGraph [j] [i] = 0;
				visited = DFSExplore (tempGraph, 0);

				if (Object.keys (visited).length === graph.length) {
					logger.print ('Graph is CONNECTED. Edge is NOT a bridge');
				}
				else {
					logger.print ('Graph is DISCONNECTED. Edge IS a bridge');
					bridges.push ([i,j]);
				}
			}
		}
	}

	return bridges;
}

var bridges = findBridges (G);

logger.print ('The bridges are: ');
for (var i in bridges) {
	logger.print (bridges [i] [0] + ' to ' + bridges [i] [1]);
}
logger.print ('NOTE: A bridge is both ways, i.e., from A to B and from B to A, because this is an Undirected Graph');