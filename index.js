const express = require('express');//モジュールの読み込み
const path = require('path'); // pathモジュールはファイルのパスを扱うのに便利
const app = express();//Expressアプリケーションのインスタンスを作成
const port = 3000;//ポート番号の設定

//静的ファイルの提供
// publicディレクトリ内の静的ファイルを提供
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); //URLエンコードされたデータのパース
app.use(express.json()); //JSONデータのパース

//ejsの設定
app.set('view engine', 'ejs'); //テンプレートエンジンにEJSを設定
app.set('views', __dirname + '/views'); //ビューのディレクトリを設定

//ルーティング
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// ルーティングファイルをインポート
const todoRoutes = require('./routes/todoRoutes');
// TODO関連のルーティングを '/todos' のパスでマウント
app.use('/todos', todoRoutes);

//サーバー起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
