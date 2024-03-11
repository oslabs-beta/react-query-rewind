// const formatTimestamp = () => {
//   const now = new Date();
//   let hours = now.getHours();
//   const minutes = now.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours || 12; // the hour '0' should be '12'
//   const minutesStr = minutes < 10 ? '0' + minutes : minutes;

//   return `${hours}:${minutesStr} ${ampm}`;
// };

// export default formatTimestamp;

const formatTimestamp = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = now.toLocaleDateString('en-US', options);
  return formattedDate;
};

export default formatTimestamp;
