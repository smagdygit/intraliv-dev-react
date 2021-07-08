<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AbaxController extends Controller
{
    function getAll()
    {/*
        // create curl resource
        $params = ['client_id' => 'zy9vkSTcrpgi6l30Q6YXkksrHBSY8STW111', 'client_secret' => 'vwVVR9ID3dDDeDfbXGpu7YJj81lYlgqK',
        'grant_type' => 'client_credentials', 'scope' => 'open_api.sandbox+open_api.sandbox.vehicles',
        'Content-Type' => 'application/x-www-form-urlencoded', 'Accept' => 'application/json'];
        $defaults = array(
            CURLOPT_URL => 'https://api-test.abax.cloud/v1/api-capabilites', //https://identity.abax.cloud/connect/token
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $params,
            CURLOPT_RETURNTRANSFER => true
        );
        $ch = curl_init();
        curl_setopt_array($ch, $defaults);

        // $output contains the output string
        $output = curl_exec($ch);

        // close curl resource to free up system resources
        curl_close($ch);

        return(print_r($output, true));*/

        $url = "https://identity.abax.cloud/connect/token";

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);

        $headers = array(
            "Accept: application/json",
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        //for debug only!
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);
        curl_close($curl);
        return(print_r($resp));
    }
}
