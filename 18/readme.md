# [Advent of Code 2019](https://adventofcode.com/2019/day/18)

## Data Test

```javascript
const data = [
  '#################################################################################',
  '#.....#.....#...................#...#..d#.........#.......#.......#.......I.....#',
  '#.###P###.#.#.#####.###########.#.#.#.#.#.###.###.###.###.###.###.#######.#####.#',
  '#.#...#...#...#.....#.......#.#.#.#.#.#.#...#...#...#.#.#...#.#f#.#.....#.#...#.#',
  '#.#.###.#######O#####.#####.#.#.#.#.#.#.###.###.###.#.#.###.#.#.#.#.###.#.#.#.#.#',
  '#.#.....#.....#.#.....#...#.#.....#...#.#.#.#.#.#.....#.......#.N...#...#.#.#.#.#',
  '#.#######.#.###.#.#####.#.#.#.#########.#.#.#.#.#.#############.#######.#.#.#.#.#',
  '#.#.......#.....#.....#.#...#.#.......#.#.....#.#.#...........#.#.....#.#.#.#.#.#',
  '#.#####.#############.#.#######.#####.#.#.#####.###.#########.#.#.###.#.###.#.#.#',
  '#.....#.#.#.........#.#.........#.#...#.#.#.....#...#.......#.#.#...#.#.....#.#.#',
  '#.###.#Q#.#.#.#####.#.###########.#.###.#.#.###.#.#########.#.#####.#.#######.#.#',
  '#.#.#.#.#...#.#...#.#.#.....#.....#.#.#.#.#.#...#.........#.#...#...#.....#.#.G.#',
  '#.#.#.#.###.#.#.#.###.#####.#.#.###.#.#.#.#.#############.#.###.#.#######.#.###.#',
  '#...#.#...#.#.#.#...#.....#...#.#...#.#.#.#.....H.......#.#...#.#.#...#...#.....#',
  '###.#.###.###.#.###.#####.#####.#.###.#.#.#######.#######.#.###.#.#.#.#.###.#####',
  '#.#.#...#.#...#.#.#.#...#.#.....#.#...#.#...#...#.........#...#...#.#.#.#...#...#',
  '#.#.###.#.#.#.#.#.#.#.#.#.#.#.###.#.###.###.#.#.#############.#####.###.###.###.#',
  '#.#.#...#...#.#...#...#.....#.#...#.....#.#...#.#.........#...#...#...#...#...#.#',
  '#.#.#.###########.###########.#.###.#####.#####.#####.#.#.#.#.#.#.###.###.###.#.#',
  '#...#.#.........#.#.#...#.....#...#.....#.....#.....#.#.#...#...#.......#.#.....#',
  '#.###.#.#######.#.#.#.#.#######.#.#####.#.#.#######.#.#.###############.#.#####.#',
  '#.#...#l#.....#...#.#.#.......#.#.....#.#.#.......#.#.#.#.....#.........#..w..#.#',
  '#.#.#.#.#####.#####.#########.#######.#.#.#######.#.###.#.###############.###.#.#',
  '#.#.#.#.#.....#.......#...#...#.....#.#.#.#.....#.......#.#.....#.......#...#.#.#',
  '#.#.###.#.###.#####.#.#.#.#.###.###.#.###.#.###.#.#######.#.###.#.#####.#####.#.#',
  '#.#...#.#...#.......#.#.#.#.....#...#...#.#.#.#.#...#...#...#...#.#.#...#...#.#.#',
  '#.###C#.###.#.#######.#.#.#######.#####.#.#.#.#.###.#.#.#####.###.#.#.###.#.#.#.#',
  '#...#.#...#.#.#...#.....#...#...#.......#.#.#.#...#.#.#.....#...#.#.#q..#.#...#.#',
  '#.###.###.#.#.#.#.#########.###.###########.#.###.###.#####.###.#.#.###.#.#####.#',
  '#.#.....#.#.#.#.#...#.............#.....#...#...#.....#...#...#...#.#...#.....#x#',
  '#.#.###.#.#.###.###.#############.###.#.#.#####.#######.###.#######.#.#######.###',
  '#.#.#...#.#.......#.#.....#.....#.....#.#.......#.....#...#.#.......#.#.....#...#',
  '#.#.#####.#.#######.#.###.#.###.#.#############.###.#.###.#.#.#.#####.#.###.###.#',
  '#.#.#...#.#.#.....#...#.#.....#.#.#.....#.....#...#.#...#.#...#.......#.#.......#',
  '#W#.#.#.#.###.###.###.#.#######.###.###.#.#######.#.###.#.#############.#######.#',
  '#.#...#.#.....#.#...#.....#...#......m#.#.#.....#...#.#.#.........#.......#.....#',
  '#.#####.#######.###.###.###.#.#########.#.#.#.#######.#.###.#####.#######.#######',
  '#.....#.......#.....#...#...#.........#.#.#.#.#.......#.....#...#.#.R...#.......#',
  '#####.#####.###.#########.###########.#.#.#.#.#.###.#########.###.#.###.#######.#',
  '#.........#r..............#.................#.....#.................#c..........#',
  '#######################################.@.#######################################',
  '#.....#...........#.......#.....#.............#.....#.......#.............#.....#',
  '#.#.###.###.#####.#.#####.#.###.#.#.###.#.###.#.#.#.###.###.#.#######.###.#.#.#.#',
  '#.#.......#...#.#...#...#...#...#.#...#.#...#.#.#.#.....#.#.#...#...#.#.#.#.#.#.#',
  '#############.#.#####.#######.###.###.#.#.#.###.#.#######.#.#####.#.#.#.#.###.###',
  '#.......#.....#.....#.......#...#.#...#.#.#.....#.#.......#.....#.#...#.....#...#',
  '#.#####.#.#######.#.#.###.#####.###.###.#.#######.#.###########.#.#########.###.#',
  '#...#.#.#.#.....#.#.....#.....#...#.#.#.#.......#.#.#.......#...#.........#.....#',
  '#.#.#.#.#.#Y###.#####.#####.#####.#.#.#.#.#######.#.#.#####.#.#######.###.#####.#',
  '#.#.#...#.#.#.#u#...#.#...#.#...#.#.#...#.#.......#.#...#...#.#.....#...#p..#...#',
  '#.#.#.###.#.#.#.#.#.###.#.#.#.#.#.#.#######.#######.###.#.###.###.#.#######.#####',
  '#.#.#.....#...#.#b#...#.#.#...#.#.#.#...#...#.........#.#.........#.......#.....#',
  '#.#.#.#######.#.#.###.#.#.#####.#.#.#.#.#.#######.###.#.#################.#####.#',
  '#.#.#.#...#...#.#...#.B.#..z#...#.#...#.#.......#...#.........#.....#.......#...#',
  '#.#.###.#.#.###.###.#######.#.###.#.###.#######.#############.#.###.#######.#.#.#',
  '#.#...#.#.#y#t#...#.#.....#.#.#...#.#...#.......#.....#.#.....#.#.#.....S.#.#.#.#',
  '#E###.#.#T#.#.###.#.#.#####.#.#.###.#.###.#######.###.#.#.#####.#.#######.#.#.#L#',
  '#...#.#.#...#.J.#...U.#.....#...#.M.#...#.......#.#...#...#...#.#.....#...#...#.#',
  '###.#.#.#####.#.#######Z#####.###.#####.#######.#.#.###.###.#.#.#####.#.#######.#',
  '#s..#.#.......#.....#...#.V.#...#.#...#.#.....#.#.#...#...#.#...#.....#...#.....#',
  '#.###.#############.#.###.#.###.###.#.#.#.###.#.#.###.#####.#####.#######.###.###',
  '#...#.....#.A.....#.#.#...#.#...#...#.#.#.#.....#...#.#...#...#.........#...#...#',
  '#######.#.#.#####.#.#####.#.###.#.###.#.#.#########.#.#.#.#####.#####.#.###.#####',
  '#.....#.#.#...#.#j..#..k..#...#...#...#.#...........#...#.....#.#...#.#...#.....#',
  '#.###.#.#####.#.#####.#######.#####.###.#.###################.#.#.#.#.#.#######.#',
  '#...#.#.....#....a#.#...#..v..#...#.#...#.#...........#...#.#...#.#...#.#.......#',
  '###.#.###.#.#####.#.#.#.#.#####.#.#.###.#.###.#######.#.#.#.#####.#####.#.#######',
  '#...#.....#.....#.#...#.#.#...#.#...#...#.#...#.....#.#.#.#...#.#.....#.#.#.....#',
  '#.#############.#.#####.#.###.#.#####.#.#.#.###.#####.#.#.#.#.#.#####.###.#.#.#.#',
  '#.#...........#.#...#...#.X.#.#.#.....#.#...#.#...#...#o#...#...#...#...#.#.#.#.#',
  '#.###.#########.###.#.#####.#.#.#.###.#.#####.#.#.#.###.#######.#.#####.#.###.#.#',
  '#...#.............#.K.#...#.#.#.#.#...#.#.....#.#...#...#.#.....#.....#.#..e..#.#',
  '###.#.###########.#####.#.#.#.#.###.###.#.#.###.#####.#.#.#.#####.#.#.#.#######.#',
  '#...#.#....g....#n....#.#...#.#.#...#...#.#...#.#...#.#.#...#...#.#.#.#.#.....#.#',
  '#.#####.#######.#######.#####.#.#.###.###.###.#.#.#.###.#.###.#.###.#.#.#.#.###.#',
  '#.....#...#...#...#...#.#...#...#.#...#.#...#.#...#.....#.#...#.....#.#...#...#.#',
  '#.###.###.#.#.###.#.#.#.#.###.###.#.###.###.#.###########.#.#########.#######.#.#',
  '#.#.#...#.#.#...#.#.#.#.#...#.#...#.#...#...#.......#.....#.#.......#...#.....#.#',
  '#.#.###.#F#.###.#.#.#.#.#.#.#.###.#.#.#.#.#####D#####.#####.#.#####.###.#.#####.#',
  '#.....#.....#...#i..#...#.#.......#...#.#.....#.............#.....#.....#....h..#',
  '#################################################################################'
];
```

## Expected result

```sh
1:
2:
```