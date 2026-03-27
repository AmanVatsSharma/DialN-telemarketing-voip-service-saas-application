import { useState, useEffect } from 'react';
import { Plus, BookOpen, Pencil, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import axios from 'axios';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface KnowledgeBaseItem {
  id: number;
  name: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Conversational AI', href: '/ai-agents' },
  { title: 'Knowledge Base' },
];

export default function KnowledgeBaseIndex() {
  const [items, setItems] = useState<KnowledgeBaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      (item.content?.toLowerCase().includes(search) ?? false)
    );
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await axios.get('/api/v1/knowledge-bases', { params: { per_page: 100 } });
      setItems(response.data.data ?? []);
    } catch (error) {
      console.error('Failed to load knowledge bases', error);
      toast.error('Failed to load knowledge bases');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/v1/knowledge-bases/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDeleteId(null);
      toast.success('Knowledge Base deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Knowledge Base" />
        <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Knowledge Base" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Heading
            title="Knowledge Base"
            description="Create and manage knowledge bases for your AI agents. Select one per agent in the agent settings."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {items.length > 0 && (
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            <Button onClick={() => router.visit('/knowledge-bases/create')} className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Create Knowledge Base
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-primary/10 p-6 mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Knowledge Bases Yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-sm">
                Create a knowledge base and assign it to an AI agent so the agent can use it during conversations.
              </p>
              <Button onClick={() => router.visit('/knowledge-bases/create')} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create Knowledge Base
              </Button>
            </CardContent>
          </Card>
        ) : filteredItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground">No items match your search.</p>
              <Button variant="outline" onClick={() => setSearchTerm('')} className="mt-4">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {item.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit(`/knowledge-bases/${item.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {item.content || 'No content'}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Knowledge Base?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the knowledge base. Agents using it will fall back to their custom knowledge text (if any).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
