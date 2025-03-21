import Image from 'next/image'
import Login from './login'

const FormLogin = () => {
  return (
    <>
      <main className="flex min-h-screen">
        <div
          className="relative hidden md:flex md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1592856908193-b9934576cf3d?q=80&w=2149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute top-6 left-6">
            <Image
              src="/images/valle-logo.svg"
              alt="Valle Alimentos"
              className="w-24 h-auto"
              width={100}
              height={100}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-7xl font-bold leading-tight text-center px-12 font-display tracking-wide">
              RESCATAMOS
              <br />
              LO MEJOR
              <br />
              DE LOS ANDES
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-6">
          <Login />
        </div>
      </main>
    </>
  )
}

export default FormLogin
