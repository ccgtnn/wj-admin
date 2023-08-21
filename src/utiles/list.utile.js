export function getMaxOrd(list) {
  return Math.max(...list.map((e) => e.ord), 0)
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

  const firstItem = list.find(
    (item) => item.ord === Math.min(...list.map((item) => item.ord))
  )
  if (!firstItem || firstItem.id == id) return []

  // swap ord values
  const tempOrd = item.ord
  item.ord = firstItem.ord
  firstItem.ord = tempOrd

  return [item, firstItem]
}

export function moveItemToEnd(list, id) {
  const item = list.find((item) => item.id == id)
  if (!item) return []

  const lastItem = list.find(
    (item) => item.ord === Math.max(...list.map((item) => item.ord))
  )
  if (!lastItem || lastItem.id == id) return []

  // swap ord values
  const tempOrd = item.ord
  item.ord = lastItem.ord
  lastItem.ord = tempOrd

  return [item, lastItem]
}
