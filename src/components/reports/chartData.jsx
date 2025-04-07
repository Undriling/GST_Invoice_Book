import { Chart } from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import useInvoice_Collection from "../../hooks/useInvoice_Collection";

const ChartData = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { invoices, loading } = useInvoice_Collection();

  useEffect(() => {
    if (!invoices.length || !chartRef.current) return;

    if (chartInstance.current && chartInstance.current instanceof Chart) {
      chartInstance.current.destroy();
    }

    const monthWiseTotal = getMonthlWiseTotal(invoices);

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Month-Wise Sales in " + new Date().getFullYear(),
            data: monthWiseTotal,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: "rgba(255, 255, 255, 0.8)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `₹${value}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current && chartInstance.current instanceof Chart) {
        chartInstance.current.destroy();
      }
    };
  }, [invoices]);

  const getMonthlWiseTotal = (invoices) => {
    const monthlyTotals = Array(12).fill(0);

    invoices.forEach((invoice) => {
      const timestamp = invoice?.date?.seconds;
      if (!timestamp) return;

      const date = new Date(timestamp * 1000);
      const monthIndex = date.getMonth();
      monthlyTotals[monthIndex] += invoice.productsTotal || 0;
    });

    return monthlyTotals;
  };

  return (
    <div className="w-full h-96 flex items-center justify-center">
      {loading ? (
        <p>Loading chart...</p>
      ) : invoices.length === 0 ? (
        <p className="text-gray-500 text-lg">No invoices to display</p>
      ) : (
        <canvas ref={chartRef} />
      )}
    </div>
  );
};

export default ChartData;
