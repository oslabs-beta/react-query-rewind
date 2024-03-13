function formatTimestamp() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = now.toLocaleDateString('en-US', options);
  return formattedDate;
}

export default formatTimestamp;
