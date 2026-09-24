const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('trade_history.db');

db.all("SELECT * FROM trades", [], (err, rows) => {
    if (err) {
        console.error("Database tracking read error:", err.message);
        return;
    }

    if (rows.length === 0) {
        console.log("📊 System Ledger Status: No entries found in the database logs yet.");
        db.close();
        return;
    }

    const totalTrades = rows.length;
    const wins = rows.filter(row => row.status === 'WIN').length;
    const losses = rows.filter(row => row.status === 'LOSS').length;
    const winRatio = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(2) : 0;

    console.log("=============================================");
    console.log("      PLUTO FX JAVASCRIPT PERFORMANCE LEDGER   ");
    console.log("=============================================");
    console.log(`Total Positions Logged : ${totalTrades}`);
    console.log(`✅ Winning Positions   : ${wins}`);
    console.log(`⚠️ Losing Positions    : ${losses}`);
    console.log(`📈 Calculated Win Rate : ${winRatio}%`);
    console.log("=============================================");

    db.close();
});
