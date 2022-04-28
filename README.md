# Project chat-exam-service

## 開發規劃

後端使用 socket io ，與利用 redis 的 pubsub 來實現聊天室功能，開發主要分為以下幾個階段

1. 規劃開發功能，與網路研究
2. 建立專案初始化架構
3. 建立開發相關環境
4. 建立主要業務邏輯
5. 建立 socket 與 redis pubsub
6. redis 快取優化

之前在專案上有碰過因 multi node 導致 handshake 與實際溝通的 node 不同，所以預計會採用以下方法處理
https://socket.io/docs/v4/using-multiple-nodes/

## Enviroment requiredment

    node -v  v14.16.1
    redis
    mysql or mariadb

## How to use?

### Create environment

    docker-compose up -d

### Install dependencies

    npm install

### Build

    npm run build

### Create fake data

    npm run seed

### Run

    npm run start
