import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Register() {
  const { register } = useAuth();
  const [role, setRole] = useState("client");

  function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const phone_number = formData.get("phone_number");
    const address = formData.get("address");
    const price = formData.get("price");
    const summary = formData.get("summary");

    const data = {
      username,
      password,
      first_name,
      last_name,
      email,
      phone_number,
      role,
      address: role === "client" ? address : null,
      price: role === "cleaner" ? price : null,
      summary: role === "cleaner" ? summary : null,
    };

    register(data);
  }

  return (
    <div className="flex justify-center min-h-screen">
      <Tabs defaultValue="register" className="flex w-5/6 ">
        <TabsList className=" flex flex-1 flex-col h-full  text-primary bg-gradient-to-l from-primary">
          <div>
            <TabsContent
              value="login"
              className="flex-1 text-4xl font-extrabold"
            >
              welcome
            </TabsContent>
            <TabsContent
              value="register"
              className="flex-1 text-4xl font-extrabold"
            >
              New User Registration
            </TabsContent>
          </div>
          <div>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="login" className=" flex-1 flex-grow items-center">
          Make changes to your account here.sa
        </TabsContent>
        <TabsContent
          value="register"
          className="flex-1 flex-grow items-center self-center"
        >
          <form onSubmit={handleRegister} className="">
            <Card>
              {/* <CardHeader>
                <CardTitle className="text-4xl font-extrabold">
                  Register
                </CardTitle>
              </CardHeader> */}
              <CardContent className="flex flex-col gap-6 p-6">
                <div>
                  <Label htmlFor="role">Role:</Label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="client">Client</option>
                    <option value="cleaner">Cleaner</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="username">Username:</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter username..."
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="password">Password:</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password..."
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="first_name">First Name:</Label>
                    <Input
                      id="first_name"
                      type="text"
                      name="first_name"
                      placeholder="Enter first name..."
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="last_name">Last Name:</Label>
                    <Input
                      id="last_name"
                      type="text"
                      name="last_name"
                      placeholder="Enter last name..."
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter email..."
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="phone_number">Phone Number:</Label>
                    <Input
                      id="phone_number"
                      type="tel"
                      name="phone_number"
                      placeholder="Enter phone number..."
                      required
                    />
                  </div>
                </div>

                {role === "client" && (
                  <div>
                    <Label htmlFor="address">Address:</Label>
                    <Input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Enter address..."
                    />
                  </div>
                )}

                {role === "cleaner" && (
                  <div className="flex  gap-4">
                    <div className="flex-1">
                      <Label htmlFor="price">Price:</Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="Enter price..."
                        step="0.01"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="summary">Summary:</Label>
                      <Input
                        id="summary"
                        type="text"
                        name="summary"
                        placeholder="Enter summary..."
                      />
                    </div>
                  </div>
                )}
                <Button type="submit">Register</Button>
              </CardContent>
              <CardFooter className="text-center p-4">
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
