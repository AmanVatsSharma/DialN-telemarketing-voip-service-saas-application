import { useState, useEffect } from 'react';
import { Plus, Bot, Phone, TrendingUp, DollarSign, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import axios from 'axios';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import type { AiAgent, AiAgentStats } from '@/types/ai-agent';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Conversational AI',
    href: '/ai-agents',
  },
  {
    title: 'AI Agents',
  },
];

export default function AiAgentsDashboard() {
  const [agents, setAgents] = useState<AiAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Record<number, AiAgentStats>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(agent => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      agent.name.toLowerCase().includes(search) ||
      agent.description?.toLowerCase().includes(search) ||
      agent.type.toLowerCase().includes(search) ||
      agent.model.toLowerCase().includes(search) ||
      agent.phone_number?.toLowerCase().includes(search)
    );
  });

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const response = await axios.get('/api/v1/ai-agents');
      setAgents(response.data.data || []);
    } catch (error) {
      console.error('Failed to load AI agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAgentStats = async (agentId: number) => {
    try {
      const response = await axios.get(`/api/v1/ai-agents/${agentId}`);
      setStats(prev => ({ ...prev, [agentId]: response.data.stats }));
    } catch (error) {
      console.error('Failed to load agent stats:', error);
    }
  };

  useEffect(() => {
    agents.forEach(agent => {
      loadAgentStats(agent.id);
    });
  }, [agents]);

  if (isLoading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="AI Agents" />
        <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map(i => (
              <div key={i} className="bg-card border rounded-xl p-5 space-y-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-muted rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
                <div className="h-1 bg-muted rounded-full" />
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded flex-1" />
                  <div className="size-8 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="AI Agents" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Heading
            title="AI Agents"
            description="Manage your AI-powered calling agents for inbound and outbound automation"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {agents.length > 0 && (
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            <Button onClick={() => router.visit('/ai-agents/create')} className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Create AI Agent
            </Button>
          </div>
        </div>

        {agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
              <div className="relative bg-muted/40 rounded-2xl p-5">
                <Bot className="size-14 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No AI Agents yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Create your first AI agent to handle calls with natural conversation.
            </p>
            <Button asChild>
              <Link href="/ai-agents/create">
                <Plus className="size-4 mr-2" />
                Create AI Agent
              </Link>
            </Button>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-5">
              <div className="relative bg-muted/40 rounded-2xl p-5">
                <Search className="size-14 text-muted-foreground/50" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No agents found</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              No agents match your search criteria &ldquo;{searchTerm}&rdquo;. Try adjusting your search.
            </p>
            <Button onClick={handleClearSearch} variant="outline">
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAgents.map((agent, index) => {
              const agentStats = stats[agent.id];
              const activeCalls = agent.active_calls_count || 0;
              const successRate = agentStats?.success_rate || 0;

              return (
                <div
                  key={agent.id}
                  className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                  onClick={() => router.visit(`/ai-agents/${agent.id}`)}
                >
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Gradient Avatar with Live Indicator */}
                    <div className="relative size-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                      {agent.name.charAt(0).toUpperCase()}
                      {activeCalls > 0 && (
                        <span className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                      )}
                    </div>

                    {/* Name & description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-base leading-tight truncate">{agent.name}</p>
                        <Badge variant={agent.active ? 'default' : 'secondary'} className="shrink-0">
                          {agent.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {agent.description || 'No description'}
                      </p>
                    </div>
                  </div>

                  {/* Live Call Badge */}
                  {activeCalls > 0 && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded-full w-fit mb-3">
                      <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400">LIVE</span>
                      <span className="text-xs text-red-500">{activeCalls}</span>
                    </div>
                  )}

                  {/* Meta info */}
                  <div className="space-y-1.5 text-sm mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <Badge variant="outline">{agent.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-medium truncate max-w-[140px]">{agent.model}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Voice</span>
                      <span className="font-medium">{agent.voice}</span>
                    </div>
                    {agent.phone_number && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <Badge variant="outline" className="font-mono">
                          <Phone className="mr-1 h-3 w-3" />
                          {agent.phone_number}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Stats row */}
                  {agentStats && (
                    <div className="flex items-center gap-4 text-sm border-t pt-3 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Phone className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">{agentStats.total_calls || 0}</span>
                        <span className="text-muted-foreground text-xs">calls</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">${agentStats.total_cost?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-auto">
                        <TrendingUp className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">{Math.round(agentStats.average_duration || 0)}s</span>
                        <span className="text-muted-foreground text-xs">avg</span>
                      </div>
                    </div>
                  )}

                  {/* Performance Mini-Bar */}
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-medium">{successRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(successRate, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
