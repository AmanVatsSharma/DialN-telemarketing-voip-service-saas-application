import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import type { AiAgentFormData, AiModel, AiVoice } from '@/types/ai-agent';

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
    title: 'Create Agent',
    href: '/ai-agents/create',
  },
];

export default function CreateAiAgent() {
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<AiModel[]>([]);
  const [voices, setVoices] = useState<AiVoice[]>([]);
  const [ttsModels, setTtsModels] = useState<any[]>([]);
  const [textProvider, setTextProvider] = useState<'openrouter' | 'openai'>('openrouter');
  const [ttsProvider, setTtsProvider] = useState<'openai'>('openai');
  const [isValidatingTextKey, setIsValidatingTextKey] = useState(false);
  const [isValidatingTtsKey, setIsValidatingTtsKey] = useState(false);
  const [textKeyValidationStatus, setTextKeyValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [ttsKeyValidationStatus, setTtsKeyValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  
  // Track if user has already configured API keys
  const [hasConfiguredTextKey, setHasConfiguredTextKey] = useState(false);
  const [hasConfiguredTtsKey, setHasConfiguredTtsKey] = useState(false);
  const [showTextKeyInput, setShowTextKeyInput] = useState(false);
  const [showTtsKeyInput, setShowTtsKeyInput] = useState(false);
  
  const [formData, setFormData] = useState<AiAgentFormData>({
    name: '',
    description: '',
    type: 'inbound',
    text_provider: 'openrouter',
    text_api_key: '',
    tts_provider: 'openai',
    tts_api_key: '',
    tts_model: 'tts-1',
    tts_instructions: '',
    system_prompt: '',
    first_message: '',
    goodbye_message: '',
    knowledge_base: '',
    knowledge_base_id: null as number | null,
    model: 'openai/gpt-oss-20b:free',
    voice: 'alloy',
    max_tokens: 500,
    temperature: 0.7,
    active: true,
    enable_transfer: false,
    transfer_number: '',
    enable_recording: true,
    max_duration: 600,
    silence_timeout: 10,
    response_timeout: 10,
    trigger_keywords: [],
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [knowledgeBases, setKnowledgeBases] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    loadModelsAndVoices();
    loadTtsModels();
    checkExistingApiKeys();
    loadKnowledgeBases();
  }, []);

  const loadKnowledgeBases = async () => {
    try {
      const res = await axios.get('/api/v1/knowledge-bases', { params: { per_page: 100 } });
      setKnowledgeBases(res.data.data ?? []);
    } catch {
      // ignore
    }
  };

  const checkExistingApiKeys = async () => {
    try {
      const response = await axios.get('/api/v1/ai-agents/check-api-keys');
      setHasConfiguredTextKey(response.data.has_text_api_key);
      setHasConfiguredTtsKey(response.data.has_tts_api_key);
      // Don't show input by default if keys are already configured
      setShowTextKeyInput(!response.data.has_text_api_key);
      setShowTtsKeyInput(!response.data.has_tts_api_key);
    } catch (error) {
      console.error('Failed to check API keys:', error);
      // If check fails, show inputs by default
      setShowTextKeyInput(true);
      setShowTtsKeyInput(true);
    }
  };

  const loadModelsAndVoices = async (selectedProvider: 'openrouter' | 'openai' = 'openrouter') => {
    try {
      const [modelsRes, voicesRes] = await Promise.all([
        axios.get(`/api/v1/ai-agents/models?provider=${selectedProvider}`),
        axios.get('/api/v1/ai-agents/voices'),
      ]);
      setModels(Object.values(modelsRes.data));
      setVoices(Object.values(voicesRes.data));
      
      // Set default model based on provider
      if (modelsRes.data.length > 0) {
        setFormData(prev => ({ ...prev, model: modelsRes.data[0].id }));
      }
    } catch (error) {
      console.error('Failed to load models/voices:', error);
    }
  };

  const loadTtsModels = async () => {
    try {
      const response = await axios.get('/api/v1/ai-agents/tts-models?provider=openai');
      setTtsModels(response.data);
    } catch (error) {
      console.error('Failed to load TTS models:', error);
    }
  };

  const validateTextProviderKey = async (provider: 'openrouter' | 'openai', apiKey: string) => {
    if (!apiKey) {
      setTextKeyValidationStatus('idle');
      return;
    }
    
    setIsValidatingTextKey(true);
    setTextKeyValidationStatus('idle');
    try {
      const response = await axios.post('/api/v1/ai-agents/validate-text-provider', {
        provider,
        api_key: apiKey,
      });
      setTextKeyValidationStatus(response.data.valid ? 'valid' : 'invalid');
      if (response.data.valid) {
        toast.success(`${provider === 'openai' ? 'OpenAI' : 'OpenRouter'} API key is valid`);
        // Load models for the provider
        await loadModelsAndVoices(provider);
      }
    } catch (error: unknown) {
      setTextKeyValidationStatus('invalid');
      const errorMessage = error instanceof Error ? error.message : 'Invalid API key';
      toast.error(errorMessage);
    } finally {
      setIsValidatingTextKey(false);
    }
  };

  const validateTtsProviderKey = async (provider: 'openai', apiKey: string) => {
    if (!apiKey) {
      setTtsKeyValidationStatus('idle');
      return;
    }
    
    setIsValidatingTtsKey(true);
    setTtsKeyValidationStatus('idle');
    try {
      const response = await axios.post('/api/v1/ai-agents/validate-tts-provider', {
        provider,
        api_key: apiKey,
      });
      setTtsKeyValidationStatus(response.data.valid ? 'valid' : 'invalid');
      if (response.data.valid) {
        toast.success('TTS API key is valid');
      }
    } catch (error: unknown) {
      setTtsKeyValidationStatus('invalid');
      const errorMessage = error instanceof Error ? error.message : 'Invalid TTS API key';
      toast.error(errorMessage);
    } finally {
      setIsValidatingTtsKey(false);
    }
  };

  const handleTextProviderChange = (newProvider: 'openrouter' | 'openai') => {
    setTextProvider(newProvider);
    setFormData({ ...formData, text_provider: newProvider });
    
    if (newProvider === 'openrouter') {
      setTextKeyValidationStatus('idle');
      loadModelsAndVoices('openrouter');
    } else {
      // For OpenAI, wait for key validation before loading models
      setModels([]);
      setTextKeyValidationStatus('idle');
    }
  };

  const handleTtsProviderChange = (newProvider: 'openai') => {
    setTtsProvider(newProvider);
    setFormData({ ...formData, tts_provider: newProvider });
    setTtsKeyValidationStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/v1/ai-agents', formData);
      toast.success('AI Agent created successfully');
      router.visit('/ai-agents');
    } catch (error: unknown) {
      console.error('Failed to create AI agent:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create AI agent';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.trigger_keywords?.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        trigger_keywords: [...(formData.trigger_keywords || []), keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      trigger_keywords: formData.trigger_keywords?.filter(k => k !== keyword) || [],
    });
  };

  const defaultPrompts = {
    inbound_support: "You are a helpful customer support agent. Listen carefully to customer inquiries and provide clear, accurate assistance. Be empathetic and professional.",
    inbound_sales: "You are a sales agent. Engage with potential customers, understand their needs, and present relevant solutions. Be persuasive but not pushy.",
    outbound_survey: "You are conducting a brief survey. Be polite and respectful of people's time. Ask questions clearly and record responses accurately.",
    outbound_lead: "You are a lead qualification agent. Your goal is to assess if the contact is a good fit for our services. Ask qualifying questions professionally.",
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create AI Agent" />
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.visit('/ai-agents')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Heading 
            title="Create AI Agent" 
            description="Configure a new AI-powered calling agent with custom prompts and settings"
          />
        </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Basic Information</CardTitle>
              <CardDescription className="text-sm">Configure the agent's identity and purpose</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Support Agent"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this agent does..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Agent Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'inbound' | 'outbound' | 'both') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound (Answer Calls)</SelectItem>
                    <SelectItem value="outbound">Outbound (Make Calls)</SelectItem>
                    <SelectItem value="both">Both (Inbound & Outbound)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose "Both" if this agent should handle both incoming and outgoing calls
                </p>
              </div>
            </CardContent>
          </Card>

          {/* TEXT GENERATION Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Text Generation Configuration</CardTitle>
              <CardDescription>AI provider for conversation intelligence (LLM)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text_provider" className="text-sm font-medium">
                  Text Generation Provider <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleTextProviderChange('openrouter')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      textProvider === 'openrouter'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    OpenRouter
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTextProviderChange('openai')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      textProvider === 'openai'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    OpenAI
                  </button>
                </div>

                {textProvider === 'openai' && (
                  <div className="mt-2 p-2 border rounded-md bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900/30">
                    <div className="flex items-center justify-between mb-1.5">
                      <Label htmlFor="text_api_key" className="text-xs font-medium">
                        OpenAI API Key {!hasConfiguredTextKey && '*'}
                      </Label>
                      {hasConfiguredTextKey && !showTextKeyInput && (
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Using configured key
                        </span>
                      )}
                    </div>
                    
                    {!hasConfiguredTextKey || showTextKeyInput ? (
                      <>
                        <div className="flex gap-1.5">
                          <Input
                            id="text_api_key"
                            type="password"
                            placeholder="sk-..."
                            value={formData.text_api_key}
                            onChange={(e) => setFormData({ ...formData, text_api_key: e.target.value })}
                            required={textProvider === 'openai' && !hasConfiguredTextKey}
                            className="text-xs h-8"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => validateTextProviderKey(textProvider, formData.text_api_key || '')}
                            disabled={isValidatingTextKey || !formData.text_api_key}
                            className="h-8 px-2"
                          >
                            {isValidatingTextKey ? (
                              <span className="flex items-center gap-1">
                                <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Validating...
                              </span>
                            ) : (
                              'Validate'
                            )}
                          </Button>
                        </div>
                        {textKeyValidationStatus === 'valid' && (
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Valid OpenAI API key
                          </p>
                        )}
                        {textKeyValidationStatus === 'invalid' && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Invalid OpenAI API key
                          </p>
                        )}
                        {hasConfiguredTextKey && showTextKeyInput && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setShowTextKeyInput(false);
                              setFormData({ ...formData, text_api_key: '' });
                            }}
                            className="h-6 px-2 mt-1 text-xs"
                          >
                            Use configured key instead
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setShowTextKeyInput(true)}
                        className="h-8 text-xs"
                      >
                        Change API Key
                      </Button>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Get key from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-primary underline">OpenAI</a>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">AI Model *</Label>
                <Select
                  value={formData.model}
                  onValueChange={(value) => setFormData({ ...formData, model: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {model.cost_per_1k_tokens === 0 ? 'FREE' : `$${model.cost_per_1k_tokens}/1K`}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice">Voice *</Label>
                <Select
                  value={formData.voice}
                  onValueChange={(value) => setFormData({ ...formData, voice: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name} ({voice.gender}) - {voice.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_tokens">Max Tokens</Label>
                  <Input
                    id="max_tokens"
                    type="number"
                    value={formData.max_tokens}
                    onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                    min={100}
                    max={4000}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                    min={0}
                    max={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TTS Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Text-to-Speech (TTS) Configuration</CardTitle>
              <CardDescription>Voice generation provider for AI responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tts_provider" className="text-sm font-medium">
                  TTS Provider <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleTtsProviderChange('openai')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      ttsProvider === 'openai'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    OpenAI TTS
                  </button>
                  {/* Future providers: ElevenLabs, Google TTS, etc. */}
                </div>

                {ttsProvider === 'openai' && (
                  <div className="mt-2 p-2 border rounded-md bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900/30">
                    <div className="flex items-center justify-between mb-1.5">
                      <Label htmlFor="tts_api_key" className="text-xs font-medium">
                        OpenAI TTS API Key {!hasConfiguredTtsKey && '*'}
                      </Label>
                      {hasConfiguredTtsKey && !showTtsKeyInput && (
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Using configured key
                        </span>
                      )}
                    </div>
                    
                    {!hasConfiguredTtsKey || showTtsKeyInput ? (
                      <>
                        <div className="flex gap-1.5">
                          <Input
                            id="tts_api_key"
                            type="password"
                            placeholder="sk-..."
                            value={formData.tts_api_key}
                            onChange={(e) => setFormData({ ...formData, tts_api_key: e.target.value })}
                            required={ttsProvider === 'openai' && !hasConfiguredTtsKey}
                            className="text-xs h-8"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => validateTtsProviderKey(ttsProvider, formData.tts_api_key || '')}
                            disabled={isValidatingTtsKey || !formData.tts_api_key}
                            className="h-8 px-2"
                          >
                            {isValidatingTtsKey ? (
                              <span className="flex items-center gap-1">
                                <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Validating...
                              </span>
                            ) : (
                              'Validate'
                            )}
                          </Button>
                        </div>
                        {ttsKeyValidationStatus === 'valid' && (
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Valid TTS API key
                          </p>
                        )}
                        {ttsKeyValidationStatus === 'invalid' && (
                          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Invalid TTS API key
                          </p>
                        )}
                        {hasConfiguredTtsKey && showTtsKeyInput && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setShowTtsKeyInput(false);
                              setFormData({ ...formData, tts_api_key: '' });
                            }}
                            className="h-6 px-2 mt-1 text-xs"
                          >
                            Use configured key instead
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setShowTtsKeyInput(true)}
                        className="h-8 text-xs"
                      >
                        Change API Key
                      </Button>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Get key from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-primary underline">OpenAI</a>
                    </p>
                  </div>
                )}
              </div>

              {/* TTS Model Selection */}
              <div className="space-y-2">
                <Label htmlFor="tts_model">TTS Model *</Label>
                <Select
                  value={formData.tts_model}
                  onValueChange={(value) => setFormData({ ...formData, tts_model: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ttsModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{model.name}</span>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  ⚡ Choose TTS-1 for fastest response (real-time streaming) or GPT-4o Mini TTS for emotional, natural voice
                </p>
              </div>

              {/* TTS Instructions - Only for gpt-4o-mini-tts */}
              {formData.tts_model === 'gpt-4o-mini-tts' && (
                <div className="space-y-2">
                  <Label htmlFor="tts_instructions">Voice Instructions *</Label>
                  <textarea
                    id="tts_instructions"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.tts_instructions}
                    onChange={(e) => setFormData({ ...formData, tts_instructions: e.target.value })}
                    placeholder="Example: Speak slowly with a warm, empathetic tone, conveying genuine care and understanding."
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground">
                    🎭 Describe the emotion, tone, pace, and style for the AI voice. This controls how the message is delivered.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call Behavior */}
          <Card>
            <CardHeader>
              <CardTitle>Call Behavior</CardTitle>
              <CardDescription>Configure call handling and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_duration">Max Call Duration (seconds)</Label>
                  <Input
                    id="max_duration"
                    type="number"
                    value={formData.max_duration}
                    onChange={(e) => setFormData({ ...formData, max_duration: parseInt(e.target.value) })}
                    min={60}
                    max={3600}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="system_prompt">System Prompt *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, system_prompt: defaultPrompts[value as keyof typeof defaultPrompts] })}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Use template..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound_support">Support Template</SelectItem>
                      <SelectItem value="inbound_sales">Sales Template</SelectItem>
                      <SelectItem value="outbound_survey">Survey Template</SelectItem>
                      <SelectItem value="outbound_lead">Lead Qual Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  id="system_prompt"
                  value={formData.system_prompt}
                  onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                  placeholder="You are a helpful assistant..."
                  rows={6}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  ℹ️ Voice AI base instructions (concise responses, natural pauses, safety rules) are automatically applied. Add your specific role and task instructions here.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="first_message">First Message (Optional)</Label>
                <Textarea
                  id="first_message"
                  value={formData.first_message}
                  onChange={(e) => setFormData({ ...formData, first_message: e.target.value })}
                  placeholder="Hi! Thanks for calling. How can I help you today?"
                  maxLength={500}
                  rows={2}
                />
                <p className="text-sm text-muted-foreground">Greeting played when call connects</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goodbye_message">Goodbye Message (Optional)</Label>
                <Textarea
                  id="goodbye_message"
                  value={formData.goodbye_message}
                  onChange={(e) => setFormData({ ...formData, goodbye_message: e.target.value })}
                  placeholder="Thank you for your time. Have a great day!"
                  maxLength={500}
                  rows={2}
                />
                <p className="text-sm text-muted-foreground">Message played before call ends</p>
              </div>

              <div className="space-y-2">
                <Label>Knowledge Base</Label>
                <Select
                  value={formData.knowledge_base_id != null ? String(formData.knowledge_base_id) : 'none'}
                  onValueChange={(v) => setFormData({ ...formData, knowledge_base_id: v === 'none' ? null : Number(v), knowledge_base: v === 'none' ? formData.knowledge_base : '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or use custom below" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (use custom text below)</SelectItem>
                    {knowledgeBases.map((kb) => (
                      <SelectItem key={kb.id} value={String(kb.id)}>{kb.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Select a saved knowledge base or enter custom text below</p>
              </div>
              {formData.knowledge_base_id == null && (
                <div className="space-y-2">
                  <Label htmlFor="knowledge_base">Custom Knowledge Base</Label>
                  <Textarea
                    id="knowledge_base"
                    value={formData.knowledge_base}
                    onChange={(e) => setFormData({ ...formData, knowledge_base: e.target.value })}
                    placeholder="Product details, FAQs, company information, policies..."
                    rows={8}
                  />
                  <p className="text-sm text-muted-foreground">Context and information for the AI to reference during conversations</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Call Settings</CardTitle>
              <CardDescription>Configure call behavior and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active</Label>
                  <p className="text-sm text-muted-foreground">Enable this agent to handle calls</p>
                </div>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Recording</Label>
                  <p className="text-sm text-muted-foreground">Record all calls for quality assurance</p>
                </div>
                <Switch
                  checked={formData.enable_recording}
                  onCheckedChange={(checked) => setFormData({ ...formData, enable_recording: checked })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_duration">Max Duration (seconds)</Label>
                  <Input
                    id="max_duration"
                    type="number"
                    value={formData.max_duration}
                    onChange={(e) => setFormData({ ...formData, max_duration: parseInt(e.target.value) })}
                    min={60}
                    max={3600}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="silence_timeout">Silence Timeout (seconds)</Label>
                  <Input
                    id="silence_timeout"
                    type="number"
                    value={formData.silence_timeout}
                    onChange={(e) => setFormData({ ...formData, silence_timeout: parseInt(e.target.value) })}
                    min={5}
                    max={60}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="response_timeout">Response Timeout (seconds)</Label>
                  <Input
                    id="response_timeout"
                    type="number"
                    value={formData.response_timeout}
                    onChange={(e) => setFormData({ ...formData, response_timeout: parseInt(e.target.value) })}
                    min={5}
                    max={30}
                  />
                  <p className="text-sm text-muted-foreground">How long to wait for AI response before timing out</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Transfer to Human</Label>
                  <p className="text-sm text-muted-foreground">Allow agent to transfer calls</p>
                </div>
                <Switch
                  checked={formData.enable_transfer}
                  onCheckedChange={(checked) => setFormData({ ...formData, enable_transfer: checked })}
                />
              </div>

              {formData.enable_transfer && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="transfer_number">Transfer Number *</Label>
                    <Input
                      id="transfer_number"
                      value={formData.transfer_number}
                      onChange={(e) => setFormData({ ...formData, transfer_number: e.target.value })}
                      placeholder="+1234567890"
                      required={formData.enable_transfer}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Transfer Keywords</Label>
                    <p className="text-sm text-muted-foreground">Keywords that trigger call transfer. Examples: agent, human, representative, speak to someone</p>
                    <div className="flex space-x-2">
                      <Input
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        placeholder="e.g., agent, human, representative..."
                      />
                      <Button type="button" onClick={addKeyword}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.trigger_keywords?.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                          {keyword} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.visit('/ai-agents')} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>Creating...</>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create AI Agent
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      </div>
    </AppLayout>
  );
}
