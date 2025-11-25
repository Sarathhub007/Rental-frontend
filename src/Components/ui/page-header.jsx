export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
      {subtitle && (
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
