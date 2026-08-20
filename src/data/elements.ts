export interface ElementData {
  number: number
  symbol: string
  nameKo: string
  /** 1~18족. 란타넘족/악티늄족(series가 있는 원소)은 표에서 3족 칸에 걸쳐 있으므로 group을 두지 않는다 */
  group?: number
  period: number
  series?: 'lanthanide' | 'actinide'
}

// [원자번호, 기호, 한글명, 족, 주기]
const MAIN: [number, string, string, number, number][] = [
  [1, 'H', '수소', 1, 1],
  [2, 'He', '헬륨', 18, 1],

  [3, 'Li', '리튬', 1, 2],
  [4, 'Be', '베릴륨', 2, 2],
  [5, 'B', '붕소', 13, 2],
  [6, 'C', '탄소', 14, 2],
  [7, 'N', '질소', 15, 2],
  [8, 'O', '산소', 16, 2],
  [9, 'F', '플루오린', 17, 2],
  [10, 'Ne', '네온', 18, 2],

  [11, 'Na', '소듐', 1, 3],
  [12, 'Mg', '마그네슘', 2, 3],
  [13, 'Al', '알루미늄', 13, 3],
  [14, 'Si', '규소', 14, 3],
  [15, 'P', '인', 15, 3],
  [16, 'S', '황', 16, 3],
  [17, 'Cl', '염소', 17, 3],
  [18, 'Ar', '아르곤', 18, 3],

  [19, 'K', '포타슘', 1, 4],
  [20, 'Ca', '칼슘', 2, 4],
  [21, 'Sc', '스칸듐', 3, 4],
  [22, 'Ti', '타이타늄', 4, 4],
  [23, 'V', '바나듐', 5, 4],
  [24, 'Cr', '크로뮴', 6, 4],
  [25, 'Mn', '망가니즈', 7, 4],
  [26, 'Fe', '철', 8, 4],
  [27, 'Co', '코발트', 9, 4],
  [28, 'Ni', '니켈', 10, 4],
  [29, 'Cu', '구리', 11, 4],
  [30, 'Zn', '아연', 12, 4],
  [31, 'Ga', '갈륨', 13, 4],
  [32, 'Ge', '저마늄', 14, 4],
  [33, 'As', '비소', 15, 4],
  [34, 'Se', '셀레늄', 16, 4],
  [35, 'Br', '브로민', 17, 4],
  [36, 'Kr', '크립톤', 18, 4],

  [37, 'Rb', '루비듐', 1, 5],
  [38, 'Sr', '스트론튬', 2, 5],
  [39, 'Y', '이트륨', 3, 5],
  [40, 'Zr', '지르코늄', 4, 5],
  [41, 'Nb', '나이오븀', 5, 5],
  [42, 'Mo', '몰리브데넘', 6, 5],
  [43, 'Tc', '테크네튬', 7, 5],
  [44, 'Ru', '루테늄', 8, 5],
  [45, 'Rh', '로듐', 9, 5],
  [46, 'Pd', '팔라듐', 10, 5],
  [47, 'Ag', '은', 11, 5],
  [48, 'Cd', '카드뮴', 12, 5],
  [49, 'In', '인듐', 13, 5],
  [50, 'Sn', '주석', 14, 5],
  [51, 'Sb', '안티모니', 15, 5],
  [52, 'Te', '텔루륨', 16, 5],
  [53, 'I', '아이오딘', 17, 5],
  [54, 'Xe', '제논', 18, 5],

  [55, 'Cs', '세슘', 1, 6],
  [56, 'Ba', '바륨', 2, 6],
  [72, 'Hf', '하프늄', 4, 6],
  [73, 'Ta', '탄탈럼', 5, 6],
  [74, 'W', '텅스텐', 6, 6],
  [75, 'Re', '레늄', 7, 6],
  [76, 'Os', '오스뮴', 8, 6],
  [77, 'Ir', '이리듐', 9, 6],
  [78, 'Pt', '백금', 10, 6],
  [79, 'Au', '금', 11, 6],
  [80, 'Hg', '수은', 12, 6],
  [81, 'Tl', '탈륨', 13, 6],
  [82, 'Pb', '납', 14, 6],
  [83, 'Bi', '비스무트', 15, 6],
  [84, 'Po', '폴로늄', 16, 6],
  [85, 'At', '아스타틴', 17, 6],
  [86, 'Rn', '라돈', 18, 6],

  [87, 'Fr', '프랑슘', 1, 7],
  [88, 'Ra', '라듐', 2, 7],
  [104, 'Rf', '러더포듐', 4, 7],
  [105, 'Db', '더브늄', 5, 7],
  [106, 'Sg', '시보귬', 6, 7],
  [107, 'Bh', '보륨', 7, 7],
  [108, 'Hs', '하슘', 8, 7],
  [109, 'Mt', '마이트너륨', 9, 7],
  [110, 'Ds', '다름슈타튬', 10, 7],
  [111, 'Rg', '뢴트게늄', 11, 7],
  [112, 'Cn', '코페르니슘', 12, 7],
  [113, 'Nh', '니호늄', 13, 7],
  [114, 'Fl', '플레로븀', 14, 7],
  [115, 'Mc', '모스코븀', 15, 7],
  [116, 'Lv', '리버모륨', 16, 7],
  [117, 'Ts', '테네신', 17, 7],
  [118, 'Og', '오가네손', 18, 7],
]

