'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    const origin = window.location.origin;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error('Failed to authenticate with Discord.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-texture.png')] bg-cover bg-fixed bg-center">
      {/* Tactical overlay */}
      <div className="absolute inset-0 bg-background/95 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md p-8 border border-primary/20 bg-card/50 backdrop-blur-md rounded-xl shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mb-6">
          <LogIn className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">ABI Mentor Portal</h1>
        <p className="text-muted-foreground text-center mb-8">
          Authenticate using your Discord account to access the evaluation roster and mentor dashboard.
        </p>

        <Button 
          className="w-full h-12 text-lg font-semibold bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all"
          onClick={handleDiscordLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Login with Discord'}
        </Button>
      </div>
    </div>
  );
}
