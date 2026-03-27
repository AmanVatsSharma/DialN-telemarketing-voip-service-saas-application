import { useState, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Send, Loader2, Users, User, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import PhoneNumberTagInput from '@/components/sms/phone-number-tag-input';
import ValidationModal from '@/components/sms/validation-modal';
import SendResultsModal from '@/components/sms/send-results-modal';
import { validatePhoneNumber } from '@/lib/phone-validation';
import { toast } from 'sonner';
import axios from 'axios';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: dashboard().url,
  },
  {
    title: 'SMS',
    href: '/sms',
  },
  {
    title: 'New Message',
  },
];

interface PhoneTag {
  phone: string;
  isValid: boolean;
  error?: string;
}

interface PhoneNumber {
  id: number;
  number: string;
  friendly_name: string | null;
}

interface ContactList {
  id: number;
  name: string;
  description: string | null;
  contacts_count: number;
}

interface Props {
  phoneNumbers: PhoneNumber[];
  contactLists: ContactList[];
}

export default function ComposeSms({ phoneNumbers, contactLists }: Props) {
  const { flash } = usePage().props as any;
  const [singleRecipient, setSingleRecipient] = useState('');
  const [singleRecipientError, setSingleRecipientError] = useState('');
  const [bulkTags, setBulkTags] = useState<PhoneTag[]>([]);
  const [messageLength, setMessageLength] = useState(0);
  const [selectedContactLists, setSelectedContactLists] = useState<number[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [validationIssues, setValidationIssues] = useState<Array<{ phone: string; error: string }>>([]);
  const [sendResults, setSendResults] = useState<any>(null);
  
  const { data, setData, post, processing, errors } = useForm({
    from_phone_id: phoneNumbers[0]?.id?.toString() || '',
    recipients: [] as string[],
    message: '',
  });

  // Check for SMS results from backend
  useEffect(() => {
    if (flash?.smsResults) {
      setSendResults(flash.smsResults);
      setShowResultsModal(true);
      
      // Reset forms after showing results
      setBulkTags([]);
      setSingleRecipient('');
      setData('message', '');
      setMessageLength(0);
    }
  }, [flash]);

  const handleMessageChange = (value: string) => {
    setData('message', value);
    setMessageLength(value.length);
  };

  const handleSingleRecipientChange = (value: string) => {
    setSingleRecipient(value);
    
    // Validate on change
    if (value.trim()) {
      const validation = validatePhoneNumber(value.trim());
      if (!validation.isValid) {
        setSingleRecipientError(validation.error || 'Invalid phone number');
      } else {
        setSingleRecipientError('');
      }
    } else {
      setSingleRecipientError('');
    }
  };

  const handleContactListToggle = (listId: number) => {
    setSelectedContactLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleImportFromContactLists = async () => {
    if (selectedContactLists.length === 0) {
      toast.error('Please select at least one contact list');
      return;
    }

    setLoadingContacts(true);
    try {
      const response = await axios.post('/sms/contact-list-numbers', {
        contact_list_ids: selectedContactLists,
      });

      const phoneNumbers = response.data.phone_numbers || [];
      
      if (phoneNumbers.length === 0) {
        toast.warning('No phone numbers found in selected contact lists');
        return;
      }

      // Convert to tags with validation
      const newTags: PhoneTag[] = phoneNumbers.map((phone: string) => {
        const validation = validatePhoneNumber(phone);
        return {
          phone,
          isValid: validation.isValid,
          error: validation.error,
        };
      });

      // Merge with existing tags, avoid duplicates
      const existingPhones = new Set(bulkTags.map((t) => t.phone));
      const uniqueNewTags = newTags.filter((t) => !existingPhones.has(t.phone));
      
      setBulkTags([...bulkTags, ...uniqueNewTags]);
      toast.success(`Imported ${uniqueNewTags.length} phone numbers from contact lists`);
      setSelectedContactLists([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to import contacts');
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSubmitSingle = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = singleRecipient.trim();
    if (!trimmed) {
      setSingleRecipientError('Please enter a recipient');
      return;
    }

    const validation = validatePhoneNumber(trimmed);
    if (!validation.isValid) {
      setValidationIssues([{ phone: trimmed, error: validation.error || 'Invalid format' }]);
      setShowValidationModal(true);
      return;
    }

    // Valid single recipient, send directly
    post('/sms/send', {
      from_phone_id: data.from_phone_id,
      recipients: [validation.formatted!],
      message: data.message,
      onSuccess: () => {
        toast.success('Message sent successfully!');
      },
      onError: (errors) => {
        console.error('Send error:', errors);
        toast.error('Failed to send message. Please try again.');
      },
    });
  };

  const handleSubmitBulk = (e: React.FormEvent) => {
    e.preventDefault();

    if (bulkTags.length === 0) {
      toast.error('Please add at least one recipient');
      return;
    }

    const validNumbers = bulkTags.filter((t) => t.isValid).map((t) => t.phone);
    const invalidNumbers = bulkTags
      .filter((t) => !t.isValid)
      .map((t) => ({
        phone: t.phone,
        error: t.error || 'Invalid format',
      }));

    // If there are invalid numbers, show validation modal
    if (invalidNumbers.length > 0) {
      setValidationIssues(invalidNumbers);
      setShowValidationModal(true);
      return;
    }

    // All valid, send directly
    post('/sms/send', {
      from_phone_id: data.from_phone_id,
      recipients: validNumbers,
      message: data.message,
      onSuccess: () => {
        toast.success('Messages sent successfully!');
      },
      onError: (errors) => {
        console.error('Send error:', errors);
        toast.error('Failed to send messages. Please try again.');
      },
    });
  };

  const handleSendValidOnly = () => {
    setShowValidationModal(false);

    const validNumbers = bulkTags.filter((t) => t.isValid).map((t) => t.phone);
    
    if (validNumbers.length === 0) {
      toast.error('No valid numbers to send to');
      return;
    }

    post('/sms/send', {
      from_phone_id: data.from_phone_id,
      recipients: validNumbers,
      message: data.message,
      onSuccess: () => {
        toast.success('Messages sent to valid numbers!');
      },
      onError: (errors) => {
        console.error('Send error:', errors);
        toast.error('Failed to send messages. Please try again.');
      },
    });
  };

  const handleFixNumbers = () => {
    setShowValidationModal(false);
    toast.info('Please fix the invalid phone numbers and try again');
  };

  const messageSegments = Math.ceil(messageLength / 160);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="New Message" />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.visit('/sms')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">New Message</h1>
            <p className="text-muted-foreground mt-1">Send SMS to individual or multiple recipients</p>
          </div>
        </div>

        {phoneNumbers.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">No Phone Numbers</h3>
                <p className="text-muted-foreground mb-4">
                  You need to add at least one SMS phone number before composing messages
                </p>
                <Button onClick={() => router.visit('/sms/phone-numbers/create')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Phone Number
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="single" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="single">
                <User className="mr-2 h-4 w-4" />
                Single
              </TabsTrigger>
              <TabsTrigger value="bulk">
                <Users className="mr-2 h-4 w-4" />
                Bulk
              </TabsTrigger>
            </TabsList>

            {/* Single SMS */}
            <TabsContent value="single">
              <form onSubmit={handleSubmitSingle} className="space-y-6">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Single Recipient</CardTitle>
                    <CardDescription>Send SMS to one recipient</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* From Number */}
                    <div className="space-y-2">
                      <Label htmlFor="from_phone_single" className="text-foreground">
                        From <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={data.from_phone_id}
                        onValueChange={(value) => setData('from_phone_id', value)}
                      >
                        <SelectTrigger className={errors.from_phone_id ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select phone number" />
                        </SelectTrigger>
                        <SelectContent>
                          {phoneNumbers.map((phone) => (
                            <SelectItem key={phone.id} value={phone.id.toString()}>
                              {phone.friendly_name || phone.number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.from_phone_id && (
                        <p className="text-sm text-destructive">{errors.from_phone_id}</p>
                      )}
                    </div>

                    {/* Recipient */}
                    <div className="space-y-2">
                      <Label htmlFor="recipient" className="text-foreground">
                        To <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="recipient"
                        type="text"
                        value={singleRecipient}
                        onChange={(e) => handleSingleRecipientChange(e.target.value)}
                        placeholder="+12345678900"
                        className={singleRecipientError ? 'border-destructive' : ''}
                      />
                      {singleRecipientError && (
                        <p className="text-sm text-destructive">{singleRecipientError}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Enter phone number in E.164 format (e.g., +12345678900)
                      </p>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message" className="text-foreground">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {messageLength}/1600 • {messageSegments} segment{messageSegments !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <Textarea
                        id="message"
                        value={data.message}
                        onChange={(e) => handleMessageChange(e.target.value)}
                        placeholder="Type your message here..."
                        className={`min-h-[150px] resize-none ${errors.message ? 'border-destructive' : ''}`}
                        maxLength={1600}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button type="submit" disabled={processing || !data.message || !singleRecipient} className="w-full">
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send SMS
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Bulk SMS */}
            <TabsContent value="bulk">
              <form onSubmit={handleSubmitBulk} className="space-y-6">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Bulk Recipients</CardTitle>
                    <CardDescription>Send SMS to multiple recipients at once</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* From Number */}
                    <div className="space-y-2">
                      <Label htmlFor="from_phone_bulk" className="text-foreground">
                        From <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={data.from_phone_id}
                        onValueChange={(value) => setData('from_phone_id', value)}
                      >
                        <SelectTrigger className={errors.from_phone_id ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select phone number" />
                        </SelectTrigger>
                        <SelectContent>
                          {phoneNumbers.map((phone) => (
                            <SelectItem key={phone.id} value={phone.id.toString()}>
                              {phone.friendly_name || phone.number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.from_phone_id && (
                        <p className="text-sm text-destructive">{errors.from_phone_id}</p>
                      )}
                    </div>

                    {/* Import from Contact Lists */}
                    {contactLists.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-foreground">Import from Contact Lists</Label>
                        <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto">
                            {contactLists.map((list) => (
                              <div
                                key={list.id}
                                className="flex items-start space-x-3 rounded-md border border-border bg-background p-3 hover:bg-accent/50 transition-colors"
                              >
                                <Checkbox
                                  id={`list-${list.id}`}
                                  checked={selectedContactLists.includes(list.id)}
                                  onCheckedChange={() => handleContactListToggle(list.id)}
                                />
                                <div className="flex-1">
                                  <label
                                    htmlFor={`list-${list.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {list.name}
                                  </label>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {list.contacts_count} contacts
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button
                            type="button"
                            onClick={handleImportFromContactLists}
                            disabled={selectedContactLists.length === 0 || loadingContacts}
                            variant="outline"
                            className="w-full"
                          >
                            {loadingContacts ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Importing...
                              </>
                            ) : (
                              <>
                                <List className="mr-2 h-4 w-4" />
                                Import Selected ({selectedContactLists.length})
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Phone Number Tag Input */}
                    <div className="space-y-2">
                      <Label className="text-foreground">
                        Recipients <span className="text-destructive">*</span>
                      </Label>
                      <PhoneNumberTagInput value={bulkTags} onChange={setBulkTags} />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message_bulk" className="text-foreground">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {messageLength}/1600 • {messageSegments} segment{messageSegments !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <Textarea
                        id="message_bulk"
                        value={data.message}
                        onChange={(e) => handleMessageChange(e.target.value)}
                        placeholder="Type your message here..."
                        className={`min-h-[150px] resize-none ${errors.message ? 'border-destructive' : ''}`}
                        maxLength={1600}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={processing || !data.message || bulkTags.length === 0}
                      className="w-full"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send to {bulkTags.filter((t) => t.isValid).length} Recipients
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Validation Modal */}
      <ValidationModal
        open={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        validCount={bulkTags.filter((t) => t.isValid).length}
        invalidNumbers={validationIssues}
        onSendValid={handleSendValidOnly}
        onFixNumbers={handleFixNumbers}
      />

      {/* Results Modal */}
      {sendResults && (
        <SendResultsModal
          open={showResultsModal}
          onClose={() => {
            setShowResultsModal(false);
            setSendResults(null);
          }}
          successCount={sendResults.success || 0}
          skippedNumbers={sendResults.skippedNumbers || []}
        />
      )}
    </AppLayout>
  );
}
