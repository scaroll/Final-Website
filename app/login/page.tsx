"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { PageHeader } from "@/components/layout/page-header"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Use the auth context login function
    const success = await login(email, password)
    
    if (success) {
      // Redirect would happen here in real implementation
      console.log("Login successful")
    } else {
      console.log("Login failed")
    }
    
    setIsLoading(false)
  }

  return (
    <PageWrapper>
      <PageHeader variant="minimal" showNavigation={false} showActions={false} />

      <div className="flex-1 bg-gradient-to-br from-accent/10 to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-h2 text-foreground mt-4">Welcome Back</h1>
            <p className="text-body text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>

          <Card className="border-0 shadow-brand-medium">
            <CardHeader className="space-y-1">
              <CardTitle className="text-h4 text-center">Sign In</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-11 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-11 btn-brand-primary" disabled={isLoading}>
                  {isLoading ? "Demo Mode..." : "Demo Mode - Login Disabled"}
                </Button>
              </form>

              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center text-sm text-muted-foreground">Or continue with</div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button variant="outline" className="h-11 bg-transparent hover:bg-accent/10 transition-colors">
                    Google
                  </Button>
                  <Button variant="outline" className="h-11 bg-transparent hover:bg-accent/10 transition-colors">
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-accent hover:text-accent/80 font-medium transition-colors">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}