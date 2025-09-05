// routes/todoRoutes.js


// Expressモジュールをインポート
const express = require('express');
// Expressルーターを作成
const router = express.Router();

//  TODOモデルの読み込み
const todoModel = require('../models/todoModel');

// /todos以下のルーティング処理
router.get('/', async (req, res) => {
  // TODO一覧を取得
  const todos = await todoModel.getTodos();
  const data = { todos: todos };
  // EJSテンプレートをレンダリングしてレスポンスを返す
  res.render('todos/index.ejs', data);
});


// POSTリクエストで新しいTODOを追加
router.post('/', async (req, res) => {
    const title = req.body.title; // フォームから送信されたタイトルを取得
    if (title && title.trim() !== '') {
        await todoModel.addTodo(title.trim()); // TODOを追加
    }  
    res.redirect('/todos'); // TODO一覧ページにリダイレクト
});

// TODOの削除
router.post('/delete/:id', async (req, res) => {
    const todoId = req.params.id;
    const deleteFlag = req.query._method;
    //console.log('削除するTODOのID:', todoId);
    //console.log('削除フラグ:', deleteFlag);
    if (deleteFlag === 'DELETE') {
        //削除処理
        await todoModel.deleteTodo(todoId);
        res.redirect('/todos'); // TODO一覧ページにリダイレクト
    }
    res.redirect('/todos'); // TODO一覧ページにリダイレクト
});

//完了未完了
router.post('/toggle/:id', async (req, res) => {
    const todoId = req.params.id;
    const toggleFlag = req.query._method;
    console.log('トグルするTODOのID:', todoId);
    console.log('トグルフラグ:', toggleFlag);
    // 完了、未完了のトグル処理
});


// ルーティング を エクスポートに代入
module.exports = router;
