"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileWithMetrics } from "./ClientDashboard";
import { updateProfile } from "@/app/actions/profile";
import { toast } from "sonner";
import { Settings } from "lucide-react";

export function ProfileSettingsDialog({ currentUser }: { currentUser: ProfileWithMetrics }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setIsLoading(true);
    const result = await updateProfile(formData);
    
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully!");
      setOpen(false);
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground hover:text-primary border border-transparent hover:border-border">
        <Settings className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your ABI portal profile details here.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="inGameName">In-game Name</Label>
            <Input id="inGameName" name="inGameName" defaultValue={currentUser.in_game_name} required className="bg-background/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uid">UID (In-game ID)</Label>
            <Input id="uid" name="uid" defaultValue={currentUser.uid} required className="bg-background/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-10 px-4 bg-background/50 border border-input rounded-md text-sm text-muted-foreground font-mono font-bold">
                UTC
              </div>
              <Select name="timezone" defaultValue={currentUser.timezone || ""} required>
                <SelectTrigger className="bg-background/50 flex-1 font-mono">
                  <SelectValue placeholder="Offset" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="max-h-[200px] overflow-y-auto">
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
