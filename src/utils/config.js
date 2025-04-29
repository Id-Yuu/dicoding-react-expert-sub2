const postedAt = (date) => {
  const timeUnits = [
    { unit: 'hari', divisor: 86400 },
    { unit: 'jam', divisor: 3600 },
    { unit: 'menit', divisor: 60 },
    { unit: 'detik', divisor: 1 }
  ];

  const diffInSeconds = Math.floor((new Date() - new Date(date)) / 1000);

  for (const { unit, divisor } of timeUnits) {
    const value = Math.floor(diffInSeconds / divisor);
    if (value > 0) {
      return `${value} ${unit} lalu`;
    }
  }

  return 'baru saja';
};

export default postedAt;