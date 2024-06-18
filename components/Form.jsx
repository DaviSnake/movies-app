import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"


const Form = ({formData, forNewMovie = true}) => {

    const router = useRouter()

    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot
    })

    const handleChange = e => {
        const {value, name} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const [menssage, setMenssage] = useState([])

    const handleSubmit = e => {
        e.preventDefault()

        if (forNewMovie){
            postData(form)    
        }else{
            //editar data
            putData(form)
        }
        
    }

    const putData = async (form) => {

        setMenssage([])
        const { id } = router.query

        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json" 
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            if(!data.success){
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        {menssage: error.message}
                    ])
                }
            }else{
                router.push("/")
            }

            //console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    const postData = async (form) => {
        setMenssage([])
        try {
            console.log(form)
            const res = await fetch("/api/movie", {
                method: "POST",
                headers: {
                    "Content-type": "application/json" 
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            if(!data.success){
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        {menssage: error.message}
                    ])
                }
            }else{
                setMenssage([])
                router.push("/")
            }

            //console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            className="form-control my-2" 
            placeholder="Title" 
            autoComplete="off"
            name="title"
            value={form.title}
            onChange={handleChange}
        />
        <input 
            type="text" 
            className="form-control my-2" 
            placeholder="Plot" 
            autoComplete="off"
            name="plot"
            value={form.plot}
            onChange={handleChange}
        />
        <button className="btn btn-primary w-100" type="submit">{forNewMovie ? "Agregar" : "Editar"}</button>
        <Link href="/">
            <p className="btn btn-warning w-100 my-2">Volver...</p>
        </Link>
        {
            menssage.map(({menssage}) => (
                <p key={menssage}>{menssage}</p>
            ))
        }
    </form>
  )
}

export default Form