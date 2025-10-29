# ポートフォリオサイト

モダンでシンプルなワンページ構成の研究 / 開発ポートフォリオサイト。  
GitHub Pagesでホスティングすることを前提にした静的HTML/CSS/JS構成です。

## セクション構成
- Hero: 名前 / 肩書き / ソーシャルアイコン / CTA
- About: 研究領域 / 経歴 / フォーカス
- Skills: 言語 / ML / ツール / フォーカス
- Publications: 代表論文カード + Google Scholarリンク
- Contact: 連絡先 / GitHub / LinkedIn
- Footer: 年度自動更新

## 技術
- HTML5 + セマンティックタグ
- CSS3 (Flexbox / Grid / カスタムプロパティ / ダークモード)
- JavaScript (ES6 / IntersectionObserver / localStorage)
- フォント: Google Fonts (Inter)
- アイコン: Font Awesome

## 主な機能
| 機能 | 説明 |
|------|------|
| スムーススクロール | 内部リンククリックで滑らかに移動 |
| ダークモード | localStorageで状態保持 |
| モバイルナビ | ハンバーガーメニュー / ESCキー閉じる |
| セクションフェードイン | IntersectionObserverで遅延表示 |
| 年自動更新 | フッターの年号をJSで更新 |

## ディレクトリ構成
```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── projects/   (必要なら画像追加)
└── README.md
```

## カスタマイズ手順
1. `index.html` 内の `Your Name` / プロフィール / ソーシャル各URLを自身のものに変更
2. Publications セクションの代表論文カードを編集
3. メールアドレス・SNSリンクを更新
4. 画像を使用する場合は `images/` に追加し、`<img>` を適所に記載

## Git 初期化 (ローカル)
```
git init
git add .
git commit -m "Initial portfolio site"
```

## GitHub リポジトリ作成 & Push
1. GitHubで新規リポジトリ作成 (例: `portfolio`)
2. リモート追加:
   ```
   git remote add origin https://github.com/USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. GitHub Pages設定:
   - Repository Settings → Pages → Branch: `main` / Folder: `/ (root)`
   - 保存すると数分以内に公開 (URL: `https://USERNAME.github.io/portfolio/` もしくはユーザー/組織サイトの場合は `https://USERNAME.github.io/`)

## 更新ワークフロー
```
# 変更後
git add .
git commit -m "Update: publication section / styles"
git push
```

## ライセンス
公開方針に応じて必要なら MIT 等を追加。

## TODO (今後のアイディア)
- OG画像 / SEO最適化
- PWA対応
- 軽量画像最適化 (WebP)
- 代表論文フィルタリング機能
- ダークモードトグルのアニメーション強化

必要な追加希望があれば指示してください。
