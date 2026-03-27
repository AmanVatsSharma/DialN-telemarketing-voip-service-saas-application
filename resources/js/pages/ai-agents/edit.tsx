import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
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
import type { AiAgent, AiModel, AiVoice } from '@/types/ai-agent';

interface Props {
  id: number;
}

export default function EditAiAgent({ id }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [models, setModels] = useState<AiModel[]>([]);
  const [voices, setVoices] = useState<AiVoice[]>([]);
  const [ttsModels, setTtsModels] = useState<any[]>([]);
  const [agent, setAgent] = useState<AiAgent | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [availableNumbers, setAvailableNumbers] = useState<any[]>([]);
  const [knowledgeBases, setKnowledgeBases] = useState<{ id: number; name: string }[]>([]);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Conversational AI', href: '/ai-agents' },
    { title: agent?.name || 'Edit Agent', href: `/ai-agents/${id}` },
  ];

  const [textProvider, setTextProvider] = useState<'openrouter' | 'openai'>('openrouter');
  const [ttsProvider, setTtsProvider] = useState<'openai'>('openai');
  const [isValidatingTextKey, setIsValidatingTextKey] = useState(false);
  const [isValidatingTtsKey, setIsValidatingTtsKey] = useState(false);
  const [textKeyValidationStatus, setTextKeyValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [ttsKeyValidationStatus, setTtsKeyValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [showTextKeyInput, setShowTextKeyInput] = useState(false);
  const [showTtsKeyInput, setShowTtsKeyInput] = useState(false);
  const [newTextApiKey, setNewTextApiKey] = useState('');
  const [newTtsApiKey, setNewTtsApiKey] = useState('');

  useEffect(() => {
    loadAgent();
    loadVoices();
    loadTtsModels();
    loadAvailableNumbers();
    loadKnowledgeBases();
  }, [id]);

  const loadKnowledgeBases = async () => {
    try {
      const res = await axios.get('/api/v1/knowledge-bases', { params: { per_page: 100 } });
      setKnowledgeBases(res.data.data ?? []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (agent) {
      setTextProvider(agent.text_provider || 'openrouter');
      setTtsProvider(agent.tts_provider || 'openai');
      loadModels(agent.text_provider || 'openrouter');
    }
  }, [agent]);

  useEffect(() => {
    loadModels(textProvider);
  }, [textProvider]);

  const loadAgent = async () => {
    try {
      const response = await axios.get(`/api/v1/ai-agents/${id}`);
      setAgent(response.data.data);
    } catch (error) {
      console.error('Failed to load agent:', error);
      toast.error('Failed to load agent');
      router.visit('/ai-agents');
    } finally {
      setLoading(false);
    }
  };

  const loadModels = async (selectedProvider: 'openrouter' | 'openai') => {
    try {
      const response = await axios.get(`/api/v1/ai-agents/models?provider=${selectedProvider}`);
      setModels(Object.values(response.data));
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const loadVoices = async () => {
    try {
      const response = await axios.get('/api/v1/ai-agents/voices');
      setVoices(Object.values(response.data));
    } catch (error) {
      console.error('Failed to load voices:', error);
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

  const validateTextProviderKey = async () => {
    const keyToValidate = isChangingApiKey ? newApiKey : agent?.text_api_key;
    if (!keyToValidate) return;

    setIsValidatingTextKey(true);
    setTextKeyValidationStatus('idle');

    try {
      const response = await axios.post('/api/v1/ai-agents/validate-text-provider', {
        provider: textProvider,
        api_key: keyToValidate,
      });

      if (response.data.valid) {
        setTextKeyValidationStatus('valid');
        toast.success(`${textProvider === 'openrouter' ? 'OpenRouter' : 'OpenAI'} API key is valid`);
      } else {
        setTextKeyValidationStatus('invalid');
        toast.error(`Invalid ${textProvider === 'openrouter' ? 'OpenRouter' : 'OpenAI'} API key`);
      }
    } catch (error: any) {
      console.error('Failed to validate text provider key:', error);
      setTextKeyValidationStatus('invalid');
      toast.error(error.response?.data?.error || 'Failed to validate API key');
    } finally {
      setIsValidatingTextKey(false);
    }
  };

  const validateTtsProviderKey = async () => {
    const keyToValidate = agent?.tts_api_key;
    if (!keyToValidate) return;

    setIsValidatingTtsKey(true);
    setTtsKeyValidationStatus('idle');

    try {
      const response = await axios.post('/api/v1/ai-agents/validate-tts-provider', {
        provider: ttsProvider,
        api_key: keyToValidate,
      });

      if (response.data.valid) {
        setTtsKeyValidationStatus('valid');
        toast.success('OpenAI TTS API key is valid');
      } else {
        setTtsKeyValidationStatus('invalid');
        toast.error('Invalid OpenAI TTS API key');
      }
    } catch (error: any) {
      console.error('Failed to validate TTS provider key:', error);
      setTtsKeyValidationStatus('invalid');
      toast.error(error.response?.data?.error || 'Failed to validate TTS API key');
    } finally {
      setIsValidatingTtsKey(false);
    }
  };

  const handleTextProviderChange = (newProvider: 'openrouter' | 'openai') => {
    if (!agent) return;
    setTextProvider(newProvider);
    setAgent({ ...agent, text_provider: newProvider });
    setTextKeyValidationStatus('idle');
    setIsChangingApiKey(false);
    setNewApiKey('');
    
    if (newProvider === 'openrouter') {
      setAgent({ ...agent, text_provider: newProvider, text_api_key: '' });
    }
  };

  const handleTtsProviderChange = (newProvider: 'openai') => {
    if (!agent) return;
    setTtsProvider(newProvider);
    setAgent({ ...agent, tts_provider: newProvider });
    setTtsKeyValidationStatus('idle');
  };

  const loadAvailableNumbers = async () => {
    try {
      console.log('Loading available phone numbers...');
      const response = await axios.get('/numbers/api/all-numbers');
      console.log('Phone numbers response:', response.data);
      setAvailableNumbers(response.data.numbers || []);
      console.log('Available numbers set:', response.data.numbers?.length || 0);
    } catch (error) {
      console.error('Failed to load phone numbers:', error);
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agent) return;

    setSaving(true);
    try {
      // Clean up data before sending
      const dataToSend: any = {
        ...agent,
        phone_number: agent.phone_number === 'none' ? null : agent.phone_number,
      };
      
      // Don't send API keys if they're empty (keep existing keys)
      if (!dataToSend.text_api_key || dataToSend.text_api_key.trim() === '') {
        delete dataToSend.text_api_key;
      }
      if (!dataToSend.tts_api_key || dataToSend.tts_api_key.trim() === '') {
        delete dataToSend.tts_api_key;
      }
      
      console.log('Submitting agent data:', dataToSend);
      await axios.put(`/api/v1/ai-agents/${id}`, dataToSend);
      toast.success('AI Agent updated successfully');
      router.visit(`/ai-agents/${id}`);
    } catch (error: any) {
      console.error('Failed to update AI agent:', error);
      console.error('Error response:', error.response?.data);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
        const errors = error.response.data.errors;
        
        // Show validation errors
        Object.entries(errors).forEach(([field, messages]: [string, any]) => {
          console.error(`  ${field}:`, messages);
          const errorMessages = Array.isArray(messages) ? messages : [messages];
          errorMessages.forEach((msg: string) => {
            const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            toast.error(`${fieldName}: ${msg}`);
          });
        });
      } else {
        // Show general error
        const errorMessage = error.response?.data?.message || 'Failed to update AI agent';
        toast.error(errorMessage);
      }
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = () => {
    if (!agent) return;
    if (keywordInput.trim() && !agent.transfer_keywords?.includes(keywordInput.trim())) {
      setAgent({
        ...agent,
        transfer_keywords: [...(agent.transfer_keywords || []), keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    if (!agent) return;
    setAgent({
      ...agent,
      transfer_keywords: agent.transfer_keywords?.filter(k => k !== keyword) || [],
    });
  };

  if (loading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Loading..." />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      </AppLayout>
    );
  }

  if (!agent) return null;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${agent.name}`} />
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.visit(`/ai-agents/${id}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Heading 
            title={`Edit ${agent.name}`}
            description="Update AI agent configuration and settings"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>General details about your AI agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Agent Name *</Label>
                  <Input
                    id="name"
                    value={agent.name}
                    onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                    placeholder="Support Agent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={agent.description || ''}
                    onChange={(e) => setAgent({ ...agent, description: e.target.value })}
                    placeholder="Describe what this agent does..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Agent Type *</Label>
                  <Select
                    value={agent.type}
                    onValueChange={(value: 'inbound' | 'outbound' | 'both') => setAgent({ ...agent, type: value })}
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
                </div>
              </CardContent>
            </Card>

            {/* Phone Number Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Phone Number Assignment</CardTitle>
                <CardDescription>Assign a dedicated phone number to this AI agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number (Optional)</Label>
                  <Select
                    value={agent.phone_number || 'none'}
                    onValueChange={(value) => setAgent({ ...agent, phone_number: value === 'none' ? null : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a phone number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Phone Number</SelectItem>
                      {availableNumbers.length === 0 && (
                        <SelectItem value="loading" disabled>Loading numbers...</SelectItem>
                      )}
                      {availableNumbers.map((number) => (
                        <SelectItem key={number.id} value={number.number}>
                          {number.formatted_number || number.number} 
                          {number.friendly_name && ` - ${number.friendly_name}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Assign a phone number for inbound calls. This number will be dedicated to this AI agent.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>Provider, model and voice settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Text Generation Provider *</Label>
                  <p className="text-xs text-muted-foreground">Select the AI provider for text generation</p>
                  <div className="flex gap-2 mt-1">
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
                        <Label htmlFor="text_api_key" className="text-xs font-medium">OpenAI API Key</Label>
                        {agent?.text_api_key && !showTextKeyInput && (
                          <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Configured
                          </span>
                        )}
                      </div>
                      
                      {!agent?.text_api_key || showTextKeyInput ? (
                        <>
                          <div className="flex gap-1.5">
                            <Input
                              id="text_api_key"
                              type="password"
                              placeholder="sk-..."
                              value={newTextApiKey}
                              onChange={(e) => {
                                setNewTextApiKey(e.target.value);
                                setAgent(agent ? { ...agent, text_api_key: e.target.value } : null);
                              }}
                              required={textProvider === 'openai' && !agent?.text_api_key}
                              className="text-xs h-8"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={validateTextProviderKey}
                              disabled={isValidatingTextKey || !newTextApiKey}
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
                          {agent?.text_api_key && showTextKeyInput && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setShowTextKeyInput(false);
                                setNewTextApiKey('');
                                setAgent(agent ? { ...agent, text_api_key: agent.text_api_key } : null);
                              }}
                              className="h-6 px-2 mt-1 text-xs"
                            >
                              Keep existing key
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

                {/* TTS Provider Configuration */}
                <div className="space-y-2 pt-4 border-t">
                  <Label>Text-to-Speech (TTS) Provider *</Label>
                  <p className="text-xs text-muted-foreground">Select the provider for voice synthesis</p>
                  <div className="flex gap-2 mt-1">
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
                  </div>

                  {ttsProvider === 'openai' && (
                    <div className="mt-2 p-2 border rounded-md bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900/30">
                      <Label htmlFor="tts_api_key" className="text-xs font-medium">OpenAI TTS API Key (Optional)</Label>
                      <div className="flex gap-1.5 mt-1.5">
                        <Input
                          id="tts_api_key"
                          type="password"
                          placeholder={agent?.tts_api_key ? "••••••••••••••••••••••••" : "sk-... (optional)"}
                          value={agent?.tts_api_key || ''}
                          onChange={(e) => {
                            setAgent(agent ? { ...agent, tts_api_key: e.target.value } : null);
                            setTtsKeyValidationStatus('idle');
                          }}
                          className="text-xs h-8"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={validateTtsProviderKey}
                          disabled={isValidatingTtsKey || !agent?.tts_api_key}
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
                          Valid OpenAI TTS API key
                        </p>
                      )}
                      {ttsKeyValidationStatus === 'invalid' && (
                        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Invalid OpenAI TTS API key
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Leave empty to use platform key. Get your own from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-primary underline">OpenAI</a>
                      </p>
                    </div>
                  )}
                </div>

                {/* TTS Model Selection */}
                <div className="space-y-2 pt-2">
                  <Label htmlFor="tts_model">TTS Model *</Label>
                  <Select
                    value={agent.tts_model || 'tts-1'}
                    onValueChange={(value) => setAgent({ ...agent, tts_model: value })}
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
                    ⚡ TTS-1 = Fastest for real-time | GPT-4o Mini TTS = Fast + Emotional voice
                  </p>
                </div>

                {/* TTS Instructions - Only for gpt-4o-mini-tts */}
                {agent.tts_model === 'gpt-4o-mini-tts' && (
                  <div className="space-y-2">
                    <Label htmlFor="tts_instructions">Voice Instructions *</Label>
                    <textarea
                      id="tts_instructions"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={agent.tts_instructions || ''}
                      onChange={(e) => setAgent({ ...agent, tts_instructions: e.target.value })}
                      placeholder="Example: Speak slowly with a warm, empathetic tone, conveying genuine care and understanding."
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground">
                      🎭 Describe the emotion, tone, pace, and style for the AI voice. This controls how the message is delivered.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="model">AI Model *</Label>
                  <Select
                    value={agent.model}
                    onValueChange={(value) => setAgent({ ...agent, model: value })}
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
                    value={agent.voice}
                    onValueChange={(value) => setAgent({ ...agent, voice: value })}
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
                      value={agent.max_tokens || 500}
                      onChange={(e) => setAgent({ ...agent, max_tokens: parseInt(e.target.value) })}
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
                      value={agent.temperature || 0.7}
                      onChange={(e) => setAgent({ ...agent, temperature: parseFloat(e.target.value) })}
                      min={0}
                      max={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="system_prompt">System Prompt *</Label>
                  <Textarea
                    id="system_prompt"
                    value={agent.system_prompt}
                    onChange={(e) => setAgent({ ...agent, system_prompt: e.target.value })}
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
                    value={agent.first_message || ''}
                    onChange={(e) => setAgent({ ...agent, first_message: e.target.value })}
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
                    value={agent.goodbye_message || ''}
                    onChange={(e) => setAgent({ ...agent, goodbye_message: e.target.value })}
                    placeholder="Thank you for your time. Have a great day!"
                    maxLength={500}
                    rows={2}
                  />
                  <p className="text-sm text-muted-foreground">Message played before call ends</p>
                </div>

                <div className="space-y-2">
                  <Label>Knowledge Base</Label>
                  <Select
                    value={agent.knowledge_base_id != null ? String(agent.knowledge_base_id) : 'none'}
                    onValueChange={(v) => setAgent({
                      ...agent,
                      knowledge_base_id: v === 'none' ? null : Number(v),
                      knowledge_base: v === 'none' ? agent.knowledge_base ?? '' : '',
                    })}
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
                {agent.knowledge_base_id == null && (
                  <div className="space-y-2">
                    <Label htmlFor="knowledge_base">Custom Knowledge Base</Label>
                    <Textarea
                      id="knowledge_base"
                      value={agent.knowledge_base || ''}
                      onChange={(e) => setAgent({ ...agent, knowledge_base: e.target.value })}
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
                    checked={agent.active}
                    onCheckedChange={(checked) => setAgent({ ...agent, active: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Recording</Label>
                    <p className="text-sm text-muted-foreground">Record all calls for quality assurance</p>
                  </div>
                  <Switch
                    checked={agent.enable_recording}
                    onCheckedChange={(checked) => setAgent({ ...agent, enable_recording: checked })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max_duration">Max Duration (seconds)</Label>
                    <Input
                      id="max_duration"
                      type="number"
                      value={agent.max_duration || 600}
                      onChange={(e) => setAgent({ ...agent, max_duration: parseInt(e.target.value) })}
                      min={60}
                      max={3600}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="silence_timeout">Silence Timeout (seconds)</Label>
                    <Input
                      id="silence_timeout"
                      type="number"
                      value={agent.silence_timeout || 10}
                      onChange={(e) => setAgent({ ...agent, silence_timeout: parseInt(e.target.value) })}
                      min={5}
                      max={60}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response_timeout">Response Timeout (seconds)</Label>
                    <Input
                      id="response_timeout"
                      type="number"
                      value={agent.response_timeout || 10}
                      onChange={(e) => setAgent({ ...agent, response_timeout: parseInt(e.target.value) })}
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
                    checked={agent.enable_transfer}
                    onCheckedChange={(checked) => setAgent({ ...agent, enable_transfer: checked })}
                  />
                </div>

                {agent.enable_transfer && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="transfer_number">Transfer Number *</Label>
                      <Input
                        id="transfer_number"
                        value={agent.transfer_number || ''}
                        onChange={(e) => setAgent({ ...agent, transfer_number: e.target.value })}
                        placeholder="+1234567890"
                        required={agent.enable_transfer}
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
                        {agent.transfer_keywords?.map((keyword) => (
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
              <Button type="button" variant="outline" onClick={() => router.visit(`/ai-agents/${id}`)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
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
