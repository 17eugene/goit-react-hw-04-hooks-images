function Button({ btnName, className, onClick }) {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {btnName}
    </button>
  );
}

export { Button };
