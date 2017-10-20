function dateDMY(date) {
  if (date === null) return '';
  const m = date.getMonth() + 1;
  const d = date.getDate();
  let sd = '';

  if (d < 10)    {
    sd = '0';
  }
  sd += d.toString(10);
  let sm = '';

  if (m < 10)    {
    sm = '0';
  }
  sm += m.toString(10);

  return `${sd }.${ sm}.${ date.getFullYear()}`;
}

module.exports =  dateDMY;
