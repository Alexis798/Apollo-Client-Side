import { useMutation } from "@apollo/client"
import { useState } from "react"
import { CREATE_PROJECTS, GET_PROJECTS } from "../graphql/projects"

export const ProjectForm = () => {
    
    const [ project, setProject ] = useState({ title: '', description: ''})
    //? La constate de la mutacion de crea asi con [ nombreDeConstante, { Lo que quieras devolver como loading y error } ]
    const [createProject, {loading, error}] = useMutation(CREATE_PROJECTS, {
        refetchQueries: [
            {
                query: GET_PROJECTS
            },
            "GET_PROJECTS"
        ]
    })
    //? El refecthQueries permite que se actualice la api sin cargar de nuevo la pagina

    const handleChange = e => {
        //console.log(e.target.name, e.target.value)
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createProject({
            variables: {
                name: project.name,
                description: project.description
            }
        })
    }

    return (
       <form onSubmit={handleSubmit} className="w-2/5">
            { error && <p>{error.message}</p>}
            <input type="text" name="name"placeholder="Write a title" onChange={handleChange} className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3" />
            <textarea name="description" rows="3" placeholder="Write a description" onChange={handleChange} className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3" />
            <button disabled={!project.name || !project.description || loading} className="bg-blue-500 px-4 py-1 rounded-md text-lg mb-3 disabled:bg-zinc-400">Save</button>
       </form>
    )
}
