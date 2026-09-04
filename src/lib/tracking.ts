export interface TrackingData {
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  device_info?: string;
}

/**
 * Capture marketing parameters, referrer, and device information safely in browser.
 */
export function getClientTrackingData(): TrackingData {
  if (typeof window === "undefined") {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);

  // Extract UTM parameters
  const utm_source = urlParams.get("utm_source") || undefined;
  const utm_medium = urlParams.get("utm_medium") || undefined;
  const utm_campaign = urlParams.get("utm_campaign") || undefined;
  const utm_term = urlParams.get("utm_term") || undefined;
  const utm_content = urlParams.get("utm_content") || undefined;

  // Source page (pathname + hash)
  const source_page = window.location.pathname + (window.location.hash || "");

  // Document referrer
  const referrer = document.referrer || undefined;

  // Device description
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const device_info = `${isMobile ? "Mobile" : "Desktop"} (${window.innerWidth}x${window.innerHeight})`;

  return {
    source_page,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    referrer,
    device_info,
  };
}
