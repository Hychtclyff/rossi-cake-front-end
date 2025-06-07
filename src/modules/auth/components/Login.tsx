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