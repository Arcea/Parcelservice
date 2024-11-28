<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route('/{anything}', name: 'anything', defaults: ["anything" => null], requirements: ['anything' => '(?!api).+'])]
    public function index()
    {
        return $this->render("index/index.html.twig");
    }
}
