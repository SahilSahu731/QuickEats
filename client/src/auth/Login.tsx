import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [input, setInput] = useState<LoginInputState>({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState<Partial<LoginInputState>>({});
    const { loading, login } = useUserStore();
    const navigate = useNavigate();
  
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    };
    const loginSubmitHandler = async (e: FormEvent) => {
      e.preventDefault();
      const result = userLoginSchema.safeParse(input);
      if (!result.success) {
        const fieldErrors = result.error.formErrors.fieldErrors;
        setErrors(fieldErrors as Partial<LoginInputState>);
        return;
      }
      try {
        await login(input);
        navigate("/");
      } catch (error) {console.log(error);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={loginSubmitHandler}
          className="md:p-10 w-full max-w-lg rounded-lg shadow-xl bg-gray-100 md:border border-gray-200 mx-4"
        >
          <div className="mb-4">
            <h1 className="font-bold text-3xl text-center mb-4">Quick<span className="text-blue-700">Eats</span></h1>
            <hr className="h-0.5 mb-10 bg-gray-300" />
          </div>
          <div className="mb-4 px-8">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                 <span className="text-xs text-red-500">{errors.email}</span> 
              )}
            </div>
          </div>
          <div className="mb-2 px-8">
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-xs text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
          <div className=" px-8 text-right cursor-pointer text-sm text-blue-500 hover:text-blue-700">
              <Link
                to="/forgot-password"
                className="hover:text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          <div className="mt-8 px-8">
            {loading ? (
              <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full uppercase rounded-sm bg-orange hover:bg-hoverOrange"
              >
                Login
              </Button>
            )}
            
          </div>
          <Separator />
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
        </form>
      </div>
    );
  };
  
  export default Login;