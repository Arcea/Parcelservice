<?php

namespace App\Entity;

class ParcelServiceHandler extends APIHandler
{

    private $auth;

    public function __construct($client)
    {
        parent::__construct('https://api.pakketdienst.nl', $client);
        $this->auth = ['auth_basic' => [$_SERVER['API_USERNAME'], $_SERVER['API_PASSWORD']]];
    }

    public function getCompanies()
    {
        return $this->client->request(
            'GET',
            "{$this->baseURL}/companies",
            $this->auth
        )->toArray();
    }

    public function getBrands($company)
    {
        return $this->client->request(
            'GET',
            "{$this->baseURL}/companies/{$company}/brands",
            $this->auth
        )->toArray();
    }

    public function getProducts($company)
    {
        return $this->client->request(
            'GET',
            "{$this->baseURL}/companies/{$company}/products",
            $this->auth
        )->toArray();
    }

    public function buildOrder($object, $order)
    {
        $data = json_encode([
            'brand_id' => $object->brand,
            'reference' => $order['number'],
            'weight' => 1000,
            'product_id' => $object->product,
            'product_combination_id' => $object->combination,
            'cod_amount' => 0,
            'piece_total' => 1,
            'receiver_contact' => [
                'companyname' => $order['delivery_address']['companyname'],
                'name' => $order['delivery_address']['name'],
                'street' => $order['delivery_address']['street'],
                'housenumber' => $order['delivery_address']['housenumber'],
                'postalcode' => $order['delivery_address']['zipcode'],
                'locality' => $order['delivery_address']['city'],
                'country' => $order['delivery_address']['country'],
                'email' => $order['billing_address']['email'],
            ]
        ]);
        return $data;

        // return $this->client->request(
        //     'POST',
        //     "{$this->baseURL}/companies/{$object->company}/shipments",
        //     $this->auth,
        //     [
        //         'json' => $data
        //     ]
        // )->toArray();
    }
}
