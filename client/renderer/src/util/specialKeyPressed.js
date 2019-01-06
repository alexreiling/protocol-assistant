export default (e, key) => {
  switch (key) {
    case 'enter':
      return (e.charCode===13)
    default:
      return false;
  }
}