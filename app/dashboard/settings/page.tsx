'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, getSession } from '../../lib/supabase';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
});

const passwordFormSchema = z.object({
  current_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  new_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirm_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

const apiFormSchema = z.object({
  alpha_vantage_key: z.string().optional(),
  openai_key: z.string().optional(),
  use_mock_data: z.boolean().default(false),
});

const notificationsFormSchema = z.object({
  email_notifications: z.boolean().default(true),
  price_alerts: z.boolean().default(true),
  prediction_alerts: z.boolean().default(true),
});

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "",
      bio: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const apiForm = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      alpha_vantage_key: process.env.ALPHA_VANTAGE_API_KEY || "",
      openai_key: process.env.OPENAI_API_KEY || "",
      use_mock_data: process.env.USE_MOCK_DATA === 'true',
    },
  });

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      email_notifications: true,
      price_alerts: true,
      prediction_alerts: true,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await getSession();
      if (data && data.session && data.session.user) {
        profileForm.setValue("email", data.session.user.email || '');
      }
    };

    fetchUserData();
  }, [profileForm]);

  const onProfileSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Profile update simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage('Profile successfully updated');
    } catch (err: any) {
      setError(err.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (data.new_password !== data.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Password change simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage('Password successfully changed');
      passwordForm.reset();
    } catch (err: any) {
      setError(err.message || 'Error changing password');
    } finally {
      setLoading(false);
    }
  };

  const onApiSubmit = async (data: z.infer<typeof apiFormSchema>) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // API keys update simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage('API settings successfully updated');
    } catch (err: any) {
      setError(err.message || 'Error updating API settings');
    } finally {
      setLoading(false);
    }
  };

  const onNotificationsSubmit = async (data: z.infer<typeof notificationsFormSchema>) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Notifications update simulation
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessage('Notification settings successfully updated');
    } catch (err: any) {
      setError(err.message || 'Error updating notification settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Error signing out');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
    <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 border-l-4 border-destructive p-4 rounded">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      {message && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-700">{message}</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <Tabs defaultValue="account" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <TabsList className="flex flex-col w-48 h-auto self-start mb-0 p-1.5 bg-muted rounded-md">
              <TabsTrigger value="account" className="justify-start w-full px-4 py-2 mb-1 text-left">Account</TabsTrigger>
              <TabsTrigger value="password" className="justify-start w-full px-4 py-2 mb-1 text-left">Password</TabsTrigger>
              <TabsTrigger value="api" className="justify-start w-full px-4 py-2 mb-1 text-left">API Keys</TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start w-full px-4 py-2 mb-1 text-left">Notifications</TabsTrigger>
            </TabsList>
            
            <div className="flex-1">
              <TabsContent value="account" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Manage your public profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                    name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                    name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormDescription>
                                Email cannot be changed after registration
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a little bit about yourself"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description for your profile. Maximum 160 characters.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : 'Save changes'}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>
                      Manage your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Sign out from all devices</h4>
                      <p className="text-sm text-muted-foreground">
                        This will end all your active sessions and you'll need to sign in again on all your devices.
                      </p>
                      <Button variant="outline" onClick={handleSignOut} disabled={loading}>
                        {loading ? 'Signing out...' : 'Sign Out'}
                      </Button>
            </div>

                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-destructive">Delete account</h4>
                      <p className="text-sm text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
            </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="password" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="current_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                    type={showCurrentPassword ? "text" : "password"}
                                    {...field} 
                                  />
                                  <Button
                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  >
                                    {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="new_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                    type={showNewPassword ? "text" : "password"}
                                    {...field} 
                                  />
                                  <Button
                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                  >
                                    {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirm_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                    type={showConfirmPassword ? "text" : "password"}
                                    {...field} 
                                  />
                                  <Button
                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Updating...' : 'Update password'}
                        </Button>
          </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>
                      Manage API keys for external services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...apiForm}>
                      <form onSubmit={apiForm.handleSubmit(onApiSubmit)} className="space-y-4">
                        <FormField
                          control={apiForm.control}
                          name="alpha_vantage_key"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alpha Vantage API Key</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your Alpha Vantage API key" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Get your Alpha Vantage API key at <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener noreferrer" className="underline">alphavantage.co</a>
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={apiForm.control}
                          name="openai_key"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OpenAI API Key</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your OpenAI API key" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Get your OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com</a>
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={apiForm.control}
                          name="use_mock_data"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Use mock data
                                </FormLabel>
                                <FormDescription>
                                  Enable this option to use predefined mock data instead of making real API calls
                                </FormDescription>
                  </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : 'Save API Settings'}
                        </Button>
          </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationsForm}>
                      <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="email_notifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications about activity in your account via email
                                </FormDescription>
        </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationsForm.control}
                          name="price_alerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Price Alerts
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications when a stock price reaches your set threshold
                                </FormDescription>
                </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationsForm.control}
                          name="prediction_alerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Prediction Alerts
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications about new AI predictions for your watched stocks
                                </FormDescription>
                </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : 'Save Notification Settings'}
                        </Button>
          </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
} 