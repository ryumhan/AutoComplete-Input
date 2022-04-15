const differentValue = (node1: HTMLInputElement, node2: HTMLInputElement) => {
  if (node1.value !== node2.value) {
    return true;
  }

  if (node1.checked !== node2.checked) {
    return true;
  }

  return false;
};

const differentDataTxt = (node1: HTMLElement, node2: HTMLElement) => {
  if (node1.dataset.txt !== node2.dataset.txt) {
    return true;
  }

  return false;
};

const isNodeChanged = (node1: HTMLElement, node2: HTMLElement) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentDataTxt(node1, node2)) {
    return true;
  }

  if (differentAttribute) {
    return true;
  }

  if (differentValue(<HTMLInputElement>node1, <HTMLInputElement>node2)) {
    return true;
  }

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (
  parentNode: HTMLElement,
  realNode: HTMLElement,
  virtualNode: HTMLElement
) => {
  // delete
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // create
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // update
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  // check all the children node
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(
      realNode,
      <HTMLElement>realChildren[i],
      <HTMLElement>virtualChildren[i]
    );
  }
};

export default applyDiff;
