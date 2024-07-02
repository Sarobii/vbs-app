"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Theme,
  Button,
  TextField,
  Flex,
  Text,
  Card,
  Box,
} from "@radix-ui/themes";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        } else {
          setIsLogin(true);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Theme>
      <Box className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Text size="5" weight="bold" align="center">
                {isLogin ? "Sign in to your account" : "Create a new account"}
              </Text>

              {!isLogin && (
                <TextField.Root
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <TextField.Root
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField.Root
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" size="3">
                {isLogin ? "Sign in" : "Sign up"}
              </Button>

              <Button variant="ghost" onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </Flex>
          </form>
        </Card>
      </Box>
    </Theme>
  );
}
