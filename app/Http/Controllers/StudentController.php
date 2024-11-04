<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request){
        $students = Student::latest()->paginate(5);
        return inertia('Student/List', [
            'students'=> $students
        ]);
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('message', 'Record successfully deleted.');
    }

    public function create(Request $request){
        return inertia('Student/Create');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        Student::create($validated);

        return redirect()->route('students.index')->with('message', 'Student created successfully!');
    }

    public function edit(Student $student){
        return inertia('Student/Edit',[
            'student'=>$student
        ]);
    }

    public function update(Request $request, Student $student){
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,'.$student->id,
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        $student->update($validated);
        return redirect()->route('students.index')->with('message', 'Student updated successfully!');

    }
}
