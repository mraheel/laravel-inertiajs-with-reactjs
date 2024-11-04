import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage, Link } from '@inertiajs/react';
import { PageProps } from '@/types';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/Components/ui/table"
import { Button } from '@/Components/ui/button';

type Student = {
  id: number,
  uuid: string,
  firstname: string,
  email: string,
  contact: string | null
}

type link = {
  url: string,
  label: string,
  active: boolean
}

type Students ={
  students: {
    data: Student[],
    links: link[]
  }
}

// export default function List({ students, auth }: Students) {
  export default function List({ students, auth, flash }: PageProps<Students>) {
    console.log(students);
    const { delete: destroy } = useForm()
    // const { flash } = usePage<PageProps>().props

    const handleDeleteButton = (studentId: number) => {
      destroy(route('students.destroy', studentId), {
        onBefore: () => confirm('Are you sure you want to delete this student?'),
      })
    }
 
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">Students</h2>
      }>
      <Head title="Profile" />
     
      <div className="py-12">
        
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
         
          <Link className='nav-link' href='/students/create'>Create</Link>
         
          
          {
            flash.message && <>
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Success! </span>{flash.message}
              </div>
            </> 
          }
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
           
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
              (students.data.length > 0)? (
                students.data.map((student) => (  
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.uuid}</TableCell>
                    <TableCell>{student.firstname}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.contact}</TableCell>
                    <TableCell className='flex'>

                      <Link className='mr-1 rounded-md bg-slate-800 py-1.5 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' href={`/students/${student.id}/edit`}>Edit</Link>
                      <form
                        method="POST"
                        action={route('students.destroy', student.id)}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleDeleteButton(student.id)
                          }}>
                        <button type="submit" className={`inline-flex items-center px-4 py-2 bg-red-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150`}>Delete</button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              ):(
                <TableRow key={0}>
                  <TableCell className='text-center' colSpan={5}>No Record were found.</TableCell>
                </TableRow>  
              )
            }
            
            
            </TableBody>
          </Table>
          <div className="py-12 px-4">
                {students.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 mx-1 ${
                                link.active ? "text-blue-500 font-bold" : ""
                            }`} />
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="p-1 mx-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
    
  )
}
