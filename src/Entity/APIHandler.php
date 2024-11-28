<?php

namespace App\Entity;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class APIHandler
{

    protected $baseURL;
    protected HttpClientInterface $client;

    public function __construct($baseURL, $client)
    {
        $this->baseURL = $baseURL;
        $this->client = $client;
    }

    public function getBaseURL(): ?string
    {
        return $this->baseURL;
    }

    public function getClient(): HttpClientInterface
    {
        return $this->client;
    }
}
