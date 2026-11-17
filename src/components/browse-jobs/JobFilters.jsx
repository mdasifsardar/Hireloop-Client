"use client";

export function JobFilters({ groups }) {
  const handleFilterChange = () => {
    // Filter functionality will be implemented later.
  };

  return (
    <aside className="h-fit rounded-2xl border border-[#232327] bg-[#131314] p-5">
      <h2 className="text-lg font-semibold text-white">Filters</h2>

      {groups.map((group) => (
        <fieldset key={group.id} className="mt-6 border-0 p-0">
          <legend className="text-[13px] font-medium text-[#a0a0ab]">
            {group.title}
          </legend>

          <div className="mt-3 space-y-3">
            {group.options.map((option) => (
              <label
                key={option.label}
                className="flex cursor-pointer items-center justify-between gap-3"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={group.id}
                    value={option.label}
                    defaultChecked={option.defaultChecked}
                    onChange={handleFilterChange}
                    className="size-4 cursor-pointer accent-white"
                  />
                  <span className="text-[13px] text-[#d4d4d8]">
                    {option.label}
                  </span>
                </span>

                <span className="text-[11px] text-[#5a5a60]">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </aside>
  );
}
