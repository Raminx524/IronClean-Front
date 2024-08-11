import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/AuthContext";
// import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  const { register, login } = useAuth();
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

  function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const data = { username, password };

    login(data);
  }

  return (
    <div className="flex justify-center min-h-screen">
      <Tabs defaultValue="register" className="flex w-full  ">
        <TabsList className=" flex flex-1 flex-col min-h-full   bg-gradient-to-l from-primary bg-inherit gap-8 text-foreground p-20">
          <div>
            <TabsContent
              value="login"
              className="flex-1 text-5xl font-extrabold max-w-[500px]  "
            >
              The first step towards your clean house
            </TabsContent>
            <TabsContent
              value="register"
              className="flex-1 text-5xl font-extrabold "
            >
              New User Registration
            </TabsContent>
          </div>
          <div>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent
          value="login"
          className=" flex-1 flex-grow items-center self-center p-20"
        >
          <form onSubmit={handleLogin} className=" w-full max-w-lg ">
            <Card className="border-none">
              {/* <CardHeader>
                <CardTitle className="text-4xl font-extrabold">Login</CardTitle>
              </CardHeader> */}
              <CardContent className="flex flex-col gap-6 p-6">
                <div>
                  {/* <Label htmlFor="username">Username:</Label> */}
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter username..."
                  />
                </div>
                <div>
                  {/* <Label htmlFor="password">Password:</Label> */}
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                  />
                </div>
                <Button type="submit">Sign In</Button>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
        <TabsContent
          value="register"
          className="flex-1 flex-grow items-center self-center p-20"
        >
          <form onSubmit={handleRegister} className="">
            <Card className="border-none">
              <CardContent className="flex flex-col gap-6 p-6">
                <Tabs defaultValue="client" className="flex flex-col gap-4 ">
                  <TabsList className="bg-inherit">
                    <TabsTrigger
                      value="client"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={(ev) => {
                        setRole("client");
                      }}
                    >
                      Client
                    </TabsTrigger>
                    <TabsTrigger
                      value="cleaner"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={(ev) => {
                        setRole("cleaner");
                      }}
                    >
                      Cleaner
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex gap-4 ">
                    <div className="flex-1">
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter username..."
                        required
                      />
                    </div>
                    <div className="flex-1">
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
                      <Input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="Enter first name..."
                        required
                      />
                    </div>
                    <div className="flex-1">
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
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        id="phone_number"
                        type="tel"
                        name="phone_number"
                        placeholder="Enter phone number..."
                        required
                      />
                    </div>
                  </div>
                  <TabsContent value="client">
                    <div>
                      <Input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Enter address..."
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="cleaner">
                    <div className="flex  gap-4">
                      <div className="flex-1">
                        <Input
                          id="price"
                          type="number"
                          name="price"
                          placeholder="Enter price..."
                          step="0.01"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          id="summary"
                          type="text"
                          name="summary"
                          placeholder="Enter summary..."
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                {/* <div>
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
                </div> */}

                {/* {role === "client" && (
                 
                )}

                {role === "cleaner" && (
                 
                )} */}
                <Button type="submit">Register</Button>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
