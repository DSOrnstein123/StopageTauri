import type { PropertyList } from "../schemas/propertySchema";

const Properties = ({ data }: { data: PropertyList }) => {
  console.log(data);
  return (
    <>
      {data.length > 0 &&
        data.map((property) => (
          <div key={property.id} className="flex h-11 w-full">
            <div className="flex w-40 shrink-0 items-center justify-center gap-y-0.5 rounded-md px-1.5 hover:bg-gray-400">
              <span className="block w-full truncate text-left">
                {property.name}
              </span>
            </div>

            <div className="flex-1 p-1.5">
              <span>{property.value ? String(property.value) : ""}</span>
            </div>
          </div>
        ))}
    </>
  );
};

export default Properties;
