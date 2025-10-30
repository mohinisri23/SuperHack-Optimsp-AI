// export stuff to CSV
export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n'); // probably should handle escaping better
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

// generates report for download
export const generateReport = () => {
  const reportData = { // hardcoded for now
    generatedAt: new Date().toISOString(),
    metrics: {
      revenue: '$2.3M',
      clients: 157,
      profitMargin: '23%',
      retention: '94.5%'
    },
    insights: [
      'Revenue growth accelerating at 12.5% MoM',
      'IT infrastructure optimization opportunity: $72K savings',
      'Client retention above industry average'
    ],
    recommendations: [
      'Consolidate SaaS tools for $48K annual savings',
      'Rightsize cloud infrastructure',
      'Implement proactive client health monitoring'
    ]
  };
  
  const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' }); // json format for now
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `msp-report-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  window.URL.revokeObjectURL(url);
};