import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();

  function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const data = { username, password };

    login(data);
  }
  return (
    <div className=" flex justify-center items-center h-screen ">
      <form onSubmit={handleLogin} className=" w-full max-w-lg ">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username..."
              />
            </div>
            <div>
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password..."
              />
            </div>
            <Button type="submit">Sign In</Button>
          </CardContent>
          <CardFooter className="text-center p-4">
            <p>
              Don't have an account yet? <Link to="/register">Register</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
