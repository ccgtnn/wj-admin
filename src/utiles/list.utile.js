export function getMaxOrd(list) {
  return Math.max(...list.map((e) => e.ord), 0)
}

export function getMinOrd(list) {
  return Math.min(...list.map((e) => e.ord), 0)
}

export function changeListOrder(list, id, to) {
  // Находим индекс элемента
  const index = list.findIndex((item) => item.id === id)
  const targetIndex = index + to

  // Проверяем, существует ли элемент и корректно ли смещение
  if (index < 0 || targetIndex < 0 || targetIndex >= list.length) return []

  const item = list[index]
  const temp = list[targetIndex]

  // swap ord values
  const tempOrd = temp.ord
  temp.ord = item.ord
  item.ord = tempOrd

  return [item, temp]
}

export function moveItemToStart(list, id) {
  const item = list.find((item) => item.id == id)
  if (!item) return []

  const minOrd = getMinOrd(list)

  if (minOrd == item.ord) return []

  item.ord = minOrd - 1

  return [item]
}

export function moveItemToEnd(list, id) {
  const item = list.find((item) => item.id == id)
  if (!item) return []

  const maxOrd = getMaxOrd(list)

  if (maxOrd == item.ord) return []

  item.ord = maxOrd + 1

  return [item]
}
