function getDate() {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth();
  var day = dateObj.getDate();

  const reformatMonth = () => {
    let result = "";
    (month <= 10) & (month === 0)
      ? (result = `0${month + 1}`)
      : (result = month);

    return result;
  };
  const reformatDay = () => {
    let result = "";
    day <= 10 ? (result = `0${day}`) : (result = day);
    return result;
  };
  const finalMonth = reformatMonth();
  const finalDay = reformatDay();

  let date = `${year}-${finalMonth}-${finalDay}`;

  return date;
}

export const date = getDate();
