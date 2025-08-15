// // walk() calls the function "callback" once for each node
// function walk(node, callback) {
//   callback(node);                                                   // do something with node
//   if (node.nodeName === 'P') {
//     console.log(`located the node: ${node.textContent}`);
//     return node;
//   }
//   for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
//     walk(node.childNodes[index], callback);                         // recursively call walk()
//   }
// }

// walk(document.body, node => {                                // log nodeName of every node
//   console.log(node.nodeName);
// });



function walk(node, callback) {
  if (callback(node)) return true;                         // stop if callback returns true
  for (let index = 0; index < node.childNodes.length; index += 1) {
    if (walk(node.childNodes[index], callback)) return true; // stop recursion early
  }
  return false;
}

// Example usage:
walk(document.body, node => {
  console.log(node.nodeName);
  if (node.nodeName === 'P') {
    return true; // stop traversal when target node is found
  }
  return false;
});




function walk(node, callback) {
  
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function numDirectIndirectChildren(node) {
  const counts = [];

  counts.push(node.childNodes.length);

  let indirect = 0;

  walk(node, () => {
    indirect += 1;
  });
}