[![oparts](https://img.shields.io/badge/∅-oparts-6a5acd)](https://github.com/elzup/oparts-spec)

# 4up4

`4↑4 = 4^4 = 256` 通りのパターン図形を可視化するプレビューです。

## ファイル

- `index.html` — 4つの表現方法で 256 通りをグリッド表示
  - **辺スタイル**: 4辺 × 2bit の線スタイル
  - **2×2 記号**: `0 / \ X` の記号を 2×2 に配置
  - **4隅パス**: 四隅の座標を順に結ぶパス（最大3本の線分）
  - **丸点+線**: 上位4bit で四隅の丸点、下位4bit で1本の線分

## 使い方

ブラウザで `4up4-preview.html` を開きます。

```bash
open index.html
```

または GitHub Pages で公開しています: https://elzup.github.io/4up4/
