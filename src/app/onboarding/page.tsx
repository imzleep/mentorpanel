'use client';

import { useState } from 'react';
import { submitOnboarding } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setIsLoading(true);
    const result = await submitOnboarding(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-texture.png')] bg-cover bg-fixed bg-center">
      {/* Tactical overlay */}
      <div className="absolute inset-0 bg-background/95 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md p-8 border border-primary/20 bg-card/50 backdrop-blur-md rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome to ABI</h1>
          <p className="text-muted-foreground text-center mt-2">
            Please complete your profile setup to access the mentor evaluation portal.
          </p>
        </div>

        <form action={clientAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inGameName">In-game Name</Label>
            <Input 
              id="inGameName" 
              name="inGameName" 
              placeholder="e.g. ABI_Ghost" 
              required 
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uid">UID (In-game ID)</Label>
            <Input 
              id="uid" 
              name="uid" 
              placeholder="e.g. 12345678" 
              required 
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-10 px-4 bg-background/50 border border-input rounded-md text-sm text-muted-foreground font-mono font-bold">
                UTC
              </div>
              <Select name="timezone" required>
                <SelectTrigger className="bg-background/50 flex-1 font-mono">
                  <SelectValue placeholder="Offset" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="max-h-[300px]">
                  <SelectItem value="UTC-12">-12</SelectItem>
                  <SelectItem value="UTC-11">-11</SelectItem>
                  <SelectItem value="UTC-10">-10</SelectItem>
                  <SelectItem value="UTC-9">-9</SelectItem>
                  <SelectItem value="UTC-8">-8</SelectItem>
                  <SelectItem value="UTC-7">-7</SelectItem>
                  <SelectItem value="UTC-6">-6</SelectItem>
                  <SelectItem value="UTC-5">-5</SelectItem>
                  <SelectItem value="UTC-4">-4</SelectItem>
                  <SelectItem value="UTC-3">-3</SelectItem>
                  <SelectItem value="UTC-2">-2</SelectItem>
                  <SelectItem value="UTC-1">-1</SelectItem>
                  <SelectItem value="UTC+0">±0</SelectItem>
                  <SelectItem value="UTC+1">+1</SelectItem>
                  <SelectItem value="UTC+2">+2</SelectItem>
                  <SelectItem value="UTC+3">+3</SelectItem>
                  <SelectItem value="UTC+4">+4</SelectItem>
                  <SelectItem value="UTC+5">+5</SelectItem>
                  <SelectItem value="UTC+6">+6</SelectItem>
                  <SelectItem value="UTC+7">+7</SelectItem>
                  <SelectItem value="UTC+8">+8</SelectItem>
                  <SelectItem value="UTC+9">+9</SelectItem>
                  <SelectItem value="UTC+10">+10</SelectItem>
                  <SelectItem value="UTC+11">+11</SelectItem>
                  <SelectItem value="UTC+12">+12</SelectItem>
                  <SelectItem value="UTC+13">+13</SelectItem>
                  <SelectItem value="UTC+14">+14</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 font-semibold transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Saving Profile...' : 'Complete Setup'}
          </Button>
        </form>
      </div>
    </div>
  );
}
