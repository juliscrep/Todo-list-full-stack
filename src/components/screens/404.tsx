import {Head} from "../shared/Head";

function Page404() {
  return (
    <>
      <Head title="The page is not found" />
      <div className="hero min-h-screen bg-gray-800">
        <div className="text-center hero-content text-3xl font-bold">
          <div>
            <h1>
              The page is not found.
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page404
