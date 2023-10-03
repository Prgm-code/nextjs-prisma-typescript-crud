import axios from 'axios'
import { prisma } from '@/libs/prisma';
import TaskCard  from '@/components/TaskCard';



async function loadTask () {

/* const res = await axios.get('http://localhost:3000/api/tasks');
console.log(res.data);
 */
return await prisma.task.findMany();
}

export const dynamic ='force-dynamic'


async function HomePage() {
 const tasks =  await loadTask();
  console.log(tasks); 

  return (
<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 max-w-screen-lg'>  {
    tasks.map(task => (
     <div className=" rounded-md" key={task.id}>
        <TaskCard task={task} />  
     </div>
    ))
  }
</div>  )
}

export default HomePage