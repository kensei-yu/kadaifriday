//mysql2 を利用して TODOリストのデータを取得するモデル


//mysql2 の 読み込み
const mysql = require('mysql2/promise'); // PromiseベースのAPIをインポート
// データベース接続設定
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPPのMySQLのデフォルトパスワードは空
    database: 'todo_app_2025', // 作成したTODOアプリ用データベース名
    waitForConnections: true,
    connectionLimit: 10, // 最大接続数
    queueLimit: 0
});

// DBの処理を記述
// DBの処理を記述


//mysql2 を利用して TODOリストをよみこむ
async function getTodos() {
    let connection;
    try{
        //プールからDBのコネクションを取得
        connection = await pool.getConnection();
        const query = `
            SELECT id, title, is_completed, created_at
            FROM mytodos
            ORDER BY created_at DESC
        `
        const [rows] = await connection.execute(query);
        return rows;
    }catch(error){
        console.error('TODO一覧の取得エラー:', error);
        return rows;
    }finally{
        // 接続をプールに戻す
        if (connection) connection.release();
    }
}

// TODOを追加する関数
async function addTodo(title) {
    let connection;
    try{
        //プールからDBのコネクションを取得
        connection = await pool.getConnection();
        const query = `
            INSERT INTO mytodos (title, is_completed, created_at)
            VALUES (?, 0, NOW())
        `
        const [result] = await connection.execute(query, [title]);
        return result.insertId; // 挿入されたレコードのIDを返す
    }catch(error){
        console.error('TODO追加のエラー:', error);
        throw error;
    }finally{
        // 接続をプールに戻す
        if (connection) connection.release();
    }
}

//削除処理
async function deleteTodo(id) {
    let connection;
    try{
        //プールからDBのコネクションを取得
        connection = await pool.getConnection();
        const query = `DELETE FROM mytodos WHERE id = ?`;
       
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows; // 削除されたレコードの数を返す
    }catch(error){
        console.error('TODO削除のエラー:', error);
        throw error;
    }finally{
        // 接続をプールに戻す
        if (connection) connection.release();
    }
}

// 完了、未完了のトグル処理
async function toggleTodo(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `
            UPDATE mytodos
            SET is_completed = (1 - is_completed)
            WHERE id = ?
        `;
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows; // 更新されたレコードの数を返す
    } catch (error) {
        console.error('TODO完了状態のトグルエラー:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}


//エクスポート
module.exports = { getTodos, addTodo , deleteTodo , toggleTodo };