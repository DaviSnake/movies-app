import Form from "@/components/Form"

const New = () => {

    const formData = {
        title: "",
        plot: ""
    }

  return (
    <div className="container">
        <h1 className="my-3">Agregar movie</h1>
        <Form formData={formData}/>        
    </div>
  )
}

export default New