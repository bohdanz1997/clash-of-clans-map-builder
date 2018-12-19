export const nodeEachTwice = cb => (nodeList1, nodeList2) => {
  nodeList1.each(node1 => nodeList2.each(node2 => cb(node1, node2)))
}
