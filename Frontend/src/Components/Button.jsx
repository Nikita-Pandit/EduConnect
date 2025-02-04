// src/components/ui/button.jsx
const Button = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
  
  export { Button };
  