const sortByCol = (arr, col = 1) => {
  col = col - 1
  return arr.sort((a, b) => a[col].toString().localeCompare(b[col]));
}


let a = []

a = [
  ['a', 1],
  ['b', 2],
  ['d', 5],
  ['e', 6],
  ['f', 2],
  ['c', 8],
]

let header = ['Alpha', 'Numeric']
let results = sortByCol(a, 1, true)
let report = [header, ...results]
console.log(report)