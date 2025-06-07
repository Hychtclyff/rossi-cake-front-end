import { Input } from "@/components/ui/input";
import SocialIcons from "./SocialIcons";
import InputAuth from "./InputAuth";
import { IconBrandGoogle } from "@tabler/icons-react";

const AuthForm = ({
  title,
  inputs,
  buttonText,
  bottomText,
  switchText,
  onSwitch,
}: {
  title: string;
  inputs: { icon: React.ReactNode; type: string; placeholder: string }[];
  buttonText: string;
  bottomText: string;
  switchText: string;
  onSwitch: () => void;
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {title}
      </h2>
      {inputs.map((input, idx) => (
        <InputAuth
          key={idx}
          icon={input.icon}
          type={input.type}
          placeholder={input.placeholder}
        />
      ))}
      {title === "Login" && (
        <a
          href="#"
          className="text-sm text-gray-500 dark:text-gray-400 mb-4 self-end"
        >
          Forgot password?
        </a>
      )}
      <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition">
        {buttonText}
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        or continue with
      </p>
      <a
        href="#"
        className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 hover:border-blue-500 transition"
      >
        <IconBrandGoogle />
      </a>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {bottomText}{" "}
          <button
            onClick={onSwitch}
            className="text-blue-500 font-semibold hover:underline ml-1"
          >
            {switchText}
          </button>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;
