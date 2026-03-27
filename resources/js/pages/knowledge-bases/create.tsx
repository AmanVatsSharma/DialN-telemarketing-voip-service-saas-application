import { useState, useRef } from 'react';
import { ArrowLeft, FileText, Link2, Type, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import axios from 'axios';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Conversational AI', href: '/ai-agents' },
  { title: 'Knowledge Base', href: '/knowledge-bases' },
  { title: 'Create' },
];

type InputMode = 'plain' | 'file' | 'url';

const ACCEPTED_FILE_TYPES = '.txt,.md,.csv,.html,text/plain,text/csv,text/markdown,text/html';

export default function KnowledgeBaseCreate() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [inputMode, setInputMode] = useState<InputMode>('plain');
  const [url, setUrl] = useState('');
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFetchUrl = async () => {
    if (!url.trim()) {
      toast.error('Enter a URL');
      return;
    }
    setFetchingUrl(true);
    try {
      const res = await axios.post<{ content: string }>('/api/v1/knowledge-bases/fetch-url', { url: url.trim() });
      setContent(res.data.content ?? '');
      toast.success('Content fetched');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string; message?: string } } };
      toast.error(e.response?.data?.error ?? e.response?.data?.message ?? 'Failed to fetch URL');
    } finally {
      setFetchingUrl(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setContent(String(reader.result ?? ''));
    reader.readAsText(file, 'UTF-8');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      if (inputMode === 'file' && selectedFile) {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('file', selectedFile);
        await axios.post('/api/v1/knowledge-bases', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('/api/v1/knowledge-bases', {
          name: name.trim(),
          content: content.trim() || null,
        });
      }
      toast.success('Knowledge Base created');
      router.visit('/knowledge-bases');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { errors?: Record<string, string[]> } } };
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : 'Failed to create';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Knowledge Base" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.visit('/knowledge-bases')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Heading
            title="Create Knowledge Base"
            description="Add content from plain text, a file, or a URL. Agents use this context during conversations."
          />
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>
                Name and content. Use Plain text, File upload (TXT, MD, CSV, HTML), or import from URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Product FAQ"
                />
              </div>

              <Tabs
                value={inputMode}
                onValueChange={(v) => setInputMode(v as InputMode)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="plain" className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Plain text
                  </TabsTrigger>
                  <TabsTrigger value="file" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    File
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="plain" className="space-y-2 mt-4">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste or type the knowledge content here. It will be included in the agent's context (subject to character limit)."
                    rows={12}
                    className="resize-y"
                  />
                </TabsContent>

                <TabsContent value="file" className="space-y-2 mt-4">
                  <Label>Upload file</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Supported: .txt, .md, .csv, .html (max 10MB). Content will be extracted as text.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_FILE_TYPES}
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                  {content && (
                    <div className="space-y-2 mt-2">
                      <Label>Preview / edit content</Label>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        className="resize-y"
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="url" className="space-y-2 mt-4">
                  <Label htmlFor="url">Import from URL</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Fetch a web page; text will be extracted (HTML stripped).
                  </p>
                  <div className="flex gap-2">
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/page"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFetchUrl}
                      disabled={fetchingUrl || !url.trim()}
                    >
                      {fetchingUrl ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Fetch'}
                    </Button>
                  </div>
                  {content && (
                    <div className="space-y-2 mt-2">
                      <Label>Fetched content (edit if needed)</Label>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="resize-y"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Creating...' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.visit('/knowledge-bases')}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}
