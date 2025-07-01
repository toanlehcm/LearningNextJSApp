// app/ssr-demo/page.js (Server Component - Mặc định)
// File này sẽ chạy trên server để fetch dữ liệu và render HTML ban đầu.
// Không cần "use client" ở đây.

import React from "react";
import SsrClientContent from "./SsrClientContent"; // Import Client Component

/**
 * Hàm fetch dữ liệu ở phía Server.
 * Hàm này sẽ được gọi và thực thi hoàn toàn trên server.
 */
async function fetchUserDataOnServer() {
  console.log("[SSR - App Router] Bắt đầu tải dữ liệu trên Server...");

  try {
    // Giả lập thời gian tải dữ liệu từ API trên server (ví dụ: 2 giây)
    // Thời gian này sẽ ảnh hưởng đến TTFB (Time To First Byte)
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Gọi API để lấy dữ liệu người dùng
    // Trong môi trường server, bạn có thể gọi API nội bộ hoặc API bên ngoài.
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error(`Lỗi HTTP trên Server: ${response.status}`);
    }

    const userData = await response.json();
    console.log("[SSR - App Router] Dữ liệu đã tải thành công trên Server.");
    return userData;
  } catch (err) {
    console.error("[SSR - App Router] Lỗi khi tải dữ liệu trên Server:", err);
    throw err; // Ném lỗi để component gọi có thể bắt và xử lý
  }
}

/**
 * Component Page chính cho SSR trong Next.js App Router.
 * Đây là một Server Component (mặc định), nó có thể là async và fetch dữ liệu trực tiếp.
 * Sau khi fetch dữ liệu, nó sẽ truyền dữ liệu đó xuống một Client Component để hiển thị UI
 * và xử lý các tương tác phía client (như useEffect).
 */
export default async function SsrDemoPage() {
  let userData = null;
  let error = null;

  try {
    // Fetch dữ liệu trực tiếp trong Server Component.
    // Next.js sẽ chờ hàm này hoàn tất trước khi render HTML của trang.
    userData = await fetchUserDataOnServer();
  } catch (err) {
    error = err.message;
  }

  // Truyền dữ liệu và lỗi xuống Client Component để hiển thị
  return <SsrClientContent userData={userData} error={error} />;
}

// app/ssr-demo/SsrClientContent.js (Client Component)
// File này chứa các React Hooks và logic tương tác phía client.
// PHẢI có "use client" ở đầu file.

// "use client"; // Dòng này sẽ nằm ở đầu file SsrClientContent.js

// import React, { useEffect } from 'react'; // Import React và useEffect

// /**
//  * Component Client để hiển thị nội dung và xử lý tương tác.
//  * Nhận dữ liệu đã được fetch từ Server Component qua props.
//  */
// function SsrClientContent({ userData, error }) {
//   // useEffect này sẽ chạy sau khi component đã được mount lên trình duyệt (hydration).
//   // Trong SSR, HTML ban đầu đã có nội dung, nên useEffect này chỉ là để kiểm tra
//   // rằng component đã được hydrate (kích hoạt JavaScript) ở client.
//   React.useEffect(() => {
//     console.log('[SSR - App Router] Component đã mount và hydrate ở Client.');
//   }, []);

//   // 1. Hiển thị UI dựa trên dữ liệu đã nhận từ server
//   if (error) {
//     // Hiển thị thông báo lỗi nếu có lỗi xảy ra trên server
//     return (
//       <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//         <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#EF4444' }}>Lỗi Tải Dữ Liệu (SSR - App Router)</h1>
//         <p style={{ fontSize: '1.2rem', color: '#DC2626' }}>Đã xảy ra lỗi: {error}</p>
//         <p style={{ marginTop: '10px', color: '#6B7280' }}>Vui lòng thử lại sau.</p>
//       </div>
//     );
//   }

//   // 2. Hiển thị dữ liệu đã tải thành công từ server
//   return (
//     <div style={{ padding: '20px', backgroundColor: '#ecfdf5', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//       <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10B981', marginBottom: '20px' }}>Hồ Sơ Người Dùng (SSR - App Router)</h1>
//       <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
//         {userData ? (
//           <>
//             <p style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#374151' }}>
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Tên:</span> {userData.name}
//             </p>
//             <p style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#374151' }}>
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Email:</span> {userData.email}
//             </p>
//             <p style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#374151' }}>
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Điện thoại:</span> {userData.phone}
//             </p>
//             <p style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#374151' }}>
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Website:</span> <a href={`http://${userData.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', text-decoration: 'underline' }}>{userData.website}</a>
//             </p>
//             <p style={{ fontSize: '1.1rem', color: '#374151' }}>
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Công ty:</span> {userData.company.name}
//             </p>
//           </>
//         ) : (
//           <p style={{ textAlign: 'center', color: '#6B7280' }}>Không có dữ liệu người dùng.</p>
//         )}
//       </div>
//       <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '20px' }}>
//         (Nội dung này được render ở phía server và gửi về trình duyệt - App Router.)
//       </p>
//     </div>
//   );
// }

// export default SsrClientContent;
