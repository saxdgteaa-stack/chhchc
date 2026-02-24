"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Church, LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { mockUsers } from "@/lib/mock/data";
import { useRouter } from "next/navigation";

interface LoginPageProps {
  onSwitchToPublic: () => void;
}

export function LoginPage({ onSwitchToPublic }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email (mock authentication)
    const user = mockUsers.find((u) => u.email === email);

    if (user && password === "admin123") {
      login(user);
      window.location.href = "/";
    } else {
      setError("Invalid email or password. Try: admin@church.com / admin123");
    }

    setLoading(false);
  };

  const demoAccounts = [
    { email: "admin@church.com", role: "Super Pastor", color: "bg-purple-500" },
    { email: "pastor@church.com", role: "Pastor", color: "bg-blue-500" },
    { email: "usher@church.com", role: "Usher", color: "bg-green-500" },
    {
      email: "accountant@church.com",
      role: "Accountant",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Church className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Church Management System</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access the dashboard
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@church.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-lg">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onSwitchToPublic}
              >
                Back to Website
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Accounts */}
        <div className="mt-6">
          <p className="text-sm text-center text-muted-foreground mb-3">
            Demo Accounts (Password: admin123)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                size="sm"
                className="justify-start text-xs"
                onClick={() => {
                  setEmail(account.email);
                  setPassword("admin123");
                }}
              >
                <span
                  className={`w-2 h-2 rounded-full ${account.color} mr-2`}
                />
                {account.role}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
