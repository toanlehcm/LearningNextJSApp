// app/ssg-demo/SsgClientContent.js (Client Component)
"use client"; // RẤT QUAN TRỌNG: Đánh dấu đây là Client Component

import React, { useEffect } from "react";

/**
 * Component Client để hiển thị nội dung và xử lý tương tác.
 * Nhận dữ liệu đã được fetch từ Server Component qua props.
 */
function SsgClientContent({ userData, error }) {
  // useEffect này sẽ chạy sau khi component đã được mount lên trình duyệt (hydration).
  // Trong SSG, HTML ban đầu đã có nội dung, nên useEffect này chỉ là để kiểm tra
  // rằng JavaScript đã được kích hoạt ở client.
  useEffect(() => {
    console.log("[SSG - App Router] Component đã mount và hydrate ở Client.");
  }, []);

  // 1. Hiển thị UI dựa trên dữ liệu đã nhận từ server (tại thời điểm build)
  if (error) {
    // Hiển thị thông báo lỗi nếu có lỗi xảy ra tại thời điểm build
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
          Lỗi Tải Dữ Liệu (SSG - App Router)
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#DC2626" }}>
          Đã xảy ra lỗi tại thời điểm Build: {error}
        </p>
        <p style={{ marginTop: "10px", color: "#6B7280" }}>
          Vui lòng kiểm tra lại quá trình build.
        </p>
      </div>
    );
  }

  // 2. Hiển thị dữ liệu đã tải thành công từ server (tại thời điểm build)
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e0f2fe",
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
          color: "#0284C7",
          marginBottom: "20px",
        }}
      >
        Hồ Sơ Người Dùng (SSG - App Router)
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
        (Nội dung này được tạo tĩnh tại thời điểm build và phục vụ từ CDN.)
      </p>
    </div>
  );
}

export default SsgClientContent;
