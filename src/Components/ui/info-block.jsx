export function InfoBlock({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-4 border border-slate-200">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
}

export default InfoBlock;
