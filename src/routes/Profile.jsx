import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  //console.log(user);
  return (
    <div
      data-name='profile'
      className='flex flex-col h-[calc(100vh)] items-center justify-center bg-white text-green-300'
    >
      <div className='bg-green-100 shadow-lg max-w-md w-full p-4'>
      <div className=''>
        <h2 className='text-3xl text-center mb-3 text-slate-700 font-bold'>Perfil</h2>
        <img
          className='rounded-t-lg'
          src='https://unab.edu.pe/nueva-web/wp-content/uploads/2022/05/280366694_535258778158195_6699245807989852168_n.jpg'
          alt=''
        />
        <div className='p-5'>
          <h2 className='text-2xl text-slate-700 mb-3 font-bold'>
            Nombre de usuario: <span className='font-normal'>{user.username}</span>
          </h2>
          <p className='text-slate-600 text-2xl font-bold mb-2'>
            Correo: <span className='font-normal'>{user.email}</span>
          </p>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default Profile;
