import { useState } from "react";

export default function RefreshAlertsButton({ contractInstance, setAlerts, setCount }) {
  const [loading, setLoading] = useState(false);

  const refreshAlerts = async () => {
    try {
        setLoading(true);
        const count = await contractInstance.getAlertCount();
        setCount(Number(count));

        const alertsArray = [];

        for (let i = 0; i < count; i++) {
            const [transcription, timestamp] = await contractInstance.getAlert(i);
            alertsArray.push({ transcription, timestamp: Number(timestamp) });
        }

        setAlerts(alertsArray.reverse()); // Newest first
    } catch (error) {
        console.error("Error refreshing alerts:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <button
    onClick={refreshAlerts}
    disabled={loading}
    className="absolute top-20 right-6 flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 ease-in-out rounded-md shadow-sm text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 transition-transform ${loading ? "animate-spin" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
    {loading ? "Refreshing..." : "Refresh"}
  </button>
  
  );
}
