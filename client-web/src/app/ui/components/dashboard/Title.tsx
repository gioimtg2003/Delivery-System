export function Title({ title }: Readonly<{ title: string }>): JSX.Element {
  return (
    <div className="text-2xl font-semibold text-gray-600">
      <p>{title}</p>
    </div>
  );
}
