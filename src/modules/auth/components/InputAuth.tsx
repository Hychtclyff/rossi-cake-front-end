const InputAuth = ({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 w-full px-4 h-12 rounded-full mb-4">
      <div className="text-gray-400 mr-3">{icon}</div>
      <input
        {...props}
        className="bg-transparent outline-none border-none w-full text-gray-700 dark:text-gray-200"
      />
    </div>
  );
};

export default InputAuth;
