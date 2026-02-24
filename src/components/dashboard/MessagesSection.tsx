'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  FileText,
  Copy
} from 'lucide-react';
import { mockMessages, mockGroups, mockEvents, mockMessageTemplates } from '@/lib/mock/data';

const statusColors = {
  SENT: 'bg-green-500/10 text-green-600 border-green-200',
  PENDING: 'bg-amber-500/10 text-amber-600 border-amber-200',
  FAILED: 'bg-red-500/10 text-red-600 border-red-200',
  PARTIAL: 'bg-blue-500/10 text-blue-600 border-blue-200',
};

export function MessagesSection() {
  const [recipientType, setRecipientType] = useState<string>('GROUP');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const stats = [
    { label: 'Messages Sent', value: '1,234', color: 'text-green-500' },
    { label: 'Recipients', value: '287', color: 'text-blue-500' },
    { label: 'Success Rate', value: '98.5%', color: 'text-purple-500' },
    { label: 'Cost (KES)', value: '12,340', color: 'text-amber-500' },
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = mockMessageTemplates.find(t => t.id === templateId);
    if (template) {
      setMessageContent(template.content);
    }
  };

  const getRecipientCount = () => {
    if (recipientType === 'ALL_MEMBERS') return 287;
    if (recipientType === 'GROUP') {
      const group = mockGroups.find(g => g.id === selectedGroup);
      return group?.memberCount || 0;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose Message */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Send SMS messages to members, groups, or event attendees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Selection */}
            <div className="space-y-2">
              <Label>Quick Templates</Label>
              <div className="flex flex-wrap gap-2">
                {mockMessageTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      handleTemplateSelect(template.id);
                    }}
                    className={selectedTemplate === template.id ? 'border-primary' : ''}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recipient Selection */}
            <div className="space-y-2">
              <Label>Recipients *</Label>
              <Select value={recipientType} onValueChange={setRecipientType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GROUP">Specific Group</SelectItem>
                  <SelectItem value="ALL_MEMBERS">All Members</SelectItem>
                  <SelectItem value="EVENT_ATTENDEES">Event Attendees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {recipientType === 'GROUP' && (
              <div className="space-y-2">
                <Label>Select Group *</Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name} ({group.memberCount} members)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {recipientType === 'EVENT_ATTENDEES' && (
              <div className="space-y-2">
                <Label>Select Event *</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title} ({event.attendanceCount || 0} attendees)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Message Content */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Message Content *</Label>
                <span className="text-xs text-muted-foreground">
                  {messageContent.length}/160 characters
                </span>
              </div>
              <Textarea
                placeholder="Type your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={5}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{getRecipientCount()} recipients</span>
                <span className="text-muted-foreground/50">•</span>
                <span>~KES {getRecipientCount() * 10} cost</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
                  Preview
                </Button>
                <Button disabled={!messageContent || getRecipientCount() === 0}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className="p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {message.recipientType === 'GROUP' ? message.group?.name : 
                         message.recipientType === 'ALL_MEMBERS' ? 'All Members' : 
                         'Custom'}
                      </Badge>
                      <Badge className={statusColors[message.status]}>
                        {message.status === 'SENT' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {message.status === 'PENDING' && <Clock className="h-3 w-3 mr-1" />}
                        {message.status === 'FAILED' && <XCircle className="h-3 w-3 mr-1" />}
                        {message.status}
                      </Badge>
                    </div>
                    <p className="text-sm line-clamp-2 mb-2">{message.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{message.recipientCount} recipients</span>
                      <span>
                        {new Date(message.sentAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Preview</DialogTitle>
            <DialogDescription>
              Review your message before sending
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{messageContent || 'No message content'}</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recipients:</span>
              <span className="font-medium">{getRecipientCount()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Cost:</span>
              <span className="font-medium">KES {getRecipientCount() * 10}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsPreviewOpen(false)}>
              <Send className="mr-2 h-4 w-4" />
              Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
