const FormButton = ({ children, disabled = false, className }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-primary text-background rounded-md text-xl font-bold py-2 disabled:bg-primary/60 disabled:cursor-wait ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton;
