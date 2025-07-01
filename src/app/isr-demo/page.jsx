// app/isr-demo/page.js (Server Component - ISR)
// File này sẽ chạy trên server tại thời điểm BUILD và có thể tái tạo lại trong nền.
// KHÔNG cần "use client" ở đây.

import React from "react";
import IsrClientContent from "./IsrClientContent"; // Import Client Component

/**
 * Hàm fetch dữ liệu ở phía Server.
 * Hàm này sẽ được gọi và thực thi hoàn toàn trên server.
 * Đối với ISR, hàm này sẽ chạy tại thời điểm BUILD và sau đó có thể chạy lại
 * trong nền theo khoảng thời gian `revalidate` đã định.
 */
async function getIsrUserData() {
  // Lấy thời gian hiện tại để chứng minh dữ liệu được fetch khi nào
  const fetchTime = new Date().toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Kiểm tra xem hàm đang chạy tại thời điểm build hay trong nền
  const isBuilding = process.env.NEXT_PHASE === "phase-production-build";
  console.log(
    `[ISR - App Router] Bắt đầu tải dữ liệu ${
      isBuilding ? "tại thời điểm Build" : "trong nền"
    }...`
  );

  try {
    // Giả lập thời gian tải dữ liệu từ API (ví dụ: 5 giây)
    // Thời gian này chỉ ảnh hưởng đến quá trình build hoặc quá trình tái tạo nền.
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Gọi API để lấy dữ liệu người dùng
    // Next.js sẽ cache kết quả của `fetch`.
    // Để kích hoạt ISR, bạn cần truyền `next.revalidate` option vào `fetch`.
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        next: { revalidate: 10 }, // ⬅️ QUAN TRỌNG: Tái tạo lại trang tối đa mỗi 10 giây
      }
    );

    if (!response.ok) {
      throw new Error(
        `Lỗi HTTP ${isBuilding ? "tại thời điểm Build" : "trong nền"}: ${
          response.status
        }`
      );
    }

    const userData = await response.json();
    console.log(
      `[ISR - App Router] Dữ liệu đã tải thành công ${
        isBuilding ? "tại thời điểm Build" : "trong nền"
      }.`
    );

    // Trả về dữ liệu cùng với thời gian fetch để hiển thị trên UI
    return { userData, fetchTime };
  } catch (err) {
    console.error(
      `[ISR - App Router] Lỗi khi tải dữ liệu ${
        isBuilding ? "tại thời điểm Build" : "trong nền"
      }:`,
      err
    );
    throw err; // Ném lỗi để quá trình build/tái tạo có thể thất bại
  }
}

/**
 * Component Page chính cho ISR trong Next.js App Router.
 * Đây là một Server Component (mặc định). Next.js sẽ pre-render component này
 * thành HTML tĩnh tại thời điểm build bằng cách gọi `getIsrUserData`.
 * HTML này sau đó sẽ được phục vụ trực tiếp từ CDN (nếu có).
 *
 * Component này sẽ fetch dữ liệu ở server và sau đó truyền dữ liệu đó
 * xuống một Client Component để hiển thị và xử lý các tương tác client-side.
 */
export default async function IsrDemoPage() {
  let userData = null;
  let fetchTime = null;
  let error = null;

  try {
    // Fetch dữ liệu trực tiếp trong Server Component.
    // Đối với ISR, hàm này chạy một lần khi bạn chạy `npm run build`,
    // và sau đó chạy lại trong nền theo `revalidate` interval.
    const result = await getIsrUserData();
    userData = result.userData;
    fetchTime = result.fetchTime;
  } catch (err) {
    error = err.message;
  }

  // Truyền dữ liệu, thời gian fetch và lỗi xuống Client Component để hiển thị
  return (
    <IsrClientContent userData={userData} fetchTime={fetchTime} error={error} />
  );
}

// app/isr-demo/IsrClientContent.js (Client Component)
// File này chứa các React Hooks và logic tương tác phía client.
// PHẢI có "use client" ở đầu file.

// "use client"; // Dòng này sẽ nằm ở đầu file IsrClientContent.js

// import React, { useEffect } from 'react'; // Import React và useEffect

// /**
//  * Component Client để hiển thị nội dung và xử lý tương tác.
//  * Nhận dữ liệu đã được fetch từ Server Component qua props.
//  */
// function IsrClientContent({ userData, fetchTime, error }) {
//   // useEffect này sẽ chạy sau khi component đã được mount lên trình duyệt (hydration).
//   // Trong ISR, HTML ban đầu đã có nội dung, nên useEffect này chỉ là để kiểm tra
//   // rằng JavaScript đã được kích hoạt ở client.
//   React.useEffect(() => {
//     console.log('[ISR - App Router] Component đã mount và hydrate ở Client.');
//   }, []);

//   // 1. Hiển thị UI dựa trên dữ liệu đã nhận từ server (tại thời điểm build/revalidate)
//   if (error) {
//     // Hiển thị thông báo lỗi nếu có lỗi xảy ra tại thời điểm build/revalidate
//     return (
//       <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//         <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#EF4444' }}>Lỗi Tải Dữ Liệu (ISR - App Router)</h1>
//         <p style={{ fontSize: '1.2rem', color: '#DC2626' }}>Đã xảy ra lỗi: {error}</p>
//         <p style={{ marginTop: '10px', color: '#6B7280' }}>Vui lòng kiểm tra lại quá trình build/tái tạo.</p>
//       </div>
//     );
//   }

//   // 2. Hiển thị dữ liệu đã tải thành công từ server (tại thời điểm build/revalidate)
//   return (
//     <div style={{ padding: '20px', backgroundColor: '#eef2ff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//       <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4F46E5', marginBottom: '20px' }}>Hồ Sơ Người Dùng (ISR - App Router)</h1>
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
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Website:</span> <a href={`http://${userData.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>{userData.website}</a>
//             </p>
//             <p style={{ fontSize: '1.1rem', color: '#374151' }}>
//               <span style={{ fontWeight: 'bold', color: '#1F2937' }}>Công ty:</span> {userData.company.name}
//             </p>
//             <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '15px' }}>
//               Dữ liệu được tải lúc: <span style={{ fontWeight: 'bold' }}>{fetchTime}</span>
//             </p>
//           </>
//         ) : (
//           <p style={{ textAlign: 'center', color: '#6B7280' }}>Không có dữ liệu người dùng.</p>
//         )}
//       </div>
//       <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '20px' }}>
//         (Nội dung này được tạo tĩnh tại thời điểm build và tái tạo tăng cường.)
//       </p>
//     </div>
//   );
// }

// export default IsrClientContent;
