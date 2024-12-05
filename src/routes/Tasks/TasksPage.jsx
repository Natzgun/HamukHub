import { useAuth } from '../../context/AuthContext';

const TasksPage = () => {
  const { user } = useAuth();
  //console.log(user);
  return (
    <div
      data-name='login'
      className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
    >
      <div className='bg-slate-900 max-w-md w-full p-10'>
        <h2 className='text-7xl mb-3 text-slate-500'>Task Page</h2>
      </div>
    </div>
  );
};

export default TasksPage;