const LANTHANIDES: [number, string, string][] = [
  [57, 'La', '란타넘'],
  [58, 'Ce', '세륨'],
  [59, 'Pr', '프라세오디뮴'],
  [60, 'Nd', '네오디뮴'],
  [61, 'Pm', '프로메튬'],
  [62, 'Sm', '사마륨'],
  [63, 'Eu', '유로퓸'],
  [64, 'Gd', '가돌리늄'],
  [65, 'Tb', '터븀'],
  [66, 'Dy', '디스프로슘'],
  [67, 'Ho', '홀뮴'],
  [68, 'Er', '어븀'],
  [69, 'Tm', '툴륨'],
  [70, 'Yb', '이터븀'],
  [71, 'Lu', '루테튬'],
]

const ACTINIDES: [number, string, string][] = [
  [89, 'Ac', '악티늄'],
  [90, 'Th', '토륨'],
  [91, 'Pa', '프로트악티늄'],
  [92, 'U', '우라늄'],
  [93, 'Np', '넵투늄'],
  [94, 'Pu', '플루토늄'],
  [95, 'Am', '아메리슘'],
  [96, 'Cm', '퀴륨'],
  [97, 'Bk', '버클륨'],
  [98, 'Cf', '캘리포늄'],
  [99, 'Es', '아인슈타이늄'],
  [100, 'Fm', '페르뮴'],
  [101, 'Md', '멘델레븀'],
  [102, 'No', '노벨륨'],
  [103, 'Lr', '로렌슘'],
]

export const ELEMENTS: ElementData[] = [
  ...MAIN.map(([number, symbol, nameKo, group, period]) => ({ number, symbol, nameKo, group, period })),
  ...LANTHANIDES.map(([number, symbol, nameKo]) => ({
    number,
    symbol,
    nameKo,
    period: 6,
    series: 'lanthanide' as const,
  })),
  ...ACTINIDES.map(([number, symbol, nameKo]) => ({
    number,
    symbol,
    nameKo,
    period: 7,
    series: 'actinide' as const,
  })),
].sort((a, b) => a.number - b.number)

/** WoNsO 카드 색상 = 족(전이금속·란타넘족·악티늄족은 모두 민트) */
export const GROUP_COLORS: Record<number, string> = {
  1: '#e53935',
  2: '#fb8c00',
  3: '#26a69a',
  4: '#26a69a',
  5: '#26a69a',
  6: '#26a69a',
  7: '#26a69a',
  8: '#26a69a',
  9: '#26a69a',
  10: '#26a69a',
  11: '#26a69a',
  12: '#26a69a',
  13: '#fdd835',
  14: '#43a047',
  15: '#1e88e5',
  16: '#8e24aa',
  17: '#ec407a',
  18: '#9e9e9e',
}

export const GROUP_NAMES: Record<number, string> = {
  1: '1족 · 알칼리 금속',
  2: '2족 · 알칼리 토금속',
  13: '13족',
  14: '14족',
  15: '15족',
  16: '16족',
  17: '17족 · 할로젠',
  18: '18족 · 비활성기체',
}

export function groupColor(el: ElementData): string {
  if (el.series) return GROUP_COLORS[3]
  return GROUP_COLORS[el.group ?? 3]
}

export function groupLabel(el: ElementData): string {
  if (el.series === 'lanthanide') return '란타넘족 (3족)'
  if (el.series === 'actinide') return '악티늄족 (3족)'
  if (el.group && el.group >= 3 && el.group <= 12) return `${el.group}족 · 전이 금속`
  return GROUP_NAMES[el.group ?? 0] ?? `${el.group}족`
}

/** WoNsO 카드의 도형(주기) 매핑 — 2주기 하트, 3주기 삼각형, 4주기 사각형, 1·5·6·7주기 별(융합) */
export function periodShape(period: number): { icon: string; label: string } {
  if (period === 2) return { icon: '❤️', label: '하트 (2주기)' }
  if (period === 3) return { icon: '🔺', label: '삼각형 (3주기)' }
  if (period === 4) return { icon: '⬛', label: '사각형 (4주기)' }
  return { icon: '⭐', label: '별 · 융합 (1·5·6주기)' }
}
