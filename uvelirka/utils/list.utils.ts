export function toggleItemInList<T>(list: T[], item: T, shouldPresent: boolean): T[] {
  const alreadyPresent = list.includes(item);

  if (alreadyPresent && !shouldPresent) {
    return list.filter(other => other !== item);
  }

  if (!alreadyPresent && shouldPresent) {
    return [...list, item];
  }

  return [
    ...list,
  ];
}
