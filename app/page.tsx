import Menu from "./(authorized)/appComponent/Menu";
import CommonFeed from "./(authorized)/feed/page";
import AuthorizationV2 from "./(noauthorized)/authorizationV2/page";

export default function App() {
  return (
    <div className="flex justify-stretch items-start w-[100%]">
      <CommonFeed />
    </div>
  );
}
