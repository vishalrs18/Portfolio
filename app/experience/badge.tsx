"use client";
import { useEffect, useState, useRef } from "react";
import Script from "next/script";

const Badge = ({ dataShareBadgeId = "..." }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!badgeRef.current) return;

    // Observe when Credly injects the iframe
    const observer = new MutationObserver((mutations) => {
      const hasIframe = badgeRef.current?.querySelector("iframe");
      if (hasIframe) {
        setIsLoaded(true);
        observer.disconnect();
      }
    });

    observer.observe(badgeRef.current, {
      childList: true,
      subtree: true,
    });

    // Fallback: hide loader after max wait time
    const timeout = setTimeout(() => setIsLoaded(true), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {!isLoaded && (
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <div className="h-64 w-64 bg-gray-400 rounded-lg"></div>
          <div className="h-4 w-32 bg-gray-400 rounded"></div>
        </div>
      )}
      <div
        ref={badgeRef}
        className={`transition-opacity duration-300 iframe-container ${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        }`}
      >
        <div
          data-iframe-width="100"
          data-iframe-height="270"
          data-share-badge-id={dataShareBadgeId}
          data-share-badge-host="https://www.credly.com"
          className="w-full"
        ></div>
      </div>

      <Script src="https://cdn.credly.com/assets/utilities/embed.js" />
    </div>
  );
};

export default Badge;
