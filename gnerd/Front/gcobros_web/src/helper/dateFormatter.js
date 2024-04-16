//? Epoch date format to readable date format
export const epochToDate = (epochDate) => {
  const date = new Date(epochDate * 1000);

  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("es-MX", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  return `${day} de ${
    month.charAt(0).toUpperCase() + month.slice(1)
  } del ${year}`;
};

export const epochToPeriod = (firstEpochDate) => {
  const date = new Date(firstEpochDate * 1000);

  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const lastDay = lastDate.toLocaleString("en-US", {day: "numeric"});
  const month = lastDate.toLocaleString("es-MX", { month: "long" });
  const year = lastDate.getFullYear();
  
  return `1 - ${lastDay} de ${
    month.charAt(0).toUpperCase() + month.slice(1)
  } de ${year}`;
};
