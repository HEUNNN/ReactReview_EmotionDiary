export const StringDate = (date) => {
  //new component가 렌더링 될때 사용할것이다.
  return date.toISOString().slice(0, 10);
};
