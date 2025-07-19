import MemberContentComponent from "./MemberContentComponent";

const MemberComponent = () => {
  return (
    <div className=" w-[100%] min-h-[50vh] pb-2 flex justify-center ">
      <div className="w-[90%] min-h-[50vh] ">
        <MemberContentComponent />
      </div>
    </div>
  );
};

export default MemberComponent;
