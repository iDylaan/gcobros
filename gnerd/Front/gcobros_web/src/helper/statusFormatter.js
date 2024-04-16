export const getStatusTransaction = (status) => {
  switch (status) {
    case "succeeded":
      return "Aprobado";
    case "pending":
      return "Pendiente";
    default:
      return "Error";
  }
};
