import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Mail,
  Facebook,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});


function AuthFormCard({
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
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {title}
      </h2>
      {inputs.map((input, idx) => (
        <Input
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
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">or continue with</p>
      <SocialIcons />
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
}

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md lg:w-[500px] lg:h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {isSignUp ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <AuthFormCard
                title="Register"
                inputs={[
                  { icon: <User />, type: "text", placeholder: "Username" },
                  { icon: <Mail />, type: "email", placeholder: "Email" },
                  { icon: <Lock />, type: "password", placeholder: "Password" },
                ]}
                buttonText="Register"
                bottomText="Already have an account?"
                switchText="Login"
                onSwitch={() => setIsSignUp(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <AuthFormCard
                title="Login"
                inputs={[
                  { icon: <User />, type: "text", placeholder: "Username" },
                  { icon: <Lock />, type: "password", placeholder: "Password" },
                ]}
                buttonText="Login"
                bottomText="Don't have an account?"
                switchText="Register"
                onSwitch={() => setIsSignUp(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
function SwitchButton({
  text,
  actionText,
  onClick,
}: {
  text: string;
  actionText: string;
  onClick: () => void;
}) {
  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {text}{" "}
        <button
          onClick={onClick}
          className="text-blue-500 font-semibold hover:underline ml-1"
        >
          {actionText}
        </button>
      </p>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-4 lg:px-10 py-6 z-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Login
      </h2>
      <Input icon={<User />} type="text" placeholder="Username" />
      <Input icon={<Lock />} type="password" placeholder="Password" />
      <a
        href="#"
        className="text-sm text-gray-500 dark:text-gray-400 mb-4 self-end"
      >
        Forgot password?
      </a>
      <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition">
        Login
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        or login with
      </p>
      <SocialIcons />
    </div>
  );
}

function RegisterForm() {
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-4 lg:px-10 py-6 z-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Register
      </h2>
      <Input icon={<User />} type="text" placeholder="Username" />
      <Input icon={<Mail />} type="email" placeholder="Email" />
      <Input icon={<Lock />} type="password" placeholder="Password" />
      <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition">
        Register
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        or sign up with
      </p>
      <SocialIcons />
    </div>
  );
}

function Input({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 w-full px-4 h-12 rounded-full mb-4">
      <div className="text-gray-400 mr-3">{icon}</div>
      <input
        {...props}
        className="bg-transparent outline-none border-none w-full text-gray-700 dark:text-gray-200"
      />
    </div>
  );
}

function SocialIcons() {
  const icons = [Facebook, Twitter, Github, Linkedin];

  return (
    <div className="flex gap-4 mt-2">
      {icons.map((Icon, i) => (
        <a
          key={i}
          href="#"
          className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 hover:border-blue-500 transition"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
