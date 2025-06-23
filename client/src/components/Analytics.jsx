import React from 'react';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

const chapters = [
  { chapterName: 'Arjuna Visada Yoga', verseCount: 47 },
  { chapterName: 'Sankhya Yoga', verseCount: 72 },
  { chapterName: 'Karma Yoga', verseCount: 43 },
  { chapterName: 'Jnana Karma Sanyasa Yoga', verseCount: 42 },
  { chapterName: 'Karma Sanyasa Yoga', verseCount: 29 },
  { chapterName: 'Dhyana Yoga', verseCount: 47 },
  { chapterName: 'Gyaan Vigyana Yoga', verseCount: 30 },
  { chapterName: 'Akshara Brahma Yoga', verseCount: 28 },
  { chapterName: 'Raja Vidya Yoga', verseCount: 34 },
  { chapterName: 'Vibhooti Yoga', verseCount: 42 },
  { chapterName: 'Vishwaroopa Darshana Yoga', verseCount: 55 },
  { chapterName: 'Bhakti Yoga', verseCount: 20 },
  { chapterName: 'Ksetra Ksetrajna Vibhaaga Yoga', verseCount: 35 },
  { chapterName: 'Gunatraya Vibhaga Yoga', verseCount: 27 },
  { chapterName: 'Purushottama Yoga', verseCount: 20 },
  { chapterName: 'Daivasura Sampad Vibhaga Yoga', verseCount: 24 },
  { chapterName: 'Sraddhatraya Vibhaga Yoga', verseCount: 28 },
  { chapterName: 'Moksha Sanyaas Yoga', verseCount: 78 },
];

const chapterNames = chapters.map((chapter) => chapter.chapterName);
const verseCounts = chapters.map((chapter) => chapter.verseCount);

const BarChart = () => {
  const data = {
    labels: chapterNames,
    datasets: [
      {
        label: 'Verse Counts',
        data: verseCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Verse Counts per Chapter' },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} width={300} height={200} />
      <p className="text-sm text-center mt-2">
        The bar chart visually represents the verse counts for each chapter of the Bhagavad Gita, showing clear differences in verse quantities between chapters.
      </p>
    </div>
  );
};

const PieChart = () => {
  const data = {
    labels: chapterNames,
    datasets: [
      {
        label: 'Verse Counts',
        data: verseCounts,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} width={300} height={200} />
      <p className="text-sm text-center mt-2">
        The pie chart breaks down the total verse counts proportionally for each chapter, highlighting how much each chapter contributes to the whole.
      </p>
    </div>
  );
};

const LineChart = () => {
  const data = {
    labels: chapterNames,
    datasets: [
      {
        label: 'Verse Counts',
        data: verseCounts,
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Trend of Verse Counts Across Chapters' },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} width={300} height={200} />
      <p className="text-sm text-center mt-2">
        The line chart displays the trend of verse counts across all chapters, emphasizing the variations in verse numbers from one chapter to the next.
      </p>
    </div>
  );
};

const DoughnutChart = () => {
  const data = {
    labels: chapterNames,
    datasets: [
      {
        label: 'Verse Counts',
        data: verseCounts,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} width={300} height={200} />
      <p className="text-sm text-center mt-2">
        Similar to the pie chart, the doughnut chart shows verse count proportions for each chapter, but with a hollow center for a distinct look.
      </p>
    </div>
  );
};

const RadarChart = () => {
  const data = {
    labels: chapterNames,
    datasets: [
      {
        label: 'Verse Counts',
        data: verseCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Comparison of Verse Counts Between Chapters' },
    },
  };

  return (
    <div>
      <Radar data={data} options={options} width={300} height={200} />
      <p className="text-sm text-center mt-2">
        The radar chart provides a comparison of verse counts across all chapters by displaying them in a circular grid.
      </p>
    </div>
  );
};

const ChartComponent = () => {
  return (
    <div className="container mx-auto p-4 width-full">
      <h2 className="text-3xl font-bold text-center mb-6">Bhagavad Gita Chapter Analysis</h2>
      <div className="flex flex-wrap justify-center gap-20">
        <div className="bg-white shadow-lg rounded-lg p-4 w-80">
          <BarChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 w-80">
          <PieChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 w-80">
          <LineChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 w-80">
          <DoughnutChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 w-80">
          <RadarChart />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;