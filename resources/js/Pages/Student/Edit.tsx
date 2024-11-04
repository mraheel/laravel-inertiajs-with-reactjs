import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    contact: string;
    address: string;
    id: number
}

type student = {
    student: FormValues
}

export default function Edit({ student, flash }: PageProps<student>) {

  const { data, setData, put, processing, errors, reset } = useForm<FormValues>({
    firstname: student.firstname,
    lastname: student.lastname,
    email: student.email,
    contact: student.contact,
    address: student.address,
    id: student.id 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/students/${student.id}`, {
      onSuccess: () => {
        reset();
        // if (onSuccess) onSuccess();
      },
    });
  };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students
                </h2>
            }
        >
            <Head title="Update Student" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                  
                    {flash.message && (
                        <>
                            <div
                                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                                role="alert"
                            >
                                <span className="font-medium">
                                    Success alert!
                                </span>
                                {flash.message}
                            </div>
                        </>
                    )}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                 <InputLabel 
                                  value="First Name" 
                                  className="block text-sm font-medium text-gray-700" 
                                  />
                                <TextInput 
                                  type="text"
                                  id="firstname"
                                  value={data.firstname}
                                  onChange={(e)=> setData('firstname', e.target.value)}
                                  className={`mt-1 block w-full p-2 border rounded-md`}
                                />

                                {errors.firstname && <InputError message={errors.firstname} />}

                            </div>
                            <div className="mb-4">
                                <InputLabel 
                                  value="Last Name"
                                  className="block text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    type="text"
                                    id="lastname"
                                    value={data.lastname}
                                    onChange={(e)=> setData('lastname', e.target.value)}
                                    className={`mt-1 block w-full p-2 border rounded-md`}
                                />
                                {errors.lastname && <InputError message={errors.lastname} />}

                            </div>
                            
                            <div className="mb-4">
                                <InputLabel 
                                  value="Email"
                                  className="block text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    type="text"
                                    id="email"
                                    value={data.email}
                                    onChange={(e)=> setData('email', e.target.value)}
                                    className={`mt-1 block w-full p-2 border rounded-md`}
                                />
                                {errors.email && <InputError message={errors.email} />}

                            </div>
                            
                            <div className="mb-4">
                                <InputLabel 
                                  value="Contact No."
                                  className="block text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    type="text"
                                    id="contact"
                                    value={data.contact}
                                    onChange={(e)=> setData('contact', e.target.value)}
                                    className={`mt-1 block w-full p-2 border rounded-md`}
                                />
                                {errors.contact && <InputError message={errors.contact} />}

                            </div>

                            <div className="mb-4">
                                <InputLabel
                                  value="Permanent Address" 
                                  className="block text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    type="text"
                                    id="address"
                                    value={data.contact}
                                    onChange={(e)=> setData('address', e.target.value)}
                                    className={`mt-1 block w-full p-2 border rounded-md`}
                                />
                                {errors.address && <InputError message={errors.address} />}
                            </div>


                            <PrimaryButton disabled={processing} className="w-full">
                                {processing ? 'Updating...' : 'Update Student'}
                            </PrimaryButton>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
