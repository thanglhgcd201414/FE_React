const formatter = (value: any) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const parser = (value: any) => {
  return value.replace(/\$\s?|(,*)/g, "");
};

export {
  formatter,
  parser
}