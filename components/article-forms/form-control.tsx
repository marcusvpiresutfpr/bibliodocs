type Props = {
  children: React.ReactNode;
  label: string;
  error: string;
};

export default function ArticleFormControl({ children, label, error }: Props) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
      <label className="label">
        <span className="label-text-alt text-error">{error || " "}</span>
      </label>
    </div>
  );
}
