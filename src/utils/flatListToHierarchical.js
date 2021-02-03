export const flatListToHierarchical = (
  menuItems = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const childrenOf = {};
  const tree = [];

  menuItems.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;

    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    // newItem.type = `link`;

    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });

  return tree;
};
