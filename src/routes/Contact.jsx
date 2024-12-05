const Contact = () => {
  return (
    <div data-name='about' className='w-full h-screen bg-white text-gray-300'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <h2 className='text-7xl mb-3 text-slate-500'>Login</h2>
        <img
          src='https://i.ytimg.com/vi/ZL5b4uPicp0/maxresdefault.jpg'
          alt=''
        />
      </div>
    </div>
  );
};
// Esta es una forma de centrar los objetos
/*<div
  data-name='login'
  className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
>
  <div className='bg-slate-800 max-w-md w-full p-10'>
    <h2 className='text-7xl mb-3 text-slate-500'>Login</h2>
  </div>
</div>;
*/

// Esta es otra forma
/*<div data-name='about' className='w-full h-screen bg-white text-gray-300'>
  <div className='flex flex-col justify-center items-center w-full h-full'>
    <h2 className='text-7xl mb-3 text-slate-500'>Login</h2>
    <img src='https://i.ytimg.com/vi/ZL5b4uPicp0/maxresdefault.jpg' alt='' />
  </div>
</div>;*/
export default Contact;
