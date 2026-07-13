const RenameInput = ({
  name,
  rename,
  commit,
  className,
}: {
  name: string | undefined;
  rename: (newName: string) => void;
  commit: () => void;
  className: string;
}) => {
  return (
    <input
      value={name}
      onChange={(e) => rename(e.target.value)}
      onBlur={commit}
      className={`${className} outline-0`}
      spellCheck={false}
    />
  );
};

export default RenameInput;
