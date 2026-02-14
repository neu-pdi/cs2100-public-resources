---
sidebar_position: 29
lecture_number: 29
title: Graphs and Union-Find
---

# Union-Find

## Union-Find

Union Find slides: https://github.com/neu-pdi/cs2100-public-resources/blob/main/docs/pages/Union%20Find.pdf (Polls below)
<embed src="https://github.com/neu-pdi/cs2100-public-resources/blob/main/docs/pages/Union%20Find.pdf" type="application/pdf" width="100%" height="600px" title="Union Find Slides" />

Poll: How might we implement find(node)?
1. As long as node has no children, re-point the node variable to its parent. When node has children, return it
2. As long as node is not its own parent, re-point the node variable to its parent. When node is its own parent, return it
3. If node is its own parent, return the node. Otherwise, return find(node.parent)
4. If node's parent is null, return the node. Otherwise, return find(node.parent)

Poll: How might we implement union(node1, node2)?
1. Find both nodes' roots. If the two roots are different, then make one of the roots the other root's parent
2. Find both nodes' roots. If the two roots are the same, then do nothing
3. If the two nodes have different parents, then make one of the nodes the other node's parent
4. If the two nodes have the same parent, then make one of the nodes the other node's parent

Poll: Why do we check if root1.rank == root2.rank before incrementing root2.rank?
1. That's wrong - we should always increment root2.rank
2. That's wrong - we should always increment both root1.rank and root2.rank
3. If they have the same rank, then they have the same height in the tree. If root2 becomes root1's parent, then root2 is going higher up in the tree
4. If they have the same rank, then they have the same number of children. If root2 becomes root1's parent, then root2 is getting another child

Poll: What does the Union-Find algorithm do?
1. ​​It groups nodes into sets such that none of the nodes in each set are connected to each other, and all of the edges are between two sets
2. It groups nodes into sets such that the nodes in each set are connected to each other, and there are no edges between two sets
3. It groups edges into sets such that none of the sets of edges have any nodes in common
4. It works on undirected graphs (all edges go both ways)
5. It works on directed graphs (all edges are one-way)
