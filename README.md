[![oparts](https://img.shields.io/badge/∅-oparts-6a5acd)](https://github.com/elzup/oparts-spec)

# fupf glyph

`4↑4 = 4^4 = 256` 通りのパターン図形を可視化するプレビューです。

## ファイル

- `index.html` — 複数の表現方法で 256 通りをグリッド表示
  - **ボーダー**: 4辺 × 2bit の線スタイル
  - **タイル**: `4^4 map type`
  - **ポリゴン**: `4^4 map type`
  - **4隅パス**: `4^4 graph type`
  - **丸点+線**: `2^4 * 4^2 type`
  - **Aster**: `2^8 type`
  - **ダイス**: `4^4 box type`（サイコロ展開図から1枚欠けた十字。上右下左の各マスで四隅から1つ選び閉路に結ぶ。辺の配色は単色/45°/位置/グラデを選択可）

## 使い方

ブラウザで `index.html` を開きます。

```bash
open index.html
```

または GitHub Pages で公開しています: https://elzup.github.io/fupf/
