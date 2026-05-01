export const StatBox = ({ label, value }: { label: string; value: number }) => {
  return (
    <div>
      <p>
        {label}: {label.includes("Ingreso") ? `$${value}` : value}
      </p>
    </div>
  );
};
