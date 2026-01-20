import "dotenv/config";
import { Pool } from "pg";
import { landingMock } from "../lib/data/landing.mock";

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // 현재 데이터 확인
    console.log("=== 현재 DB 데이터 확인 ===");
    const currentData = await pool.query("SELECT * FROM landing_content");

    if (currentData.rows.length > 0) {
      console.log("현재 저장된 데이터:");
      console.log(JSON.stringify(currentData.rows[0], null, 2));
    } else {
      console.log("저장된 데이터가 없습니다.");
    }

    // 목데이터로 교체
    console.log("\n=== 목데이터로 교체 ===");

    // 기존 데이터 삭제
    await pool.query("DELETE FROM landing_content");

    // 새 데이터 삽입
    await pool.query(
      `INSERT INTO landing_content (id, content, "updatedAt", "createdAt")
       VALUES ($1, $2, NOW(), NOW())`,
      ["default", JSON.stringify(landingMock)]
    );

    console.log("목데이터로 교체 완료!");

    // 교체 후 확인
    const newData = await pool.query("SELECT * FROM landing_content");
    console.log("\n=== 교체 후 데이터 ===");
    console.log("ID:", newData.rows[0].id);
    console.log("Updated:", newData.rows[0].updatedAt);

  } catch (error) {
    console.error("에러 발생:", error);
  } finally {
    await pool.end();
  }
}

main();
