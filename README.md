## 環境
```
node -v
18.16.0
```

ライブラリインストール
```
yarn
```

## Getting Started

下記コマンドで、ローカルサーバーを立ち上げる:

```
yarn dev
```
[http://localhost:3001](http://localhost:3001) で、サーバーが立ち上がっているか、ブラウザで確認。
QRコーダーなどをローカルで立ち上げたい場合、HTTPSで立ち上げる
```
yarn dev:proxy
```

[https://localhost:3001](https://localhost:3001) で、サーバーが立ち上がっているか、ブラウザで確認。

下記コマンドでbuildして立ち上げる
```
yarn build
yarn start
```
