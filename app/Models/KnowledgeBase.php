<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KnowledgeBase extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'content'];

    public function aiAgents(): HasMany
    {
        return $this->hasMany(AiAgent::class, 'knowledge_base_id');
    }
}
