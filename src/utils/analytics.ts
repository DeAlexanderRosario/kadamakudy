/**
 * Log a custom event to Google Analytics 4 (GA4).
 * @param action The event name (e.g., 'click', 'submit_form').
 * @param params Optional event parameters (e.g., event_category, event_label, value).
 */
export const trackEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  } else {
    // In development mode, log to console for debugging
    if (import.meta.env.DEV) {
      console.log(`[Analytics Event] ${action}`, params);
    }
  }
};
