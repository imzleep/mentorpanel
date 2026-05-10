"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Calendar, FileText } from "lucide-react";

interface MentorshipHistoryProps {
  approvedMentorships: any[];
}

export function MentorshipHistory({ approvedMentorships }: MentorshipHistoryProps) {
  const [filter, setFilter] = useState("all");

  const filterData = (data: any[]) => {
    const now = new Date();
    if (filter === "this-month") {
      return data.filter(item => {
        const d = new Date(item.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
    }
    if (filter === "last-month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return data.filter(item => {
        const d = new Date(item.created_at);
        return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear();
      });
    }
    if (filter === "last-3-months") {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      return data.filter(item => new Date(item.created_at) >= threeMonthsAgo);
    }
    return data;
  };

  const filteredData = filterData(approvedMentorships);

  const downloadTxt = () => {
    const content = filteredData
      .map(sub => `${sub.mentee_ign} - ${sub.mentee_uid}`)
      .join("\n");
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mentorship_history_${filter}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight uppercase">Mentorship History</h2>
          <p className="text-muted-foreground">
            Archives of all mentoring and evaluation sessions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card/30 border border-border rounded-lg px-3 py-1.5 backdrop-blur">
            <Calendar className="h-4 w-4 text-primary" />
            <Select value={filter} onValueChange={(val) => setFilter(val || "all")}>
              <SelectTrigger className="w-[160px] border-none bg-transparent h-auto p-0 focus:ring-0 text-xs font-bold uppercase">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={downloadTxt} className="bg-primary text-black hover:bg-primary/90 font-bold uppercase text-xs tracking-wider">
            <FileText className="mr-2 h-4 w-4" />
            Export TXT
          </Button>
        </div>
      </div>

      <Card className="border-border bg-card/30 backdrop-blur overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground uppercase text-xs font-bold">Mentee Nick</TableHead>
              <TableHead className="text-muted-foreground uppercase text-xs font-bold">Mentee UID</TableHead>
              <TableHead className="text-muted-foreground uppercase text-xs font-bold">Mentor</TableHead>
              <TableHead className="text-muted-foreground uppercase text-xs font-bold">Category</TableHead>
              <TableHead className="text-right text-muted-foreground uppercase text-xs font-bold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                  No records found for the selected period.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((sub) => (
                <TableRow key={sub.id} className="border-border/50 hover:bg-muted/30 transition-colors group">
                  <TableCell className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {sub.mentee_ign}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground/80 tracking-tighter">
                    {sub.mentee_uid}
                  </TableCell>
                  <TableCell className="text-primary/90 font-medium tracking-tight">
                    {sub.profiles?.in_game_name || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 uppercase border-primary/20 text-primary bg-primary/5 font-bold">
                      {sub.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-mono">
                    {new Date(sub.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest bg-card/20 p-4 rounded-lg border border-dashed border-border">
        <span>Total Records: {filteredData.length}</span>
        <span>Secure Archive • Access Level: LEAD</span>
      </div>
    </div>
  );
}
