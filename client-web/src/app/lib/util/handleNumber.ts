export const onNumericInputChange = (value: any) => {
  const reg = /^-?\d*(\.\d*)?$/;
  if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
    return value;
  }
  return false;
};
