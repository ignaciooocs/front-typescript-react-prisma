import { NavLink, useParams } from "react-router-dom";

export default function PageControl({ length }: { length: number }) {
  const { page } = useParams()

  return (
    <section className="flex justify-between">
      <NavLink
        to={`/dashboard/${Number(page) > 1 ? Number(page) - 1 : 1}`}
      >
        Anterior
      </NavLink>
      <p>Pagina {page}</p>
      <NavLink
        to={`/dashboard/${length > 1 ? Number(page) + 1 : Number(page)}`}
      >
        Siguiente
      </NavLink>
    </section>
  )
}