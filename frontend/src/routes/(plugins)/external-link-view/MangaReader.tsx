import React, { useEffect, useRef } from "react";
import { Webview } from "@tauri-apps/api/webview";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { LogicalPosition, LogicalSize } from "@tauri-apps/api/dpi";

export default function MangaReader() {
  const containerRef = useRef(null);
  const webviewRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let resizeObserver = null;

    const initWebview = async () => {
      const container = containerRef.current;
      if (!container || !isMounted) return;

      const rect = container.getBoundingClientRect();
      const appWindow = getCurrentWindow();
      const webviewLabel = `manga-view-${Date.now()}`;

      // Khởi tạo Webview theo đúng example bạn gửi
      const webview = new Webview(appWindow, webviewLabel, {
        url: "https://truyenqqno.com/truyen-tranh/thuong-ruou-dem-khuya-la-bi-quyet-de-giu-gin-hanh-phuc-hon-nhan-17841", // Link test
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });

      // Lắng nghe sự kiện tạo thành công theo example
      webview.once("tauri://created", () => {
        if (!isMounted) {
          webview.close();
          return;
        }

        webviewRef.current = webview;
        console.log("✅ Webview successfully created and attached!");

        // Chỉ bắt đầu theo dõi Resize sau khi webview đã sẵn sàng
        resizeObserver = new ResizeObserver(() => {
          if (!isMounted || !webviewRef.current) return;
          const newRect = container.getBoundingClientRect();

          // Cập nhật vị trí/kích thước dùng Logical
          webviewRef.current.setPosition(
            new LogicalPosition(newRect.x, newRect.y),
          );
          webviewRef.current.setSize(
            new LogicalSize(newRect.width, newRect.height),
          );
        });
        resizeObserver.observe(container);
      });

      // Lắng nghe lỗi theo example
      webview.once("tauri://error", (e) => {
        console.error("❌ An error happened creating the webview:", e);
      });
    };

    // Chạy hàm khởi tạo
    initWebview();

    return () => {
      isMounted = false;
      if (resizeObserver) resizeObserver.disconnect();
      if (webviewRef.current) {
        webviewRef.current.close().catch(() => {});
        webviewRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      {/* TabBar */}
      <div
        style={{
          height: "60px",
          backgroundColor: "#2d3748",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h2>App của tôi - Tab Manga</h2>
      </div>

      {/* Vùng chứa (Container) - Lưu ý: background transparent để không che webview nếu nó nằm dưới */}
      <div
        ref={containerRef}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        {/* Webview native sẽ được vẽ đè lên vùng này */}
      </div>
    </div>
  );
}
