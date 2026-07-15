export function pos16Svg(index: number, size = 40, monochrome = false): string {
  // 上位4bit: 開始位置（0-15）, 下位4bit: 終了位置（0-15）
  const start = (index >> 4) & 0x0f
  const end = index & 0x0f
  const pad = size * 0.1
  const gridSize = size - pad * 2
  const cell = gridSize / 4

  // 全ての描画は blockSize 内に収める
  const blockSize = cell * 0.78
  const halfBlock = blockSize / 2
  const lineWidth = Math.max(1, size * 0.03)
  const lineColor = monochrome ? '#e4e4e7' : '#22d3ee'
  // 16² pos は単色表現（明暗を強調）
  const baseFill = '#18181b'
  const neighborhoodFill = '#52525b'
  const overlapFill = '#a1a1aa'

  const posAt = (p: number) => {
    const col = p % 4
    const row = Math.floor(p / 4)
    return [pad + cell * (col + 0.5), pad + cell * (row + 0.5)] as const
  }

  const [sx, sy] = posAt(start)
  const [ex, ey] = posAt(end)

  const backgrounds: string[] = []
  const markers: string[] = []

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const idx = r * 4 + c
      const x = pad + cell * (c + 0.5)
      const y = pad + cell * (r + 0.5)
      const isStart = idx === start
      const isEnd = idx === end

      // 選出位置の周囲3×3（最大9マス）をハイライト（単色表現）
      const inStartNeighborhood = isInNeighborhood(idx, start)
      const inEndNeighborhood = isInNeighborhood(idx, end)
      let fill = baseFill
      if (inStartNeighborhood && inEndNeighborhood && start !== end) {
        fill = overlapFill
      } else if (inStartNeighborhood || inEndNeighborhood) {
        fill = neighborhoodFill
      }

      // 頂点周りのブロック背景（マス内に完全に収まる）
      const rx = blockSize * 0.18
      backgrounds.push(
        `<rect x="${x - halfBlock}" y="${y - halfBlock}" width="${blockSize}" height="${blockSize}" rx="${rx}" fill="${fill}" stroke="#3f3f46" stroke-width="${size * 0.005}"/>`,
      )

      if (isStart && start === end) {
        // 開始=終了: 二重円リング
        markers.push(
          `<circle cx="${x}" cy="${y}" r="${halfBlock * 0.9}" fill="none" stroke="${lineColor}" stroke-width="${lineWidth}"/>`,
        )
        markers.push(`<circle cx="${x}" cy="${y}" r="${halfBlock * 0.5}" fill="${lineColor}"/>`)
      } else if (isStart) {
        // 開始位置: 円リング
        markers.push(
          `<circle cx="${x}" cy="${y}" r="${halfBlock * 0.75}" fill="none" stroke="${lineColor}" stroke-width="${lineWidth}"/>`,
        )
        markers.push(`<circle cx="${x}" cy="${y}" r="${halfBlock * 0.3}" fill="${lineColor}"/>`)
      } else if (isEnd) {
        // 終了位置: 塗り潰し円
        markers.push(
          `<circle cx="${x}" cy="${y}" r="${halfBlock * 0.65}" fill="${lineColor}"/>`,
        )
      } else {
        // その他: 小さな点
        markers.push(`<circle cx="${x}" cy="${y}" r="${halfBlock * 0.18}" fill="#a1a1aa"/>`)
      }
    }
  }

  let line = ''
  if (start === end) {
    const loopR = halfBlock * 0.75
    line = `<circle cx="${sx}" cy="${sy}" r="${loopR}" fill="none" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-dasharray="${size * 0.03} ${size * 0.025}"/>`
  } else {
    const dx = ex - sx
    const dy = ey - sy
    const dist = Math.hypot(dx, dy)
    const angle = Math.atan2(dy, dx)

    // 開始・終了ともにブロックの内側から出す
    const startOffset = Math.min(halfBlock * 0.5, dist / 2)
    const endOffset = halfBlock * 0.65
    const stopT = Math.max(0, 1 - endOffset / dist)

    const lx1 = sx + dx * (startOffset / dist)
    const ly1 = sy + dy * (startOffset / dist)
    const lx2 = sx + dx * stopT
    const ly2 = sy + dy * stopT

    // 矢印もブロック内に収める
    const arrowLen = Math.min(size * 0.06, halfBlock * 0.4)
    const arrowAngle = Math.PI / 6
    const ax1 = lx2 - arrowLen * Math.cos(angle - arrowAngle)
    const ay1 = ly2 - arrowLen * Math.sin(angle - arrowAngle)
    const ax2 = lx2 - arrowLen * Math.cos(angle + arrowAngle)
    const ay2 = ly2 - arrowLen * Math.sin(angle + arrowAngle)

    line = `<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-linecap="round"/><polygon points="${lx2},${ly2} ${ax1},${ay1} ${ax2},${ay2}" fill="${lineColor}"/>`
  }

  return `<svg viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet">${backgrounds.join('')}${markers.join('')}${line}</svg>`
}

function isInNeighborhood(idx: number, center: number): boolean {
  const col = idx % 4
  const row = Math.floor(idx / 4)
  const cCol = center % 4
  const cRow = Math.floor(center / 4)
  return Math.abs(col - cCol) <= 1 && Math.abs(row - cRow) <= 1
}

export function pos16Notation(index: number): string {
  const start = (index >> 4) & 0x0f
  const end = index & 0x0f
  return `${start.toString(2).padStart(4, '0')}-${end.toString(2).padStart(4, '0')}`
}

export function pos16Detail(index: number): string {
  const start = (index >> 4) & 0x0f
  const end = index & 0x0f
  return `${start}→${end}`
}
