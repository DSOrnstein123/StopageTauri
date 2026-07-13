import RenameInput from "./RenameInput";

const NameInput = ({
  name,
  rename,
  commit,
  placeholder,
  textClassName,
  placeholderClassName,
  inputClassName,
}: {
  name: string | undefined;
  rename: (newName: string) => void;
  commit: () => void;
  placeholder: string;
  textClassName?: string;
  placeholderClassName?: string;
  inputClassName?: string;
}) => {
  return (
    <div className="relative">
      <RenameInput
        name={name}
        rename={rename}
        commit={commit}
        className={`${textClassName} ${inputClassName}`}
      />

      {!name && (
        <span
          className={`${textClassName} ${placeholderClassName} pointer-events-none absolute top-1 left-0 font-bold text-gray-400`}
        >
          {placeholder}
        </span>
      )}
    </div>
  );
};

export default NameInput;
