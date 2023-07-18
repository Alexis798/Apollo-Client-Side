import { useMutation } from "@apollo/client"
import { DELETE_TASK } from "../../graphql/tasks"
import { GET_PROJECT } from "../../graphql/projects"
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai"

export const TaskCard = ({ task }) => {

    const [deleleTask] = useMutation(DELETE_TASK, {
        refetchQueries: [GET_PROJECT]
    })

    return (
       <div className="bg-zinc-900 px-5 py-3 mb-2 flex justify-between">
            <h1 className="text-sm">{task.title}</h1>
            <button onClick={() => { deleleTask({ variables: { id: task._id } })}} className="bg-red-500 rounded-lg px-2 py-1"><AiOutlineDelete /></button>
       </div>
    )
}
