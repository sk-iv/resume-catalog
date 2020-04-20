const timeDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  months = months <= 0 ? 0 : months;
  return { years: parseInt(months / 12, 10), months: months % 12 };
};
export default timeDiff;
