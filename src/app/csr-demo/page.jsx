"use client";
// pages/csr-demo.js (hoặc app/csr-demo/page.js nếu bạn dùng App Router)

import React, { useEffect, useState } from "react";

/**
 * Component Demo Client-Side Rendering (CSR) trong Next.js.
 * Component này sẽ tải dữ liệu hoàn toàn ở phía client sau khi trang đã được tải.
 */
function CsrDemoPage() {
  // 1. Khởi tạo state để lưu trữ dữ liệu người dùng và trạng thái tải
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("[CSR - App Router");
  /**
   * 2. Sử dụng useEffect để thực hiện tác vụ fetch dữ liệu.
   * Với dependency array rỗng ([]), useEffect sẽ chỉ chạy một lần
   * sau khi component được mount lên DOM của trình duyệt.
   * Đây là đặc trưng của Client-Side Rendering (CSR).
   */
  useEffect(() => {
    console.log("[CSR] useEffect: Component đã mount, bắt đầu tải dữ liệu...");

    // Hàm fetch dữ liệu bất đồng bộ
    const fetchUserData = async () => {
      try {
        // Giả lập thời gian tải dữ liệu từ API (ví dụ: 5 giây)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Giả lập một API endpoint trả về dữ liệu người dùng
        // Trong thực tế, bạn sẽ thay thế bằng fetch('/api/your-endpoint')
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );

        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data); // Cập nhật state với dữ liệu nhận được
        console.log("[CSR] useEffect: Dữ liệu đã tải thành công.");
      } catch (err) {
        setError(err.message); // Cập nhật state lỗi nếu có
        console.error("[CSR] useEffect: Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false); // Dù thành công hay thất bại, kết thúc trạng thái tải
        console.log("[CSR] useEffect: Trạng thái tải đã kết thúc.");
      }
    };

    fetchUserData(); // Gọi hàm fetch dữ liệu
  }, []); // Dependency array rỗng đảm bảo effect chỉ chạy một lần khi mount

  // 3. Hiển thị UI dựa trên trạng thái tải và dữ liệu
  if (loading) {
    // Hiển thị trạng thái tải trong khi dữ liệu đang được fetch
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f0f9ff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#0EA5E9" }}
        >
          Demo CSR
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#6B7280" }}>
          Đang tải dữ liệu hồ sơ người dùng...
        </p>
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #0EA5E9",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
            marginTop: "20px",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    // Hiển thị thông báo lỗi nếu có lỗi xảy ra
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fef2f2",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#EF4444" }}
        >
          Lỗi Tải Dữ Liệu
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#DC2626" }}>
          Đã xảy ra lỗi: {error}
        </p>
        <p style={{ marginTop: "10px", color: "#6B7280" }}>
          Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  // 4. Hiển thị dữ liệu đã tải thành công
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f9ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#0EA5E9",
          marginBottom: "20px",
        }}
      >
        Hồ Sơ Người Dùng (CSR)
      </h1>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {userData ? (
          <>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "10px",
                color: "#374151",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#1F2937" }}>Tên:</span>{" "}
              {userData.name}
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "10px",
                color: "#374151",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#1F2937" }}>
                Email:
              </span>{" "}
              {userData.email}
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "10px",
                color: "#374151",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#1F2937" }}>
                Điện thoại:
              </span>{" "}
              {userData.phone}
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "10px",
                color: "#374151",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#1F2937" }}>
                Website:
              </span>{" "}
              <a
                href={`http://${userData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6366F1", textDecoration: "underline" }}
              >
                {userData.website}
              </a>
            </p>
            <p style={{ fontSize: "1.1rem", color: "#374151" }}>
              <span style={{ fontWeight: "bold", color: "#1F2937" }}>
                Công ty:
              </span>{" "}
              {userData.company.name}
            </p>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            Không có dữ liệu người dùng.
          </p>
        )}
      </div>
      <p style={{ fontSize: "0.9rem", color: "#9CA3AF", marginTop: "20px" }}>
        (Nội dung này được render ở phía client sau khi tải dữ liệu.)
      </p>
    </div>
  );
}

export default CsrDemoPage;
