<?php

namespace App\Http\Controllers;

use App\Models\Radnik;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RadnikController extends Controller
{
    public function index()
    {
        $radnici = Radnik::all();
        return response()->json($radnici);
    }

    public function show(Radnik $radnik)
    {
        return response()->json($radnik);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ime' => 'required|max:255',
            'email' => 'required|email|unique:radnici',
        ]);

        $radnik = Radnik::create($validatedData);
        return response()->json($radnik, Response::HTTP_CREATED);
    }

    public function update(Request $request, Radnik $radnik)
    {
        $validatedData = $request->validate([
            'ime' => 'required|max:255',
            'email' => 'required|email|unique:radnici,email,'.$radnik->id,
        ]);

        $radnik->update($validatedData);
        return response()->json($radnik);
    }

    public function destroy(Radnik $radnik)
    {
        $radnik->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
