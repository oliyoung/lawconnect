import { Prompt } from "@/types"
import { useForm, SubmitHandler } from "react-hook-form"

interface FormData {
    body: string
}

interface NewPromptParams {
    onSuccess: (id: Prompt['id']) => void
}

export default function NewPrompt({ onSuccess }: NewPromptParams) {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // usePostPrompt(data)
        // onSuccess(data)
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-full flex flex-col gap-4 p-4" >
                <textarea defaultValue="test" {...register("body", { required: true })} className="block w-full rounded-md border-0 p-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
                {errors.body && <p className="mt-3 text-sm/6 text-red-600">This field is required</p>}
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
            </div>
        </form>
    )
}