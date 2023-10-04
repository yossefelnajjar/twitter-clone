import PageTitle from "../components/PageTitle";

export default function ApiProblemPage({ title }) {
  return (
    <div className="timeLine h-96 border-x text-white border-white border-opacity-25 xl:ml-72 relative mt-14">
      <PageTitle title={title} />
      <div className="flex h-full justify-center items-center flex-col">
        <p className="text-3xl mb-5 text-center"> Sorry, the API doesn't provide this type of information</p>
      </div>
    </div>
  );
}
