import { Navigate } from "react-router-dom";
import CreateNote from "../components/CreateNote";
import { useAuthStore } from "../states/useAuthStore";

export default function Create () {
    const { token } = useAuthStore()
    if (!token) return <Navigate to="/sign-in"/>

    return (
        <section className="flex flex-col items-center items-center w-full py-10">
            <h3 className="flex gap-x-3 items-center font-bold text-gray-500 space-x-1 my-2 p-3">Agregar Nueva Nota</h3>
            <CreateNote />
        </section>
    )
}