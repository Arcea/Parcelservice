<?php

namespace App\Controller;

use App\Entity\CustomerServiceHandler;
use App\Entity\ParcelServiceHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route("/api")]
class ParcelServiceController extends AbstractController
{

    private $parcelServiceHandler;
    private $customerServiceHandler;

    public function __construct(
        private HttpClientInterface $client
    ) {
        $this->parcelServiceHandler = new ParcelServiceHandler($client);
        $this->customerServiceHandler = new CustomerServiceHandler($client);
    }


    #[Route('/companies', name: 'companies_get', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $response = $this->parcelServiceHandler->getCompanies();
        return new JsonResponse($response);
    }

    #[Route('/companies/{company}/brands', name: 'brands_get', methods: ['GET'])]
    public function brands(string $company): JsonResponse
    {
        $response = $this->parcelServiceHandler->getBrands($company);
        return new JsonResponse($response);
    }

    #[Route('/companies/{company}/products', name: 'products_get', methods: ['GET'])]
    public function products(string $company): JsonResponse
    {
        $response = $this->parcelServiceHandler->getProducts($company);
        return new JsonResponse($response);
    }

    #[Route('/shipment', name: 'shipment_post', methods: ['POST'])]
    public function shipment(Request $request)
    {
        $data = json_decode($request->getContent(), false);
        $shipment = $this->parcelServiceHandler->buildOrder($data, $this->customerServiceHandler->getOrder());
        dd($shipment);
    }
}
